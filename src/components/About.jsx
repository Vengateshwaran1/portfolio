import { DiHtml5, DiCss3, DiJavascript1, DiReact, DiNodejsSmall, DiPython, DiGit, DiMongodb } from 'react-icons/di'
import { SiCplusplus, SiTailwindcss, SiOracle, SiDocker, SiExpress, SiPostman, SiAmazonec2, SiSocketdotio, SiRedis } from 'react-icons/si'

const techs = [
  { Icon: DiReact, name: 'React' },
  { Icon: DiNodejsSmall, name: 'Node.js' },
  { Icon: SiExpress, name: 'Express' },
  { Icon: DiMongodb, name: 'MongoDB' },
  { Icon: DiJavascript1, name: 'JavaScript' },
  { Icon: DiPython, name: 'Python' },
  { Icon: SiCplusplus, name: 'C++' },
  { Icon: SiOracle, name: 'Oracle' },
  { Icon: SiDocker, name: 'Docker' },
  { Icon: SiAmazonec2, name: 'AWS EC2' },
  { Icon: SiSocketdotio, name: 'Socket.io' },
  { Icon: SiRedis, name: 'Redis' },
  { Icon: SiPostman, name: 'Postman' },
  { Icon: DiGit, name: 'Git' },
  { Icon: SiTailwindcss, name: 'Tailwind' },
  { Icon: DiHtml5, name: 'HTML' },
  { Icon: DiCss3, name: 'CSS' },
]

const Row = ({ reverse }) => (
  <div
    className="flex shrink-0 items-center gap-12 px-6"
    style={{ animationDirection: reverse ? 'reverse' : 'normal' }}
  >
    {techs.map(({ Icon, name }, i) => (
      <div
        key={i}
        className="flex items-center gap-3 text-white/30 hover:text-amber-400/90 transition-colors group"
      >
        <Icon className="text-3xl md:text-4xl group-hover:scale-105 transition-transform" />
        <span className="font-display text-lg md:text-2xl tracking-tight">{name}</span>
        <span className="text-white/15 mx-3">/</span>
      </div>
    ))}
  </div>
)

const About = () => (
  <section className="relative py-20 md:py-28 overflow-hidden">
    <div className="container-x">
      <div className="ring-divider mb-12" />
    </div>
    <div className="flex w-max animate-marquee will-change-transform">
      <Row />
      <Row />
    </div>
    <div className="pointer-events-none absolute inset-y-0 left-0 w-24 md:w-40 bg-gradient-to-r from-ink-950 to-transparent z-10" />
    <div className="pointer-events-none absolute inset-y-0 right-0 w-24 md:w-40 bg-gradient-to-l from-ink-950 to-transparent z-10" />
  </section>
)

export default About
