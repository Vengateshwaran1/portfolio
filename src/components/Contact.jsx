import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiArrowUpRight, HiCheckCircle } from 'react-icons/hi2'
import { AiOutlineGithub, AiOutlineLinkedin, AiOutlineMail, AiOutlinePhone } from 'react-icons/ai'
import Reveal from './primitives/Reveal'
import SplitText from './primitives/SplitText'
import MagneticButton from './primitives/MagneticButton'

const Contact = () => {
  const [state, setState] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | submitting | success | error
  const [touched, setTouched] = useState({})

  const errors = {
    name: state.name.trim().length < 2 ? 'Tell me your name' : '',
    email: !/^\S+@\S+\.\S+$/.test(state.email) ? 'Looks like an invalid email' : '',
    message: state.message.trim().length < 10 ? 'Add a bit more detail' : '',
  }
  const isValid = !errors.name && !errors.email && !errors.message

  const submit = async (e) => {
    e.preventDefault()
    setTouched({ name: true, email: true, message: true })
    if (!isValid) return
    setStatus('submitting')
    try {
      const formData = new FormData()
      Object.entries(state).forEach(([k, v]) => formData.append(k, v))
      const res = await fetch('https://formsubmit.co/ajax/e973a77dcd1f3ce0e493385323d5e867', {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' },
      })
      if (!res.ok) throw new Error('Network')
      setStatus('success')
      setState({ name: '', email: '', message: '' })
      setTimeout(() => setStatus('idle'), 4200)
    } catch (err) {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 3500)
    }
  }

  return (
    <section id="contact" className="relative py-32 md:py-44">
      <div className="container-x">
        <Reveal>
          <p className="eyebrow mb-6">— 06 / Contact</p>
        </Reveal>
        <h2 className="display-xl text-white text-balance">
          <SplitText by="word" stagger={0.06}>Let&apos;s build</SplitText>{' '}
          <span className="gradient-text"><SplitText by="word" stagger={0.06} delay={0.15}>something great.</SplitText></span>
        </h2>

        <div className="mt-16 grid grid-cols-12 gap-8 lg:gap-12">
          <div className="col-span-12 lg:col-span-5">
            <Reveal>
              <p className="text-white/65 text-lg md:text-xl leading-relaxed text-pretty">
                I&apos;m open to freelance, internships, and full-time roles.
                Tell me about your idea, your team, or just say hi.
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="mt-10 space-y-4">
                <ContactLink href="mailto:kvengateshwaran1@gmail.com" Icon={AiOutlineMail} label="Email">
                  kvengateshwaran1@gmail.com
                </ContactLink>
                <ContactLink href="tel:+919361268307" Icon={AiOutlinePhone} label="Phone">
                  +91 93612 68307
                </ContactLink>
                <ContactLink href="https://github.com/Vengateshwaran1" Icon={AiOutlineGithub} label="GitHub">
                  @Vengateshwaran1
                </ContactLink>
                <ContactLink href="https://www.linkedin.com/in/vengateshwaran-k" Icon={AiOutlineLinkedin} label="LinkedIn">
                  /in/vengateshwaran-k
                </ContactLink>
              </div>
            </Reveal>
          </div>

          <div className="col-span-12 lg:col-span-7">
            <Reveal delay={0.1}>
              <form onSubmit={submit} className="relative glass rounded-3xl p-6 md:p-10 overflow-hidden">
                <AnimatePresence>
                  {status === 'success' && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 z-20 bg-ink-900/90 backdrop-blur-xl grid place-items-center"
                    >
                      <motion.div
                        initial={{ scale: 0.6, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: 'spring', stiffness: 200, damping: 14 }}
                        className="flex flex-col items-center text-center px-6"
                      >
                        <div className="relative">
                          <HiCheckCircle className="text-amber-400 text-6xl" />
                          <span className="absolute inset-0 rounded-full bg-amber-400/30 animate-pulseRing" />
                        </div>
                        <h3 className="mt-5 font-display text-2xl md:text-3xl text-white font-bold">
                          Message sent.
                        </h3>
                        <p className="mt-2 text-white/60">I&apos;ll get back to you within 24h.</p>
                      </motion.div>
                      <Confetti />
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="grid md:grid-cols-2 gap-5">
                  <Field
                    label="Name"
                    value={state.name}
                    onChange={(v) => setState((s) => ({ ...s, name: v }))}
                    onBlur={() => setTouched((t) => ({ ...t, name: true }))}
                    error={touched.name && errors.name}
                  />
                  <Field
                    label="Email"
                    type="email"
                    value={state.email}
                    onChange={(v) => setState((s) => ({ ...s, email: v }))}
                    onBlur={() => setTouched((t) => ({ ...t, email: true }))}
                    error={touched.email && errors.email}
                  />
                </div>

                <div className="mt-5">
                  <Field
                    label="Message"
                    textarea
                    value={state.message}
                    onChange={(v) => setState((s) => ({ ...s, message: v }))}
                    onBlur={() => setTouched((t) => ({ ...t, message: true }))}
                    error={touched.message && errors.message}
                  />
                </div>

                <div className="mt-7 flex items-center justify-between flex-wrap gap-4">
                  <p className="text-xs text-white/40 font-mono">
                    {status === 'error' ? 'Something went wrong — try again.' : 'Replies usually within 24h'}
                  </p>
                  <MagneticButton
                    type="submit"
                    data-cursor="view"
                    data-cursor-label="Send"
                    disabled={status === 'submitting'}
                    className="px-8 py-4 rounded-full bg-amber-400 text-ink-950 font-semibold shadow-amber disabled:opacity-60"
                  >
                    {status === 'submitting' ? 'Sending…' : (<>Send Message <HiArrowUpRight className="ml-2" /></>)}
                  </MagneticButton>
                </div>
              </form>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}

const Field = ({ label, value, onChange, onBlur, error, type = 'text', textarea }) => {
  const Tag = textarea ? 'textarea' : 'input'
  return (
    <label className="block">
      <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/50">{label}</span>
      <Tag
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        rows={textarea ? 5 : undefined}
        className={`mt-2 w-full bg-transparent border-b outline-none py-3 text-white text-base placeholder:text-white/30 transition-colors focus:border-amber-400 ${
          error ? 'border-red-400/70' : 'border-white/15'
        }`}
        placeholder={textarea ? 'Tell me about your project…' : `Your ${label.toLowerCase()}`}
      />
      <AnimatePresence>
        {error && (
          <motion.span
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="block mt-1 text-xs text-red-400/90"
          >
            {error}
          </motion.span>
        )}
      </AnimatePresence>
    </label>
  )
}

const ContactLink = ({ href, Icon, label, children }) => (
  <a
    href={href}
    target={href.startsWith('http') ? '_blank' : undefined}
    rel="noopener"
    data-cursor="hover"
    className="group flex items-center gap-4 p-4 rounded-2xl glass hover:bg-amber-400/[0.06] hover:border-amber-400/30 transition-all"
  >
    <span className="w-11 h-11 grid place-items-center rounded-xl bg-white/[0.04] text-amber-400 text-xl">
      <Icon />
    </span>
    <div className="flex-1">
      <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/40">{label}</div>
      <div className="text-white font-medium">{children}</div>
    </div>
    <HiArrowUpRight className="text-white/30 group-hover:text-amber-400 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
  </a>
)

const Confetti = () => {
  const pieces = Array.from({ length: 24 })
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {pieces.map((_, i) => {
        const colors = ['#A78BFA', '#FFF', '#6D28D9', '#C5C9D6']
        const c = colors[i % colors.length]
        const left = Math.random() * 100
        const delay = Math.random() * 0.2
        const dur = 1.2 + Math.random() * 0.8
        const rot = (Math.random() - 0.5) * 720
        return (
          <motion.span
            key={i}
            initial={{ y: -20, x: 0, opacity: 0, rotate: 0 }}
            animate={{ y: '110vh', opacity: [0, 1, 1, 0], rotate: rot }}
            transition={{ duration: dur, delay, ease: 'easeOut' }}
            className="absolute top-0 w-1.5 h-3 rounded-sm"
            style={{ left: `${left}%`, background: c }}
          />
        )
      })}
    </div>
  )
}

export default Contact
