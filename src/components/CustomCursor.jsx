import { useEffect, useRef, useState } from 'react'
import { isTouchDevice } from '../lib/utils'

const CustomCursor = () => {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const labelRef = useRef(null)
  const pos = useRef({ x: 0, y: 0 })
  const ringPos = useRef({ x: 0, y: 0 })
  const [enabled, setEnabled] = useState(false)
  const stateRef = useRef({ hover: false, label: '' })

  useEffect(() => {
    if (isTouchDevice()) return
    setEnabled(true)
    document.body.classList.add('has-cursor')

    const onMove = (e) => {
      pos.current.x = e.clientX
      pos.current.y = e.clientY
    }

    const onOver = (e) => {
      const target = e.target.closest('[data-cursor]')
      if (target) {
        const variant = target.dataset.cursor
        const label = target.dataset.cursorLabel || ''
        stateRef.current = { hover: true, label, variant }
        ringRef.current?.classList.add('cursor-active')
        if (variant === 'view') ringRef.current?.classList.add('cursor-view')
        if (label && labelRef.current) labelRef.current.textContent = label
      } else {
        stateRef.current = { hover: false, label: '' }
        ringRef.current?.classList.remove('cursor-active', 'cursor-view')
        if (labelRef.current) labelRef.current.textContent = ''
      }
    }

    let raf
    const loop = () => {
      ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.18
      ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.18
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) translate(-50%, -50%)`
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%)`
      }
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mouseover', onOver)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
      document.body.classList.remove('has-cursor')
    }
  }, [])

  if (!enabled) return null

  return (
    <>
      <style>{`
        .custom-cursor-dot { width: 6px; height: 6px; background: #C5C9D6; border-radius: 9999px; position: fixed; top: 0; left: 0; pointer-events: none; z-index: 9999; mix-blend-mode: difference; transition: opacity 0.2s; box-shadow: 0 0 12px rgba(167,139,250,0.6); }
        .custom-cursor-ring { width: 36px; height: 36px; border: 1px solid rgba(167,139,250,0.65); border-radius: 9999px; position: fixed; top: 0; left: 0; pointer-events: none; z-index: 9998; transition: width 0.25s cubic-bezier(0.22,1,0.36,1), height 0.25s cubic-bezier(0.22,1,0.36,1), background 0.25s, border-color 0.25s; display: flex; align-items: center; justify-content: center; }
        .custom-cursor-ring.cursor-active { width: 70px; height: 70px; background: rgba(167,139,250,0.14); border-color: rgba(167,139,250,0.95); }
        .custom-cursor-ring.cursor-view { width: 92px; height: 92px; background: linear-gradient(135deg, rgba(197,201,214,0.85), rgba(167,139,250,0.9)); border-color: rgba(167,139,250,1); }
        .custom-cursor-ring.cursor-view .cursor-label { color: #07080B; }
        .cursor-label { font-family: 'JetBrains Mono', monospace; font-size: 10px; text-transform: uppercase; letter-spacing: 0.18em; color: #C5C9D6; }
      `}</style>
      <div ref={dotRef} className="custom-cursor-dot" />
      <div ref={ringRef} className="custom-cursor-ring">
        <span ref={labelRef} className="cursor-label" />
      </div>
    </>
  )
}

export default CustomCursor
