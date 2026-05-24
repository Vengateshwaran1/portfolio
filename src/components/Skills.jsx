import { motion } from 'framer-motion'
import { DiReact, DiNodejsSmall, DiMongodb, DiJavascript1, DiPython, DiGit } from 'react-icons/di'
import { SiTailwindcss, SiOracle, SiCplusplus, SiDocker, SiAmazonec2, SiExpress, SiSocketdotio, SiRedis, SiPostman } from 'react-icons/si'
import { HiOutlineSparkles, HiOutlineShieldCheck, HiOutlineCubeTransparent, HiOutlineBolt } from 'react-icons/hi2'
import Reveal from './primitives/Reveal'
import SplitText from './primitives/SplitText'
import TiltCard from './primitives/TiltCard'
import { cn } from '../lib/utils'

const Skills = () => {
  return (
    <section id="skills" className="relative py-32 md:py-44">
      <div className="container-x">
        <Reveal>
          <p className="eyebrow mb-6">— 02 / Skills</p>
        </Reveal>
        <h2 className="display-lg text-white text-balance max-w-3xl">
          <SplitText by="word" stagger={0.06}>Tools I use to</SplitText>{' '}
          <span className="gradient-text"><SplitText by="word" stagger={0.06} delay={0.15}>build & break things.</SplitText></span>
        </h2>

        <div className="mt-16 grid grid-cols-12 gap-4 md:gap-5">
          {/* Big card: Frontend */}
          <Bento className="col-span-12 md:col-span-7 md:row-span-2 min-h-[360px]">
            <div className="flex items-center justify-between mb-6">
              <Tag>Frontend</Tag>
              <HiOutlineSparkles className="text-amber-400" size={24} />
            </div>
            <h3 className="font-display text-3xl md:text-4xl text-white font-bold mb-3 tracking-tight">
              Interfaces that feel<br />alive.
            </h3>
            <p className="text-white/55 max-w-md text-pretty">
              React + Tailwind for dynamic, accessible UIs. Strong focus on motion, typography, and responsive layouts that scale.
            </p>
            <div className="mt-8 grid grid-cols-4 gap-3">
              {[
                { Icon: DiReact, c: '#61DAFB', n: 'React' },
                { Icon: DiJavascript1, c: '#F7DF1E', n: 'JS' },
                { Icon: SiTailwindcss, c: '#38BDF8', n: 'Tailwind' },
                { Icon: HiOutlineCubeTransparent, c: '#A78BFA', n: 'Framer' },
                { Icon: SiSocketdotio, c: '#FFF', n: 'Socket.io' },
                { Icon: HiOutlineBolt, c: '#646CFF', n: 'Vite' },
                { Icon: DiPython, c: '#3776AB', n: 'Python' },
                { Icon: SiCplusplus, c: '#00599C', n: 'C++' },
              ].map(({ Icon, c, n }, i) => (
                <div key={i} className="aspect-square rounded-xl glass grid place-items-center group hover:bg-amber-400/10 hover:border-amber-400/40 transition-all">
                  <Icon className="text-2xl md:text-3xl group-hover:scale-110 transition-transform" style={{ color: c }} />
                </div>
              ))}
            </div>
          </Bento>

          {/* Backend */}
          <Bento className="col-span-12 md:col-span-5 min-h-[170px]">
            <Tag>Backend</Tag>
            <h3 className="mt-4 font-display text-2xl text-white font-bold">APIs that scale.</h3>
            <div className="mt-5 flex flex-wrap gap-2">
              {[
                { Icon: DiNodejsSmall, n: 'Node.js' },
                { Icon: SiExpress, n: 'Express' },
                { Icon: SiSocketdotio, n: 'Socket.io' },
                { Icon: SiRedis, n: 'Redis' },
              ].map(({ Icon, n }, i) => (
                <span key={i} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-white/80 text-sm">
                  <Icon className="text-amber-400" /> {n}
                </span>
              ))}
            </div>
          </Bento>

          {/* Security */}
          <Bento className="col-span-12 md:col-span-5 min-h-[170px] relative overflow-hidden">
            <div className="absolute -top-6 -right-6 w-32 h-32 rounded-full bg-amber-400/10 blur-3xl" />
            <div className="flex items-start justify-between">
              <Tag>Security</Tag>
              <HiOutlineShieldCheck className="text-amber-400" size={24} />
            </div>
            <h3 className="mt-4 font-display text-2xl text-white font-bold">Thinking like an attacker.</h3>
            <p className="mt-3 text-white/55 text-sm">
              Web pentest fundamentals, OWASP Top 10, secure auth flows, headers, and rate-limit design.
            </p>
          </Bento>

          {/* Data */}
          <Bento className="col-span-6 md:col-span-3 min-h-[170px]">
            <Tag>Data</Tag>
            <div className="mt-5 space-y-3">
              {[
                { Icon: DiMongodb, n: 'MongoDB', c: '#10B981' },
                { Icon: SiOracle, n: 'Oracle', c: '#F80000' },
              ].map(({ Icon, n, c }, i) => (
                <div key={i} className="flex items-center gap-3">
                  <Icon style={{ color: c }} className="text-2xl" />
                  <span className="text-white/80 text-sm">{n}</span>
                </div>
              ))}
            </div>
          </Bento>

          {/* DevOps */}
          <Bento className="col-span-6 md:col-span-4 min-h-[170px]">
            <Tag>DevOps · Cloud</Tag>
            <div className="mt-5 space-y-3">
              <div className="flex items-center gap-3">
                <SiDocker className="text-[#2496ED] text-2xl" />
                <span className="text-white/80 text-sm">Docker</span>
              </div>
              <div className="flex items-center gap-3">
                <SiAmazonec2 className="text-[#FF9900] text-2xl" />
                <span className="text-white/80 text-sm">AWS EC2</span>
              </div>
              <div className="flex items-center gap-3">
                <SiPostman className="text-[#FF6C37] text-2xl" />
                <span className="text-white/80 text-sm">Postman</span>
              </div>
              <div className="flex items-center gap-3">
                <DiGit className="text-[#F05032] text-2xl" />
                <span className="text-white/80 text-sm">Git</span>
              </div>
            </div>
          </Bento>

          {/* Currently learning */}
          <Bento className="col-span-12 md:col-span-5 min-h-[170px] relative overflow-hidden">
            <div className="flex items-start justify-between">
              <Tag>Currently Learning</Tag>
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            </div>
            <h3 className="mt-4 font-display text-2xl text-white font-bold">
              Cybersecurity <span className="text-amber-400">·</span> Systems design <span className="text-amber-400">·</span> OWASP
            </h3>
            <p className="mt-3 text-white/55 text-sm">
              Deepening on web security, secure auth flows, and scalable backend architectures.
            </p>
          </Bento>
        </div>
      </div>
    </section>
  )
}

const Tag = ({ children }) => (
  <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-amber-400/80">{children}</span>
)

const Bento = ({ className, children }) => (
  <Reveal className={cn('group h-full', className)}>
    <TiltCard
      max={4}
      className="relative h-full glass rounded-3xl p-6 md:p-7 overflow-hidden hover:border-amber-400/30 transition-colors"
    >
      <div className="relative z-10 h-full">{children}</div>
    </TiltCard>
  </Reveal>
)

export default Skills
