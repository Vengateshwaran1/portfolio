import { Suspense, useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import {
  Float,
  Environment,
  MeshDistortMaterial,
  Sparkles,
  ContactShadows,
  PerspectiveCamera,
  Points,
  PointMaterial,
  Icosahedron,
  Octahedron,
  Torus,
} from '@react-three/drei'
import * as random from 'maath/random/dist/maath-random.esm'
import * as THREE from 'three'

/**
 * Central liquid-chrome blob. Morphs with noise, follows pointer.
 */
const ChromeBlob = () => {
  const ref = useRef()
  useFrame(({ pointer, clock }, dt) => {
    if (!ref.current) return
    ref.current.rotation.x = THREE.MathUtils.damp(ref.current.rotation.x, -pointer.y * 0.55, 3.2, dt)
    ref.current.rotation.y = THREE.MathUtils.damp(ref.current.rotation.y, pointer.x * 0.7, 3.2, dt) + dt * 0.12
    const s = 1 + Math.sin(clock.elapsedTime * 0.8) * 0.04
    ref.current.scale.set(s, s, s)
  })
  return (
    <Float speed={1.4} rotationIntensity={0.5} floatIntensity={1.2}>
      <Icosahedron ref={ref} args={[1.15, 6]} position={[0, 0, 0]}>
        <MeshDistortMaterial
          color="#DDE0E9"
          roughness={0.08}
          metalness={1}
          distort={0.42}
          speed={1.8}
          envMapIntensity={1.8}
        />
      </Icosahedron>
    </Float>
  )
}

/**
 * Floating glass crystal — refractive, with violet tint.
 */
const Crystal = ({ position, size = 0.35, tint = '#A78BFA', speed = 1, delay = 0 }) => {
  const ref = useRef()
  useFrame((_, dt) => {
    if (!ref.current) return
    ref.current.rotation.x += dt * 0.25 * speed
    ref.current.rotation.y += dt * 0.18 * speed
  })
  return (
    <Float speed={speed * 0.9} floatIntensity={1.3} rotationIntensity={0.4}>
      <Octahedron ref={ref} args={[size, 0]} position={position}>
        <meshPhysicalMaterial
          color={tint}
          transmission={0.92}
          thickness={0.6}
          ior={1.45}
          roughness={0.04}
          metalness={0.1}
          clearcoat={1}
          clearcoatRoughness={0}
          attenuationColor={tint}
          attenuationDistance={1.2}
          envMapIntensity={2}
        />
      </Octahedron>
    </Float>
  )
}

/**
 * Slow-rotating chrome torus ring — adds orbital depth.
 */
const OrbitRing = ({ axis = 'y' }) => {
  const ref = useRef()
  useFrame((_, dt) => {
    if (!ref.current) return
    if (axis === 'y') ref.current.rotation.y += dt * 0.08
    if (axis === 'x') ref.current.rotation.x += dt * 0.06
    if (axis === 'z') ref.current.rotation.z += dt * 0.05
  })
  const rotation = axis === 'y' ? [Math.PI / 2.4, 0, 0] : axis === 'x' ? [0, Math.PI / 2.4, 0] : [0.4, 0.6, 0]
  return (
    <Torus ref={ref} args={[2.0, 0.012, 16, 200]} rotation={rotation}>
      <meshStandardMaterial
        color="#C5C9D6"
        metalness={1}
        roughness={0.18}
        emissive="#A78BFA"
        emissiveIntensity={0.12}
      />
    </Torus>
  )
}

/**
 * Magnetic dot field that drifts subtly with pointer.
 */
const MagneticField = () => {
  const ref = useRef()
  const positions = useMemo(() => random.inSphere(new Float32Array(1800 * 3), { radius: 6.5 }), [])
  useFrame(({ pointer }, dt) => {
    if (!ref.current) return
    ref.current.rotation.y += dt * 0.035
    ref.current.rotation.x = THREE.MathUtils.damp(ref.current.rotation.x, pointer.y * 0.18, 2, dt)
    ref.current.rotation.z = THREE.MathUtils.damp(ref.current.rotation.z, -pointer.x * 0.18, 2, dt)
  })
  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={positions} stride={3} frustumCulled>
        <PointMaterial
          transparent
          color="#B8A4FA"
          size={0.014}
          sizeAttenuation
          depthWrite={false}
          opacity={0.75}
        />
      </Points>
    </group>
  )
}

/**
 * Pointer-tracked spotlight — premium rim lighting.
 */
const PointerLight = () => {
  const ref = useRef()
  useFrame(({ pointer }, dt) => {
    if (!ref.current) return
    ref.current.position.x = THREE.MathUtils.damp(ref.current.position.x, pointer.x * 4, 4, dt)
    ref.current.position.y = THREE.MathUtils.damp(ref.current.position.y, pointer.y * 3, 4, dt)
  })
  return <pointLight ref={ref} position={[2, 2, 3]} intensity={2.2} color="#A78BFA" distance={8} />
}

const Hero3DScene = () => {
  return (
    <div className="absolute inset-0 -z-[1] pointer-events-none">
      <Canvas dpr={[1, 1.6]} gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}>
        <PerspectiveCamera makeDefault position={[0, 0, 4.8]} fov={42} />

        {/* Lighting rig */}
        <ambientLight intensity={0.3} />
        <directionalLight position={[4, 6, 4]} intensity={1.4} color="#F8F9FB" />
        <directionalLight position={[-3, -2, -4]} intensity={0.8} color="#7C3AED" />
        <PointerLight />

        <Suspense fallback={null}>
          <ChromeBlob />

          {/* Glass crystal cluster */}
          <Crystal position={[2.1, 1.2, -0.4]} size={0.42} tint="#C5C9D6" speed={1.1} />
          <Crystal position={[-2.0, -0.6, 0.3]} size={0.32} tint="#A78BFA" speed={0.8} />
          <Crystal position={[1.5, -1.3, 0.6]} size={0.26} tint="#DDE0E9" speed={1.3} />
          <Crystal position={[-1.7, 1.6, -0.8]} size={0.22} tint="#8B5CF6" speed={0.95} />

          <OrbitRing axis="y" />
          <OrbitRing axis="x" />

          <MagneticField />
          <Sparkles count={60} scale={[7, 7, 3]} size={2.5} speed={0.35} color="#B8A4FA" opacity={0.8} />

          <Environment preset="studio" />
          <ContactShadows
            position={[0, -1.7, 0]}
            opacity={0.35}
            scale={9}
            blur={2.8}
            far={2.2}
            color="#000"
          />
        </Suspense>
      </Canvas>
    </div>
  )
}

export default Hero3DScene
