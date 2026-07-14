import { useCallback, useEffect, useRef, useState } from 'react'
import { HiArrowUpRight } from 'react-icons/hi2'
import { AiOutlineGithub } from 'react-icons/ai'
import { gsap, ScrollTrigger } from '../lib/gsap'
import Reveal from './primitives/Reveal'
import SplitText from './primitives/SplitText'
import TiltCard from './primitives/TiltCard'
import { prefersReducedMotion } from '../lib/utils'

/* The rail starts flush with .container-x's left edge at every width, so the
   first card lines up with the heading above it. */
const RAIL_GUTTER = 'max(1rem, calc((100vw - 1320px) / 2 + 2.5rem))'

const projects = [
  {
    n: '01',
    title: 'Alagist',
    tag: 'Contribution · Product',
    description:
      'Salon booking and management platform. Contributed frontend work across the customer booking flow and the vendor-side dashboard for appointments and services.',
    stack: ['React', 'Node', 'REST API', 'Tailwind'],
    links: {
      site: 'https://alagist.com/',
    },
  },
  {
    n: '02',
    title: 'Pipeline Forge',
    tag: 'Frontend · Tooling',
    description:
      'Visual pipeline builder — drag nodes onto a canvas, wire them together, and submit the graph to a FastAPI backend that validates it as a DAG. Config-driven node abstraction and a dark glassmorphic design system.',
    stack: ['React', 'ReactFlow', 'Zustand', 'Framer Motion', 'FastAPI'],
    links: {
      site: 'https://pipeline-forge-two.vercel.app/',
      github: 'https://github.com/Vengateshwaran1/pipelineForge',
    },
  },
  {
    n: '03',
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
    n: '04',
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
    n: '05',
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
  const railRef = useRef(null)
  const trackRef = useRef(null)
  const barRef = useRef(null)

  // Mobile drives the progress bar from the rail's own scroll position.
  const syncFromRail = useCallback(() => {
    const rail = railRef.current
    const bar = barRef.current
    if (!rail || !bar) return
    const max = rail.scrollWidth - rail.clientWidth
    bar.style.width = `${Math.max(6, (max > 0 ? rail.scrollLeft / max : 0) * 100)}%`
  }, [])

  useEffect(() => {
    const rail = railRef.current
    if (!rail) return
    rail.addEventListener('scroll', syncFromRail, { passive: true })
    syncFromRail()
    return () => rail.removeEventListener('scroll', syncFromRail)
  }, [syncFromRail])

  useEffect(() => {
    if (prefersReducedMotion()) return
    const section = sectionRef.current
    const rail = railRef.current
    const track = trackRef.current
    if (!section || !rail || !track) return

    const mm = gsap.matchMedia()

    // Desktop: the page's vertical scroll drives the rail horizontally. The pin
    // lasts exactly as long as the track needs to travel, so it stays 1:1 with
    // the wheel and adding projects never distorts the scroll speed.
    mm.add('(min-width: 768px)', () => {
      const distance = () => Math.max(0, track.scrollWidth - rail.clientWidth)

      const tween = gsap.to(track, {
        x: () => -distance(),
        ease: 'none',
        force3D: true,
        scrollTrigger: {
          trigger: rail,
          start: 'top top',
          end: () => `+=${distance()}`,
          scrub: 0.6,
          pin: rail,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (barRef.current) {
              barRef.current.style.width = `${Math.max(6, self.progress * 100)}%`
            }
          },
        },
      })

      return () => tween.scrollTrigger?.kill()
    })

    const onLoad = () => ScrollTrigger.refresh()
    window.addEventListener('load', onLoad)
    return () => {
      window.removeEventListener('load', onLoad)
      mm.revert()
    }
  }, [])

  return (
    <section id="work" ref={sectionRef} className="relative py-20 md:py-24">
      <div className="container-x">
        <Reveal>
          <p className="eyebrow mb-6">Selected Work</p>
        </Reveal>
        <div className="flex items-end justify-between flex-wrap gap-4 md:gap-6 mb-8 md:mb-12">
          <h2 className="display-lg text-white text-balance max-w-3xl">
            <SplitText by="word" stagger={0.06}>Shipped &amp; live —</SplitText>{' '}
            <span className="gradient-text"><SplitText by="word" stagger={0.06} delay={0.15}>not just screenshots.</SplitText></span>
          </h2>
          <span className="hidden md:flex items-center gap-3 text-white/30 font-mono text-xs uppercase tracking-[0.25em]">
            Scroll to pan
            <span className="w-8 h-px bg-white/20" />
            <HiArrowUpRight className="rotate-45" />
          </span>
        </div>
      </div>

      {/* Desktop: overflow hidden, GSAP translates the track.
          Mobile: the same box is a native swipe rail — touch is never hijacked. */}
      <div
        ref={railRef}
        className="no-scrollbar overflow-x-auto md:overflow-hidden snap-x snap-mandatory md:snap-none overscroll-x-contain md:h-screen md:flex md:items-center"
        style={{ scrollPaddingLeft: RAIL_GUTTER }}
      >
        <div
          ref={trackRef}
          className="flex gap-5 md:gap-10 w-max will-change-transform"
          style={{ paddingLeft: RAIL_GUTTER, paddingRight: RAIL_GUTTER }}
        >
          {projects.map((p) => (
            <Card key={p.n} p={p} />
          ))}

          <div
            data-card
            className="snap-start shrink-0 flex flex-col justify-center w-[86vw] sm:w-[62vw] md:w-[380px] py-6 md:py-0"
          >
            <p className="eyebrow mb-3">— More</p>
            <h3 className="font-display text-2xl md:text-4xl text-white max-w-xs">
              Want to see <span className="gradient-text">more</span>?
            </h3>
            <a
              href="https://github.com/Vengateshwaran1"
              target="_blank"
              rel="noopener"
              data-cursor="view"
              data-cursor-label="GitHub"
              className="mt-4 md:mt-6 inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 font-medium text-sm md:text-base"
            >
              See all on GitHub <HiArrowUpRight />
            </a>
          </div>
        </div>
      </div>

      <div className="container-x mt-8 md:mt-10">
        <div className="h-px bg-white/[0.08] relative overflow-hidden">
          <div
            ref={barRef}
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-amber-400 to-amber-600"
            style={{ width: '6%' }}
          />
        </div>
      </div>
    </section>
  )
}

const Card = ({ p }) => (
  <div
    data-card
    className="snap-start shrink-0 w-[86vw] sm:w-[62vw] md:w-[620px] lg:w-[680px]"
  >
    <TiltCard max={5} className="group glass-metallic rounded-3xl overflow-hidden">
      <BrowserFrame url={p.links.site} title={p.title}>
        <LivePreview src={p.links.site} title={p.title} />
      </BrowserFrame>

      <div className="p-4 md:p-7">
        <div className="flex items-start justify-between gap-4 mb-3">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-amber-400/90">
            {p.n} / {p.tag}
          </span>
          <div className="flex items-center gap-2">
            {p.links.github && (
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
            )}
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
        <h3 className="font-display text-2xl md:text-4xl text-white font-bold tracking-tight">
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
      <div className="flex items-center gap-2 md:gap-3 px-3 md:px-4 py-2.5 md:py-3 bg-white/[0.03] border-b border-white/[0.06]">
        <div className="flex items-center gap-1 md:gap-1.5">
          <span className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-red-400/70" />
          <span className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-amber-300/70" />
          <span className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-emerald-400/70" />
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
      <p className="px-6 text-center font-mono text-[9px] md:text-[10px] uppercase tracking-[0.2em] md:tracking-[0.3em] text-white/40 text-balance">
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
