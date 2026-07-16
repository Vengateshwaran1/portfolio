import { useEffect, useState } from 'react'

/* Single source of truth for the JS-side mobile breakpoint. 767px matches
   Tailwind's `md:` boundary exactly — if the two ever disagree there's a
   dead-zone where CSS and JS render different layouts. */
const QUERY = '(max-width: 767px)'

const useIsMobile = () => {
  const [mobile, setMobile] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(QUERY).matches
  )

  useEffect(() => {
    const mq = window.matchMedia(QUERY)
    const onChange = (e) => setMobile(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return mobile
}

export default useIsMobile
