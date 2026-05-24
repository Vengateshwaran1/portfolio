import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { cn } from '../../lib/utils'

const MagneticButton = ({ children, className, strength = 0.35, as: Tag = 'button', ...props }) => {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 200, damping: 18, mass: 0.6 })
  const sy = useSpring(y, { stiffness: 200, damping: 18, mass: 0.6 })

  const handleMove = (e) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    x.set((e.clientX - cx) * strength)
    y.set((e.clientY - cy) * strength)
  }

  const reset = () => { x.set(0); y.set(0) }

  const MotionTag = motion[Tag] || motion.button

  return (
    <MotionTag
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy }}
      className={cn('relative inline-flex items-center justify-center will-change-transform', className)}
      {...props}
    >
      {children}
    </MotionTag>
  )
}

export default MagneticButton
