'use client'
import { useEffect, useRef, useState } from 'react'
import NeonCity from './NeonCity'
import HeadlineText from './HeadlineText'
import StatsRow from './StatsRow'
import ScrollProgress from './ScrollProgress'

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    let rafId: number
    let lastY = window.scrollY

    const update = () => {
      const scrollY = window.scrollY
      if (Math.abs(scrollY - lastY) < 0.5) {
        rafId = requestAnimationFrame(update)
        return
      }
      lastY = scrollY

      const section = sectionRef.current
      if (!section) return
      // Total scrollable distance = document height - viewport
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      const progress = maxScroll > 0 ? Math.min(scrollY / maxScroll, 1) : 0
      setScrollProgress(progress)
      rafId = requestAnimationFrame(update)
    }

    rafId = requestAnimationFrame(update)
    return () => cancelAnimationFrame(rafId)
  }, [])

  // Parallax text: headline slides up as you scroll
  const headlineY = scrollProgress * -60
  const headlineOpacity = 1 - scrollProgress * 1.8
  const statsY = scrollProgress * -30
  const statsOpacity = 1 - scrollProgress * 2

  return (
    <>
      <ScrollProgress progress={scrollProgress} />

      {/* Scroll container — tall enough for scroll-based animation */}
      <div ref={sectionRef} style={{ height: '400vh', position: 'relative' }}>

        {/* Sticky viewport */}
        <div
          className="sticky top-0 w-full h-screen overflow-hidden scanlines"
          style={{ background: 'var(--bg-deep)' }}
        >
          {/* Ambient background glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `
                radial-gradient(ellipse 80% 50% at 50% 100%, rgba(0,245,255,0.07) 0%, transparent 70%),
                radial-gradient(ellipse 40% 40% at 20% 50%, rgba(123,47,255,0.05) 0%, transparent 60%),
                radial-gradient(ellipse 40% 40% at 80% 50%, rgba(255,0,110,0.05) 0%, transparent 60%)
              `
            }}
          />

          {/* City visual — fills lower portion */}
          <div
            className="absolute inset-0 w-full h-full"
            style={{ transform: 'translateZ(0)' }}
          >
            <NeonCity scrollProgress={scrollProgress} />
          </div>

          {/* Top nav bar */}
          <nav
            className="absolute top-0 left-0 right-0 flex justify-between items-center px-8 py-5 z-20"
            style={{ opacity: Math.max(0, 1 - scrollProgress * 3) }}
          >
            <div
              className="font-orbitron text-sm tracking-widest"
              style={{ fontFamily: "'Orbitron', sans-serif", color: '#00f5ff' }}
            >
              ITZ<span style={{ color: 'white' }}>FIZZ</span>
            </div>
            <div className="hidden md:flex gap-8 font-rajdhani text-sm tracking-widest text-white/40 uppercase"
              style={{ fontFamily: "'Rajdhani', sans-serif" }}>
              <span className="hover:text-cyan-400 cursor-pointer transition-colors">Vision</span>
              <span className="hover:text-cyan-400 cursor-pointer transition-colors">Tech</span>
              <span className="hover:text-cyan-400 cursor-pointer transition-colors">Contact</span>
            </div>
            <div
              className="font-orbitron text-xs px-4 py-2 border border-cyan-400/40 rounded-sm hover:border-cyan-400 transition-colors cursor-pointer"
              style={{ fontFamily: "'Orbitron', sans-serif", color: '#00f5ff', letterSpacing: '0.15em' }}
            >
              ENTER
            </div>
          </nav>

          {/* Center content overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-6 gap-8">

            {/* Headline */}
            <div
              style={{
                transform: `translateY(${headlineY}px)`,
                opacity: Math.max(0, headlineOpacity),
                willChange: 'transform, opacity',
              }}
            >
              <HeadlineText />
            </div>

            {/* Stats */}
            <div
              style={{
                transform: `translateY(${statsY}px)`,
                opacity: Math.max(0, statsOpacity),
                willChange: 'transform, opacity',
                width: '100%',
              }}
            >
              <StatsRow />
            </div>

            {/* Scroll hint */}
            <div
              className="absolute bottom-10 flex flex-col items-center gap-2"
              style={{ opacity: Math.max(0, 1 - scrollProgress * 6) }}
            >
              <span
                className="font-rajdhani text-xs tracking-widest uppercase"
                style={{ fontFamily: "'Rajdhani', sans-serif", color: '#7b8fa0' }}
              >
                Scroll to explore
              </span>
              <div
                className="w-px h-8 animate-bounce"
                style={{ background: 'linear-gradient(180deg, #00f5ff, transparent)' }}
              />
            </div>
          </div>

          {/* Stage 2 message: flying through city */}
          <div
            className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none"
            style={{
              opacity: scrollProgress > 0.45
                ? Math.min(1, (scrollProgress - 0.45) * 4) * Math.max(0, 1 - (scrollProgress - 0.8) * 5)
                : 0,
            }}
          >
            <div className="text-center">
              <p
                className="font-orbitron text-lg md:text-2xl tracking-[0.4em] uppercase"
                style={{
                  fontFamily: "'Orbitron', sans-serif",
                  color: '#00f5ff',
                  textShadow: '0 0 20px #00f5ff, 0 0 60px #00f5ff44',
                  letterSpacing: '0.5em',
                }}
              >
                ENTERING THE HORIZON
              </p>
              <div
                className="mx-auto mt-3"
                style={{
                  width: '160px',
                  height: '1px',
                  background: 'linear-gradient(90deg, transparent, #00f5ff, transparent)',
                }}
              />
            </div>
          </div>

          {/* Stage 3: final message */}
          <div
            className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none"
            style={{
              opacity: scrollProgress > 0.82
                ? Math.min(1, (scrollProgress - 0.82) * 6)
                : 0,
            }}
          >
            <div className="text-center px-8">
              <p
                className="font-orbitron text-2xl md:text-5xl font-black tracking-wider uppercase mb-4"
                style={{
                  fontFamily: "'Orbitron', sans-serif",
                  color: 'white',
                  textShadow: '0 0 30px #00f5ff, 0 0 80px #00f5ff44',
                }}
              >
                THE FUTURE
              </p>
              <p
                className="font-orbitron text-2xl md:text-5xl font-black tracking-wider uppercase"
                style={{
                  fontFamily: "'Orbitron', sans-serif",
                  color: '#00f5ff',
                  textShadow: '0 0 30px #00f5ff, 0 0 80px #00f5ff88',
                }}
              >
                IS NOW
              </p>
              <div
                className="mx-auto mt-6 font-rajdhani text-sm tracking-widest text-white/40 uppercase"
                style={{ fontFamily: "'Rajdhani', sans-serif" }}
              >
                ITZFIZZ ◈ Digital Experience
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
