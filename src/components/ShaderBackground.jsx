import { useEffect, useRef } from 'react'
import { prefersReducedMotion } from '../lib/utils'

const ShaderBackground = () => {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return

    // The fragment shader runs 5 octaves of fbm per pixel per frame. On a
    // phone that's a constant GPU/battery drain for a background, so mobile
    // paints a single still frame instead of animating.
    const mobile = window.matchMedia('(max-width: 767px)').matches
    const still = prefersReducedMotion() || mobile

    const gl = canvas.getContext('webgl', { antialias: false, alpha: true })
    if (!gl) return

    const dpr = mobile ? 1 : Math.min(window.devicePixelRatio || 1, 1.5)

    const resize = () => {
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = window.innerWidth + 'px'
      canvas.style.height = window.innerHeight + 'px'
      gl.viewport(0, 0, canvas.width, canvas.height)
    }
    resize()

    const vsrc = `attribute vec2 p; void main(){ gl_Position = vec4(p,0.0,1.0); }`
    const fsrc = `
      precision highp float;
      uniform vec2 res;
      uniform float t;
      uniform vec2 mouse;

      // hash + simplex-ish noise
      float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7)))*43758.5453); }
      float noise(vec2 p){
        vec2 i = floor(p); vec2 f = fract(p);
        float a = hash(i);
        float b = hash(i + vec2(1.0,0.0));
        float c = hash(i + vec2(0.0,1.0));
        float d = hash(i + vec2(1.0,1.0));
        vec2 u = f*f*(3.0-2.0*f);
        return mix(a,b,u.x) + (c-a)*u.y*(1.0-u.x) + (d-b)*u.x*u.y;
      }
      float fbm(vec2 p){
        float v = 0.0; float a = 0.5;
        for(int i=0;i<5;i++){ v += a*noise(p); p *= 2.02; a *= 0.5; }
        return v;
      }
      void main(){
        vec2 uv = gl_FragCoord.xy / res.xy;
        vec2 p = uv * 2.0 - 1.0;
        p.x *= res.x/res.y;
        float time = t*0.06;
        float m = length(p - (mouse*2.0-1.0)*vec2(res.x/res.y,1.0));
        float n = fbm(p*1.2 + vec2(time, -time*0.7));
        float n2 = fbm(p*2.1 - vec2(time*1.3, time*0.9));
        float aurora = smoothstep(0.25, 0.85, n + n2*0.5);

        vec3 base   = vec3(0.027, 0.031, 0.043);  // ink-950
        vec3 silver = vec3(0.772, 0.788, 0.839);  // #C5C9D6
        vec3 violet = vec3(0.655, 0.545, 0.980);  // #A78BFA
        vec3 deep   = vec3(0.427, 0.157, 0.851);  // #6D28D9

        vec3 col = base;
        col += silver * aurora * 0.14;
        col += violet * aurora * 0.18;
        col += deep   * pow(aurora, 2.0) * 0.28;
        // mouse glow
        col += violet * (0.05 / (0.2 + m*1.8));
        // vignette
        float vig = smoothstep(1.6, 0.4, length(p));
        col *= mix(0.55, 1.0, vig);
        // grain
        float g = (hash(gl_FragCoord.xy + t) - 0.5) * 0.025;
        col += g;
        gl_FragColor = vec4(col, 1.0);
      }
    `

    const compile = (type, src) => {
      const s = gl.createShader(type)
      gl.shaderSource(s, src)
      gl.compileShader(s)
      return s
    }
    const prog = gl.createProgram()
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, vsrc))
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, fsrc))
    gl.linkProgram(prog)
    gl.useProgram(prog)

    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW)
    const loc = gl.getAttribLocation(prog, 'p')
    gl.enableVertexAttribArray(loc)
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)

    const uRes = gl.getUniformLocation(prog, 'res')
    const uT = gl.getUniformLocation(prog, 't')
    const uM = gl.getUniformLocation(prog, 'mouse')

    let mx = 0.5, my = 0.5
    const onMove = (e) => { mx = e.clientX / window.innerWidth; my = 1 - e.clientY / window.innerHeight }
    if (!still) window.addEventListener('mousemove', onMove, { passive: true })

    let start = performance.now()
    let raf
    const render = () => {
      const time = still ? 0 : (performance.now() - start) / 1000
      gl.uniform2f(uRes, canvas.width, canvas.height)
      gl.uniform1f(uT, time)
      gl.uniform2f(uM, mx, my)
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
      if (!still) raf = requestAnimationFrame(render)
    }
    render()

    // In still mode there's no rAF loop, so a resize must repaint once or
    // the canvas stretches (e.g. mobile URL bar collapse, rotation).
    const onResize = () => {
      resize()
      if (still) render()
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('mousemove', onMove)
    }
  }, [])

  return (
    <canvas
      ref={ref}
      className="fixed inset-0 -z-10 w-full h-full pointer-events-none"
      aria-hidden
    />
  )
}

export default ShaderBackground
