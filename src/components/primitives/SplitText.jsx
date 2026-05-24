import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '../../lib/gsap'
import { cn } from '../../lib/utils'

const SplitText = ({ children, className, by = 'word', delay = 0, stagger = 0.04, trigger = true, as: Tag = 'span' }) => {
  const ref = useRef(null)

  useEffect(() => {
    if (!ref.current) return
    const el = ref.current
    const text = el.textContent
    el.textContent = ''
    const units = by === 'char' ? Array.from(text) : text.split(/(\s+)/)

    units.forEach((u) => {
      if (/^\s+$/.test(u)) {
        el.appendChild(document.createTextNode(u))
        return
      }
      const outer = document.createElement('span')
      outer.style.display = 'inline-block'
      outer.style.overflow = 'hidden'
      outer.style.verticalAlign = 'top'
      const inner = document.createElement('span')
      inner.style.display = 'inline-block'
      inner.style.willChange = 'transform, opacity'
      inner.textContent = u
      outer.appendChild(inner)
      el.appendChild(outer)
    })

    const inners = el.querySelectorAll('span > span')
    gsap.set(inners, { yPercent: 110, opacity: 0 })

    const tween = gsap.to(inners, {
      yPercent: 0,
      opacity: 1,
      duration: 1,
      ease: 'expo.out',
      stagger,
      delay,
      paused: trigger,
    })

    let st
    if (trigger) {
      st = ScrollTrigger.create({
        trigger: el,
        start: 'top 85%',
        once: true,
        onEnter: () => tween.play(),
      })
    } else {
      tween.play()
    }

    return () => {
      tween.kill()
      st?.kill()
      el.textContent = text
    }
  }, [children, by, delay, stagger, trigger])

  return <Tag ref={ref} className={cn('inline-block', className)}>{children}</Tag>
}

export default SplitText
