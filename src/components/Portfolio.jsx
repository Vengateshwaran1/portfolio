import { useEffect, useRef, useState } from 'react'
import { HiArrowUpRight } from 'react-icons/hi2'
import { AiOutlineGithub } from 'react-icons/ai'
import { gsap, ScrollTrigger } from '../lib/gsap'
import Reveal from './primitives/Reveal'
import SplitText from './primitives/SplitText'
import TiltCard from './primitives/TiltCard'
import { prefersReducedMotion } from '../lib/utils'

const projects = [
  {
    n: '01',
    title: 'Zephyr',
    tag: 'Realtime · Chat',
    description:
      'Responsive realtime chat with customizable color modes, secure auth, session management, and a RESTful API powered by sockets.',
    stack: ['MongoDB', 'Express', 'React', 'Node', 'Socket.io', 'Docker'],
    links: {
      site: 'https://zephyr-dxd8.onrender.com/',
      github: 'https://github.com/Vengateshwaran1/Zephyr',
    },
  },
  {
    n: '02',
    title: 'Echo Connect',
    tag: 'Audio · Social',
    description:
      'Music + realtime chat where listeners share a synchronized session with customizable playlists and seamless presence.',
    stack: ['MongoDB', 'Express', 'React', 'Node', 'Socket.io', 'Docker'],
    links: {
      site: 'https://echo-connect.onrender.com/',
      github: 'https://github.com/Vengateshwaran1/Echo-Connect',
    },
  },
  {
    n: '03',
    title: 'Fasten Your Belt',
    tag: 'Mobility · Full-stack',
    description:
      'Carpooling marketplace connecting drivers and riders with realtime availability and trip matching.',
    stack: ['React', 'Node', 'Express', 'MongoDB'],
    links: {
      site: 'https://fasten-your-belt.vercel.app/',
      github: 'https://github.com/Vengateshwaran1/Fasten-Your-Belt',
    },
  },
]

const Portfolio = () => {
  const sectionRef = useRef(null)
  const trackRef = useRef(null)

  useEffect(() => {
    if (prefersReducedMotion()) return
    const section = sectionRef.current
    const track = trackRef.current
    if (!section || !track) return

    const ctx = gsap.context(() => {
      const setup = () => {
        const isDesktop = window.matchMedia('(min-width: 768px)').matches
        if (!isDesktop) return null
        const totalWidth = track.scrollWidth
        const viewport = window.innerWidth
        const distance = totalWidth - viewport + 80
        return gsap.to(track, {
          x: -distance,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: () => `+=${distance + 100}`,
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        })
      }
      const tween = setup()
      return () => tween?.scrollTrigger?.kill()
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section id="work" ref={sectionRef} className="relative py-32 md:py-44 overflow-hidden">
      <div className="container-x">
        <Reveal>
          <p className="eyebrow mb-6">— 03 / Selected Work</p>
        </Reveal>
        <div className="flex items-end justify-between flex-wrap gap-6 mb-14">
          <h2 className="display-lg text-white text-balance max-w-3xl">
            <SplitText by="word" stagger={0.06}>Shipped &amp; live —</SplitText>{' '}
            <span className="gradient-text"><SplitText by="word" stagger={0.06} delay={0.15}>not just screenshots.</SplitText></span>
          </h2>
          <span className="hidden md:flex items-center gap-2 text-white/40 font-mono text-xs uppercase tracking-[0.25em]">
            <span className="w-8 h-px bg-amber-400/60" />
            Scroll horizontally
          </span>
        </div>
      </div>

      {/* Horizontal pinned rail */}
      <div className="md:h-[100vh] flex md:items-center overflow-x-auto md:overflow-visible">
        <div
          ref={trackRef}
          className="flex md:flex-row flex-col gap-6 md:gap-10 px-6 md:px-16 will-change-transform"
        >
          {projects.map((p, i) => (
            <Card key={p.n} p={p} i={i} />
          ))}
          <div className="hidden md:flex flex-col justify-center items-start min-w-[420px] pr-20">
            <p className="eyebrow mb-3">— More</p>
            <h3 className="font-display text-4xl text-white max-w-xs">
              Want to see <span className="gradient-text">more</span>?
            </h3>
            <a
              href="https://github.com/Vengateshwaran1"
              target="_blank"
              rel="noopener"
              data-cursor="view"
              data-cursor-label="GitHub"
              className="mt-6 inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 font-medium"
            >
              See all on GitHub <HiArrowUpRight />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

const Card = ({ p }) => (
  <div className="md:min-w-[680px] md:w-[680px] shrink-0">
    <TiltCard max={5} className="group glass-metallic rounded-3xl overflow-hidden">
      <BrowserFrame url={p.links.site} title={p.title}>
        <LivePreview src={p.links.site} title={p.title} />
      </BrowserFrame>

      <div className="p-6 md:p-7">
        <div className="flex items-start justify-between gap-4 mb-3">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-amber-400/90">
            {p.n} / {p.tag}
          </span>
          <div className="flex items-center gap-2">
            <a
              href={p.links.github}
              target="_blank"
              rel="noopener"
              aria-label="GitHub"
              data-cursor="hover"
              className="w-10 h-10 grid place-items-center rounded-full glass text-white/90 hover:text-amber-400 transition-colors"
            >
              <AiOutlineGithub />
            </a>
            <a
              href={p.links.site}
              target="_blank"
              rel="noopener"
              data-cursor="view"
              data-cursor-label="Visit"
              className="w-10 h-10 grid place-items-center rounded-full gradient-amber text-ink-950 hover:scale-105 transition-transform shadow-amber"
            >
              <HiArrowUpRight />
            </a>
          </div>
        </div>
        <h3 className="font-display text-3xl md:text-4xl text-white font-bold tracking-tight">
          {p.title}
        </h3>
        <p className="mt-3 text-white/65 text-sm md:text-base max-w-lg">
          {p.description}
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          {p.stack.map((s) => (
            <span
              key={s}
              className="px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.06] text-white/75 text-xs font-mono"
            >
              {s}
            </span>
          ))}
        </div>
      </div>
    </TiltCard>
  </div>
)

const BrowserFrame = ({ url, title, children }) => {
  let host = url
  try { host = new URL(url).host } catch (e) {}
  return (
    <div className="relative border-b border-white/[0.06]">
      {/* Top chrome bar */}
      <div className="flex items-center gap-3 px-4 py-3 bg-white/[0.03] border-b border-white/[0.06]">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-red-400/70" />
          <span className="w-3 h-3 rounded-full bg-amber-300/70" />
          <span className="w-3 h-3 rounded-full bg-emerald-400/70" />
        </div>
        <div className="flex-1 mx-2">
          <div className="px-3 py-1 rounded-md bg-black/30 border border-white/[0.05] font-mono text-[11px] text-white/55 truncate">
            <span className="text-amber-400/80">https://</span>{host}
          </div>
        </div>
        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-emerald-400/80 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Live
        </span>
      </div>
      {children}
    </div>
  )
}

const RENDER_W = 1440
const RENDER_H = 900

const LivePreview = ({ src, title }) => {
  const [loaded, setLoaded] = useState(false)
  const [errored, setErrored] = useState(false)
  const [scale, setScale] = useState(0.47)
  const wrapRef = useRef(null)

  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const ro = new ResizeObserver(([entry]) => {
      const w = entry.contentRect.width
      setScale(w / RENDER_W)
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  useEffect(() => {
    // Render free tier can cold-start up to ~60s. Don't flip to "blocked" before then.
    const t = setTimeout(() => {
      if (!loaded) setErrored(true)
    }, 60000)
    return () => clearTimeout(t)
  }, [loaded])

  return (
    <div ref={wrapRef} className="relative aspect-[16/10] overflow-hidden bg-ink-900">
      <iframe
        src={src}
        title={title}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        onError={() => setErrored(true)}
        sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
        referrerPolicy="no-referrer"
        className="absolute top-0 left-0 pointer-events-none border-0"
        style={{
          width: `${RENDER_W}px`,
          height: `${RENDER_H}px`,
          transform: `scale(${scale})`,
          transformOrigin: '0 0',
        }}
      />

      {/* Overlay click target — opens site (iframe is pointer-events: none) */}
      <a
        href={src}
        target="_blank"
        rel="noopener"
        data-cursor="view"
        data-cursor-label="Open"
        aria-label={`Open ${title}`}
        className="absolute inset-0 z-10"
      />

      {/* Subtle gradient sheen on hover */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-violet-500/0 via-transparent to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Loading/cold-start state */}
      {!loaded && !errored && <PreviewSkeleton />}
      {errored && !loaded && <PreviewFallback src={src} />}
    </div>
  )
}

const PreviewSkeleton = () => (
  <div className="absolute inset-0 grid place-items-center bg-gradient-to-br from-ink-900 via-ink-900/95 to-ink-800/80 z-[5]">
    <div className="flex flex-col items-center gap-3">
      <div className="relative w-12 h-12">
        <span className="absolute inset-0 rounded-full border-2 border-white/10" />
        <span className="absolute inset-0 rounded-full border-2 border-transparent border-t-amber-400 animate-spin" />
      </div>
      <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">
        Waking live site… (Render cold-start)
      </p>
    </div>
  </div>
)

const PreviewFallback = ({ src }) => (
  <div className="absolute inset-0 grid place-items-center bg-gradient-to-br from-ink-900 to-ink-800 z-[5] p-6">
    <div className="text-center">
      <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/50">
        Preview blocked
      </p>
      <p className="mt-2 text-white/70 text-sm max-w-xs">
        The live site is up, but its embed policy prevents iframe preview here.
      </p>
      <a
        href={src}
        target="_blank"
        rel="noopener"
        className="mt-4 inline-flex items-center gap-1.5 text-amber-400 hover:text-amber-300 font-mono text-xs"
      >
        Open in new tab →
      </a>
    </div>
  </div>
)

export default Portfolio
