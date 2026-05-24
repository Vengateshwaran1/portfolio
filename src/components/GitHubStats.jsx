import { useEffect, useState } from 'react'
import { HiArrowUpRight, HiOutlineCodeBracket } from 'react-icons/hi2'
import Reveal from './primitives/Reveal'
import SplitText from './primitives/SplitText'

const USER = 'Vengateshwaran1'
const ACCENT = 'A78BFA'
const CHART_URL = `https://ghchart.rshah.org/${ACCENT}/${USER}`

const formatDate = (iso) =>
  new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

const parseCommits = (events) => {
  const commits = []
  for (const event of events) {
    if (event.type !== 'PushEvent' || !event.payload?.commits?.length) continue
    for (const commit of event.payload.commits) {
      if (!commit?.message || commit.message.startsWith('Merge ')) continue
      commits.push({
        id: `${event.id}-${commit.sha}`,
        message: commit.message.split('\n')[0],
        repo: event.repo?.name?.replace(`${USER}/`, '') || event.repo?.name || 'repository',
        date: event.created_at,
        url: `https://github.com/${event.repo?.name}/commit/${commit.sha}`,
      })
      if (commits.length >= 12) return commits
    }
  }
  return commits
}

const GitHubStats = () => {
  const [commits, setCommits] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    let cancelled = false

    const load = async () => {
      try {
        const res = await fetch(
          `https://api.github.com/users/${USER}/events/public?per_page=100`,
          { headers: { Accept: 'application/vnd.github+json' } }
        )
        if (!res.ok) throw new Error('fetch failed')
        const events = await res.json()
        if (!cancelled) {
          setCommits(parseCommits(events))
          setError(false)
        }
      } catch {
        if (!cancelled) setError(true)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()
    return () => { cancelled = true }
  }, [])

  return (
    <section id="github" className="relative py-20 md:py-44">
      <div className="container-x">
        <Reveal>
          <p className="eyebrow mb-6">Activity</p>
        </Reveal>

        <div className="flex items-end justify-between flex-wrap gap-4 md:gap-6 mb-8 md:mb-12">
          <h2 className="display-lg text-white text-balance max-w-3xl">
            <SplitText by="word" stagger={0.06}>Recent</SplitText>{' '}
            <span className="gradient-text">
              <SplitText by="word" stagger={0.06} delay={0.15}>commits.</SplitText>
            </span>
          </h2>
          <a
            href={`https://github.com/${USER}`}
            target="_blank"
            rel="noopener"
            data-cursor="view"
            data-cursor-label="GitHub"
            className="inline-flex items-center gap-2 text-amber-400/90 hover:text-amber-300 font-medium transition-colors"
          >
            @{USER} <HiArrowUpRight />
          </a>
        </div>

        <Reveal>
          <div className="glass-metallic rounded-2xl md:rounded-3xl border border-white/[0.08] shadow-glass overflow-hidden">
            <div className="flex items-center justify-between gap-4 px-4 md:px-8 py-4 md:py-5 border-b border-white/[0.06]">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-white/40">
                  Contribution graph
                </p>
                <p className="mt-1 text-white/70 text-sm">Commit activity over the last year</p>
              </div>
              <span className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/20 font-mono text-[10px] uppercase tracking-[0.2em] text-amber-400/90">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                Commits
              </span>
            </div>

            <div className="px-3 md:px-8 py-4 md:py-8 bg-ink-950/40">
              <div className="rounded-xl md:rounded-2xl border border-white/[0.05] bg-ink-900/50 p-3 md:p-6 overflow-x-auto">
                <img
                  src={CHART_URL}
                  alt={`${USER} GitHub commit contributions`}
                  className="w-full min-w-[600px] md:min-w-0 opacity-95"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.12} className="mt-8">
          <div className="glass rounded-2xl md:rounded-3xl border border-white/[0.06] overflow-hidden">
            <div className="px-4 md:px-8 py-4 md:py-5 border-b border-white/[0.06] flex items-center gap-3">
              <HiOutlineCodeBracket className="text-amber-400/80" size={20} />
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-white/40">
                  Latest pushes
                </p>
                <p className="text-white/60 text-sm mt-0.5">Public commit history from GitHub</p>
              </div>
            </div>

            <ul className="divide-y divide-white/[0.05]">
              {loading &&
                Array.from({ length: 6 }).map((_, i) => (
                  <li key={i} className="px-4 md:px-8 py-3 md:py-4 flex gap-3 md:gap-4 animate-pulse">
                    <div className="w-2 h-2 mt-2 rounded-full bg-amber-400/20 shrink-0" />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-white/[0.06] rounded w-3/4" />
                      <div className="h-3 bg-white/[0.04] rounded w-1/3" />
                    </div>
                  </li>
                ))}

              {!loading && error && (
                <li className="px-6 md:px-8 py-10 text-center text-white/50 text-sm">
                  Could not load commits.{' '}
                  <a
                    href={`https://github.com/${USER}`}
                    target="_blank"
                    rel="noopener"
                    className="text-amber-400 hover:text-amber-300"
                  >
                    View on GitHub
                  </a>
                </li>
              )}

              {!loading && !error && commits.length === 0 && (
                <li className="px-6 md:px-8 py-10 text-center text-white/50 text-sm">
                  No recent public commits found.
                </li>
              )}

              {!loading &&
                !error &&
                commits.map((c) => (
                  <li key={c.id}>
                    <a
                      href={c.url}
                      target="_blank"
                      rel="noopener"
                      data-cursor="hover"
                      className="group flex gap-3 md:gap-4 px-4 md:px-8 py-3 md:py-4 hover:bg-white/[0.02] transition-colors"
                    >
                      <span className="w-2 h-2 mt-2.5 rounded-full bg-amber-400/70 shrink-0 group-hover:bg-amber-400 group-hover:shadow-[0_0_12px_rgba(167,139,250,0.6)] transition-all" />
                      <div className="min-w-0 flex-1">
                        <p className="text-white/90 font-medium truncate group-hover:text-white transition-colors">
                          {c.message}
                        </p>
                        <p className="mt-1 font-mono text-[11px] text-white/40">
                          <span className="text-amber-400/70">{c.repo}</span>
                          <span className="mx-2 text-white/20">·</span>
                          {formatDate(c.date)}
                        </p>
                      </div>
                      <HiArrowUpRight className="shrink-0 text-white/20 group-hover:text-amber-400/80 transition-colors mt-1" size={16} />
                    </a>
                  </li>
                ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export default GitHubStats
