import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiArrowDownTray, HiXMark, HiArrowUpRight } from 'react-icons/hi2'
import resumePdf from '../assets/1.pdf'
import MagneticButton from './primitives/MagneticButton'

const ResumeModal = ({ open, onClose }) => {
  useEffect(() => {
    if (open) document.documentElement.classList.add('lenis-stopped')
    else document.documentElement.classList.remove('lenis-stopped')
    return () => document.documentElement.classList.remove('lenis-stopped')
  }, [open])

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    if (open) window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-center justify-center p-4 md:p-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute inset-0 bg-ink-950/85 backdrop-blur-xl"
            onClick={onClose}
          />
          <motion.div
            initial={{ scale: 0.92, y: 24, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 16, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 22 }}
            className="relative w-full max-w-4xl h-[88vh] glass-strong rounded-3xl overflow-hidden shadow-glass"
          >
            <div className="flex items-center justify-between px-5 md:px-6 py-3 border-b border-white/[0.06] bg-ink-900/50">
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-amber-400/80">Resume · PDF</div>
                  <div className="font-display text-white text-sm md:text-base">Vengateshwaran K.</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <MagneticButton
                  as="a"
                  href={resumePdf}
                  download="Vengateshwaran-Resume.pdf"
                  data-cursor="hover"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-400 text-ink-950 text-sm font-semibold"
                >
                  <HiArrowDownTray /> Download
                </MagneticButton>
                <a
                  href={resumePdf}
                  target="_blank"
                  rel="noopener"
                  data-cursor="hover"
                  className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-white/80 text-sm hover:text-amber-400"
                >
                  Open <HiArrowUpRight />
                </a>
                <button
                  onClick={onClose}
                  aria-label="Close"
                  data-cursor="hover"
                  className="w-10 h-10 rounded-full glass grid place-items-center text-white/80 hover:text-amber-400"
                >
                  <HiXMark size={20} />
                </button>
              </div>
            </div>
            <iframe
              src={resumePdf + '#toolbar=0&view=FitH'}
              title="Resume preview"
              className="w-full h-full bg-white"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default ResumeModal
