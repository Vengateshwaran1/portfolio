import { motion } from 'framer-motion'
import { HiArrowUp } from 'react-icons/hi2'
import { AiOutlineGithub, AiOutlineLinkedin, AiOutlineInstagram, AiOutlineMail } from 'react-icons/ai'
import MagneticButton from './primitives/MagneticButton'
import { scrollTo } from './providers/LenisProvider'

const Footer = () => {
  return (
    <footer className="relative pt-16 md:pt-24 pb-[calc(2rem+env(safe-area-inset-bottom))] md:pb-10 border-t border-white/[0.06] mt-8 md:mt-12">
      <div className="container-x">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 md:gap-10 mb-12 md:mb-20">
          <div className="max-w-xl">
            <p className="eyebrow mb-4">— Let&apos;s connect</p>
            <h3 className="display-lg text-white text-balance">
              Got an idea?
              <br />
              <span className="gradient-text">Let&apos;s ship it.</span>
            </h3>
            <a
              href="mailto:kvengateshwaran1@gmail.com"
              data-cursor="hover"
              className="mt-6 inline-block text-amber-400 hover:text-amber-300 font-mono text-sm md:text-base"
            >
              kvengateshwaran1@gmail.com
            </a>
          </div>

          <MagneticButton
            onClick={() => scrollTo(0)}
            data-cursor="view"
            data-cursor-label="Top"
            strength={0.5}
            className="group w-16 h-16 md:w-24 md:h-24 rounded-full glass-amber grid place-items-center text-amber-400 hover:bg-amber-400 hover:text-ink-950 transition-colors self-end md:self-auto"
          >
            <div className="flex flex-col items-center">
              <HiArrowUp className="text-2xl group-hover:-translate-y-1 transition-transform" />
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] mt-1">Top</span>
            </div>
          </MagneticButton>
        </div>

        <div className="ring-divider mb-8" />

        <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center justify-between gap-4 md:gap-6 text-white/40 text-sm">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-amber-400 text-ink-950 grid place-items-center font-display font-bold">V</span>
            <span className="font-display text-white">Vengateshwaran<span className="text-amber-400">.</span>K</span>
            <span className="hidden md:inline text-white/30">·</span>
            <span className="hidden md:inline">Coimbatore, IN</span>
          </div>

          <div className="flex items-center gap-2">
            {[
              { Icon: AiOutlineGithub, href: 'https://github.com/Vengateshwaran1', label: 'GitHub' },
              { Icon: AiOutlineLinkedin, href: 'https://www.linkedin.com/in/vengateshwaran-k', label: 'LinkedIn' },
              { Icon: AiOutlineInstagram, href: 'https://www.instagram.com/vengateshwaran_', label: 'Instagram' },
              { Icon: AiOutlineMail, href: 'mailto:kvengateshwaran1@gmail.com', label: 'Email' },
            ].map(({ Icon, href, label }) => (
              <MagneticButton
                key={label}
                as="a"
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel="noopener"
                aria-label={label}
                data-cursor="hover"
                strength={0.4}
                className="w-10 h-10 rounded-full glass grid place-items-center text-white/70 hover:text-amber-400 transition-colors"
              >
                <Icon />
              </MagneticButton>
            ))}
          </div>

          <div className="flex items-center gap-3 md:gap-4">
            <span className="font-mono text-xs">© {new Date().getFullYear()} Vengateshwaran.K</span>
            <span className="flex items-center gap-1.5 font-mono text-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Available
            </span>
          </div>
        </div>

        {/* Mega wordmark */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          aria-hidden
          className="mt-10 md:mt-16 select-none"
        >
          {/* textLength pins the name to the viewBox width, so it always fits
              its container exactly — no clipping at any viewport. */}
          <svg
            viewBox="0 0 1000 150"
            className="w-full h-auto block overflow-visible"
            role="presentation"
            focusable="false"
          >
            <text
              x="0"
              y="118"
              textLength="1000"
              lengthAdjust="spacingAndGlyphs"
              fill="rgba(255,255,255,0.045)"
              className="font-display font-bold"
              style={{ fontSize: '128px', letterSpacing: '-0.06em' }}
            >
              VENGATESHWARAN
            </text>
          </svg>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer
