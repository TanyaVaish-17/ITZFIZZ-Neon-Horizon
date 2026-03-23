'use client'
import { useEffect, useRef, useState } from 'react'

const stats = [
  { value: 98,  suffix: '%', label: 'Uptime', color: '#00f5ff' },
  { value: 2.4, suffix: 'M', label: 'Active Users', color: '#ff006e' },
  { value: 340, suffix: 'ms', label: 'Avg. Response', color: '#7b2fff' },
  { value: 99,  suffix: '%', label: 'Satisfaction', color: '#00f5ff' },
]

function CountUp({ target, suffix, duration = 1800 }: { target: number; suffix: string; duration?: number }) {
  const [current, setCurrent] = useState(0)
  const startRef = useRef<number | null>(null)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const animate = (timestamp: number) => {
      if (!startRef.current) startRef.current = timestamp
      const elapsed = timestamp - startRef.current
      const progress = Math.min(elapsed / duration, 1)
      // Ease out quad
      const eased = 1 - (1 - progress) * (1 - progress)
      setCurrent(parseFloat((target * eased).toFixed(target % 1 !== 0 ? 1 : 0)))
      if (progress < 1) rafRef.current = requestAnimationFrame(animate)
    }
    rafRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafRef.current)
  }, [target, duration])

  return <>{current}{suffix}</>
}

export default function StatsRow() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    import('gsap').then(({ gsap }) => {
      const cards = ref.current?.querySelectorAll('.stat-card')
      if (!cards) return

      gsap.fromTo(
        cards,
        { opacity: 0, y: 30, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: 'back.out(1.4)',
          delay: 1.6,
          onStart: () => setVisible(true),
        }
      )
    })
  }, [])

  return (
    <div
      ref={ref}
      className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 w-full max-w-3xl mx-auto"
    >
      {stats.map((stat, i) => (
        <div
          key={i}
          className="stat-card relative overflow-hidden rounded-sm px-4 py-4 text-center"
          style={{
            opacity: 0,
            background: 'rgba(0,15,30,0.7)',
            border: `1px solid ${stat.color}44`,
            backdropFilter: 'blur(8px)',
          }}
        >
          {/* Glow top bar */}
          <div
            className="absolute top-0 left-0 right-0 h-px"
            style={{ background: `linear-gradient(90deg, transparent, ${stat.color}, transparent)` }}
          />

          {/* Value */}
          <div
            className="font-orbitron font-bold text-2xl md:text-3xl mb-1"
            style={{
              fontFamily: "'Orbitron', sans-serif",
              color: stat.color,
              textShadow: `0 0 15px ${stat.color}88`,
            }}
          >
            {visible ? <CountUp target={stat.value} suffix={stat.suffix} /> : `0${stat.suffix}`}
          </div>

          {/* Label */}
          <div
            className="font-rajdhani text-xs tracking-widest uppercase"
            style={{ fontFamily: "'Rajdhani', sans-serif", color: '#7b8fa0' }}
          >
            {stat.label}
          </div>

          {/* Corner accent */}
          <div className="absolute bottom-0 right-0 w-4 h-4"
            style={{ borderTop: `1px solid ${stat.color}44`, borderLeft: `1px solid ${stat.color}44` }} />
        </div>
      ))}
    </div>
  )
}
