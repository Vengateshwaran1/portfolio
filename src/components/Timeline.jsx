import { useRef } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { HiOutlineAcademicCap, HiOutlineCodeBracket, HiOutlineRocketLaunch, HiOutlineShieldCheck } from 'react-icons/hi2'
import Reveal from './primitives/Reveal'
import SplitText from './primitives/SplitText'

const events = [
  {
    when: 'May 2025 — Nov 2025',
    title: 'Intern Developer · Prodoc AI',
    where: 'Full-stack · Analytics Dashboard',
    body:
      'Built a full-stack analytics dashboard with interactive data viz and advanced filtering. Implemented background jobs and Redis caching to scale data-heavy reporting.',
    Icon: HiOutlineRocketLaunch,
  },
  {
    when: '2025',
    title: 'Realtime Apps Era',
    where: 'Zephyr · Echo Connect',
    body: 'Shipped two realtime MERN products around chat, presence, and synchronized audio with Socket.io and Docker.',
    Icon: HiOutlineCodeBracket,
  },
  {
    when: '2024',
    title: 'Carpooling Marketplace',
    where: 'Fasten Your Belt',
    body: 'Built a full-stack mobility marketplace from idea to deployment with the MERN stack.',
    Icon: HiOutlineCodeBracket,
  },
  {
    when: '2023',
    title: 'Cyber Security Studies',
    where: 'PSG College of Technology',
    body: 'Started deep diving into web security, OWASP Top 10, and adversarial thinking as part of the Integrated M.Sc.',
    Icon: HiOutlineShieldCheck,
  },
  {
    when: '2022',
    title: 'M.Sc Cyber Security, Year One',
    where: 'PSG College of Technology',
    body: 'Began the Integrated M.Sc. in Cyber Security — CGPA 6.83 — fell in love with full-stack web.',
    Icon: HiOutlineAcademicCap,
  },
]

const Timeline = () => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 60%', 'end 30%'],
  })
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 24 })
  const h = useTransform(fill, [0, 1], ['0%', '100%'])

  return (
    <section id="timeline" className="relative py-32 md:py-44">
      <div className="container-x">
        <Reveal>
          <p className="eyebrow mb-6">Journey</p>
        </Reveal>
        <h2 className="display-lg text-white text-balance max-w-3xl mb-16">
          <SplitText by="word" stagger={0.06}>A timeline of</SplitText>{' '}
          <span className="gradient-text"><SplitText by="word" stagger={0.06} delay={0.15}>shipping & learning.</SplitText></span>
        </h2>

        <div ref={ref} className="relative pl-6 md:pl-0">
          {/* Center spine (desktop) / Left spine (mobile) */}
          <div className="absolute top-0 left-2 md:left-1/2 md:-translate-x-1/2 w-px h-full bg-white/10" />
          <motion.div
            style={{ height: h }}
            className="absolute top-0 left-2 md:left-1/2 md:-translate-x-1/2 w-px bg-gradient-to-b from-amber-400 via-amber-400/60 to-transparent"
          />

          <div className="space-y-12 md:space-y-20">
            {events.map((e, i) => (
              <Item key={i} e={e} i={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

const Item = ({ e, i }) => {
  const right = i % 2 === 0
  return (
    <Reveal delay={0.05 * i}>
      <div className={`relative grid grid-cols-1 md:grid-cols-2 gap-8 items-center ${right ? '' : 'md:[&>*:first-child]:order-2'}`}>
        {/* Dot */}
        <div className="absolute left-2 md:left-1/2 -translate-x-[5px] md:-translate-x-1/2 w-3 h-3 rounded-full bg-amber-400 shadow-[0_0_24px_rgba(167,139,250,0.8)]">
          <span className="absolute inset-0 rounded-full bg-amber-400 animate-pulseRing opacity-50" />
        </div>

        {/* Card */}
        <div className={`pl-10 md:pl-0 ${right ? 'md:text-right md:pr-16' : 'md:pl-16'}`}>
          <div className={`inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.3em] text-amber-400/80 mb-3 ${right ? 'md:flex-row-reverse' : ''}`}>
            <e.Icon /> {e.when}
          </div>
          <h3 className="font-display text-2xl md:text-3xl font-bold text-white">{e.title}</h3>
          <p className="mt-1 text-white/50 text-sm">{e.where}</p>
          <p className="mt-4 text-white/65 max-w-md text-pretty">{e.body}</p>
        </div>
        <div />
      </div>
    </Reveal>
  )
}

export default Timeline
