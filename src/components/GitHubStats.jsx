import Reveal from './primitives/Reveal'
import SplitText from './primitives/SplitText'
import TiltCard from './primitives/TiltCard'
import { HiArrowUpRight } from 'react-icons/hi2'

const USER = 'Vengateshwaran1'

const cards = [
  {
    title: 'Stats',
    src: `https://github-readme-stats.vercel.app/api?username=${USER}&show_icons=true&hide_border=true&bg_color=00000000&title_color=F5B544&icon_color=F5B544&text_color=E5E7EB&ring_color=F5B544&include_all_commits=true&count_private=true`,
  },
  {
    title: 'Top Languages',
    src: `https://github-readme-stats.vercel.app/api/top-langs/?username=${USER}&layout=donut&hide_border=true&bg_color=00000000&title_color=F5B544&text_color=E5E7EB&langs_count=8`,
  },
]

const GitHubStats = () => {
  return (
    <section id="github" className="relative py-32 md:py-44">
      <div className="container-x">
        <Reveal>
          <p className="eyebrow mb-6">— 05 / Activity</p>
        </Reveal>
        <div className="flex items-end justify-between flex-wrap gap-6 mb-12">
          <h2 className="display-lg text-white text-balance max-w-3xl">
            <SplitText by="word" stagger={0.06}>Pushing commits,</SplitText>{' '}
            <span className="gradient-text"><SplitText by="word" stagger={0.06} delay={0.15}>publicly.</SplitText></span>
          </h2>
          <a
            href={`https://github.com/${USER}`}
            target="_blank"
            rel="noopener"
            data-cursor="view"
            data-cursor-label="GitHub"
            className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 font-medium"
          >
            @{USER} <HiArrowUpRight />
          </a>
        </div>

        <div className="grid grid-cols-12 gap-5">
          <Reveal className="col-span-12 lg:col-span-7">
            <TiltCard max={3} className="glass rounded-3xl p-6 md:p-8 overflow-hidden">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-amber-400/80 mb-4">Contribution graph</p>
              <img
                src={`https://ghchart.rshah.org/F5B544/${USER}`}
                alt={`${USER} GitHub contributions`}
                className="w-full"
                loading="lazy"
              />
            </TiltCard>
          </Reveal>

          {cards.map((c, i) => (
            <Reveal key={c.title} delay={0.1 + i * 0.08} className="col-span-12 md:col-span-6 lg:col-span-5">
              <TiltCard max={4} className="glass rounded-3xl p-2 md:p-4 overflow-hidden h-full grid place-items-center">
                <img src={c.src} alt={c.title} className="w-full" loading="lazy" />
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export default GitHubStats
