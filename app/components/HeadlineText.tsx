'use client'
import { useEffect, useRef } from 'react'

export default function HeadlineText() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Dynamically import GSAP to avoid SSR issues
    import('gsap').then(({ gsap }) => {
      const letters = containerRef.current?.querySelectorAll('.letter')
      if (!letters) return

      gsap.fromTo(
        letters,
        { opacity: 0, y: 40, filter: 'blur(8px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.7,
          stagger: 0.06,
          ease: 'power3.out',
          delay: 0.3,
        }
      )
    })
  }, [])

  const brand = 'ITZFIZZ'

  return (
    <div ref={containerRef} className="text-center relative z-10">
      {/* Eyebrow label */}
      <div
        className="font-rajdhani text-xs tracking-[0.4em] text-cyan-400 mb-4 opacity-0 uppercase"
        style={{
          animation: 'fadeSlideUp 0.6s ease forwards 0.1s',
          fontFamily: "'Rajdhani', sans-serif",
        }}
      >
        ◈ Welcome to the future ◈
      </div>

      {/* Main headline — letter by letter */}
      <h1 className="flex items-center justify-center gap-[0.15em] mb-2">
        {brand.split('').map((char, i) => (
          <span
            key={i}
            className="letter inline-block font-orbitron font-black select-none"
            style={{
              fontFamily: "'Orbitron', sans-serif",
              fontSize: 'clamp(3rem, 10vw, 7rem)',
              color: i < 3 ? '#00f5ff' : '#ffffff',
              textShadow:
                i < 3
                  ? '0 0 10px #00f5ff, 0 0 30px #00f5ff88, 0 0 60px #00f5ff44'
                  : '0 0 10px #ffffff44',
              opacity: 0,
              letterSpacing: '0.05em',
            }}
          >
            {char}
          </span>
        ))}
      </h1>

      {/* Subtitle */}
      <p
        className="font-rajdhani text-lg tracking-[0.3em] uppercase opacity-0"
        style={{
          fontFamily: "'Rajdhani', sans-serif",
          color: '#7b8fa0',
          animation: 'fadeSlideUp 0.8s ease forwards 1.2s',
          letterSpacing: '0.35em',
        }}
      >
        The Future Is Now
      </p>

      {/* Decorative line */}
      <div
        className="mx-auto mt-5 opacity-0"
        style={{
          width: '200px',
          height: '1px',
          background: 'linear-gradient(90deg, transparent, #00f5ff, transparent)',
          animation: 'fadeIn 1s ease forwards 1.5s',
        }}
      />

      <style jsx>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
      `}</style>
    </div>
  )
}
