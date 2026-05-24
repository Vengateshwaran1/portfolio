import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion'
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai'
import MagneticButton from './primitives/MagneticButton'
import { scrollTo } from './providers/LenisProvider'
import { cn } from '../lib/utils'

const links = [
  { id: 'about', label: 'About', num: '01' },
  { id: 'skills', label: 'Skills', num: '02' },
  { id: 'work', label: 'Work', num: '03' },
  { id: 'timeline', label: 'Journey', num: '04' },
  { id: 'contact', label: 'Contact', num: '05' },
]

const Navbar = () => {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 22, mass: 0.4 })

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const go = (id) => {
    setOpen(false)
    scrollTo(`#${id}`, -40)
  }

  return (
    <>
      <motion.div
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          scrolled ? 'py-2' : 'py-4'
        )}
      >
        <div className={cn(
          'container-x flex items-center justify-between rounded-2xl transition-all duration-500',
          scrolled ? 'glass-strong shadow-glass py-3 px-4 md:px-6' : 'py-3 px-4'
        )}>
          <button
            onClick={() => scrollTo(0)}
            data-cursor="hover"
            data-cursor-label="Home"
            className="flex items-center gap-2 group"
          >
            <span className="w-8 h-8 rounded-lg bg-amber-400 text-ink-950 grid place-items-center font-display font-bold text-lg shadow-amber group-hover:scale-105 transition-transform">
              V
            </span>
            <span className="font-display font-semibold text-white tracking-tight hidden sm:inline">
              Vengateshwaran<span className="text-amber-400">.</span>K
            </span>
          </button>

          <ul className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <li key={l.id}>
                <MagneticButton
                  onClick={() => go(l.id)}
                  data-cursor="hover"
                  className="px-4 py-2 rounded-xl text-sm text-white/70 hover:text-white transition-colors group"
                  strength={0.25}
                >
                  {l.label}
                </MagneticButton>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <MagneticButton
              as="a"
              href="#contact"
              onClick={(e) => { e.preventDefault(); go('contact') }}
              data-cursor="hover"
              data-cursor-label="Let's Talk"
              className="hidden md:inline-flex px-5 py-2.5 rounded-full bg-amber-400 text-ink-950 font-semibold text-sm shadow-amber hover:shadow-ring transition-all"
            >
              Let's Talk
              <span className="ml-2 w-1.5 h-1.5 rounded-full bg-ink-950 animate-pulse" />
            </MagneticButton>

            <button
              onClick={() => setOpen(!open)}
              className="md:hidden w-11 h-11 rounded-xl glass grid place-items-center text-white"
              aria-label="Toggle menu"
            >
              {open ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
            </button>
          </div>
        </div>

        {/* Scroll progress */}
        <motion.div
          className="absolute left-0 right-0 bottom-0 h-px origin-left bg-gradient-to-r from-transparent via-amber-400 to-transparent"
          style={{ scaleX: progress }}
        />
      </motion.div>

      {/* Mobile sheet */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 md:hidden bg-ink-950/95 backdrop-blur-2xl flex flex-col items-center justify-center"
          >
            <ul className="flex flex-col items-center gap-6">
              {links.map((l, i) => (
                <motion.li
                  key={l.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 * i + 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <button
                    onClick={() => go(l.id)}
                    className="text-white font-display text-4xl font-bold flex items-baseline gap-3"
                  >
                    <span className="font-mono text-sm text-amber-400">{l.num}</span>
                    {l.label}
                  </button>
                </motion.li>
              ))}
              <motion.li
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.42, duration: 0.5 }}
              >
                <button
                  onClick={() => go('contact')}
                  className="mt-6 px-7 py-3 rounded-full bg-amber-400 text-ink-950 font-semibold"
                >
                  Let's Talk
                </button>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar
