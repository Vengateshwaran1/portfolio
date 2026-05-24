import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const Preloader = ({ onDone }) => {
  const [count, setCount] = useState(0)
  const [done, setDone] = useState(false)
  const raf = useRef(null)

  useEffect(() => {
    document.documentElement.classList.add('lenis-stopped')
    let current = 0
    const tick = () => {
      const target = Math.min(100, current + (100 - current) * 0.06 + 0.4)
      current = target
      setCount(Math.floor(current))
      if (current >= 99.4) {
        setCount(100)
        setTimeout(() => setDone(true), 350)
        return
      }
      raf.current = requestAnimationFrame(tick)
    }
    raf.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf.current)
  }, [])

  useEffect(() => {
    if (done) {
      const t = setTimeout(() => {
        document.documentElement.classList.remove('lenis-stopped')
        onDone?.()
      }, 950)
      return () => clearTimeout(t)
    }
  }, [done, onDone])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[100] bg-ink-950 flex items-end justify-between px-6 md:px-16 pb-10 md:pb-16 overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.7, 0, 0.2, 1] }}
        >
          {/* Top curtain */}
          <motion.div
            className="absolute inset-x-0 top-0 h-1/2 bg-ink-950 z-[2]"
            initial={{ y: 0 }}
            animate={done ? { y: '-100%' } : { y: 0 }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          />
          <motion.div
            className="absolute inset-x-0 bottom-0 h-1/2 bg-ink-950 z-[2]"
            initial={{ y: 0 }}
            animate={done ? { y: '100%' } : { y: 0 }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          />

          {/* Brand */}
          <div className="relative z-[3] font-mono text-xs uppercase tracking-[0.4em] text-amber-400/80">
            <span className="block">Vengateshwaran.K</span>
            <span className="block text-white/40 mt-1">Portfolio · 2026</span>
          </div>

          {/* Counter */}
          <div className="relative z-[3] flex items-baseline gap-2">
            <span className="font-display font-bold tabular-nums text-[20vw] md:text-[14vw] leading-none text-white">
              {String(count).padStart(3, '0')}
            </span>
            <span className="font-mono text-amber-400 text-2xl md:text-4xl">%</span>
          </div>

          {/* Progress line */}
          <motion.div
            className="absolute bottom-0 left-0 h-[2px] bg-amber-400 z-[3]"
            style={{ width: `${count}%` }}
            transition={{ ease: 'linear' }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Preloader
