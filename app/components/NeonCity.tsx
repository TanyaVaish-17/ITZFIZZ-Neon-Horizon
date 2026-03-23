'use client'
import { useEffect, useRef } from 'react'

interface NeonCityProps {
  scrollProgress: number
}

export default function NeonCity({ scrollProgress }: NeonCityProps) {
  const svgRef = useRef<SVGSVGElement>(null)

  const lerp = (a: number, b: number, t: number) => a + (b - a) * t
  const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v))

  const stage1 = clamp(scrollProgress / 0.35, 0, 1)  
  const stage2 = clamp((scrollProgress - 0.35) / 0.4, 0, 1) 
  const stage3 = clamp((scrollProgress - 0.75) / 0.25, 0, 1) 

  const cityScale = lerp(lerp(1, 1.6, stage1), 2.8, stage2)

  const splitLeft  = lerp(0, -320, stage2)
  const splitRight = lerp(0, 320, stage2)

  const rayOpacity = lerp(0.3, 1, stage1) * lerp(1, 0.2, stage3)

  const cityOpacity = lerp(0.6, 1, stage1) * lerp(1, 0.6, stage3)

  const fogRadius = lerp(120, 280, stage1)
  const fogOpacity = lerp(0.25, 0.55, stage1) * lerp(1, 0.3, stage3)

  const cityY = lerp(0, -80, stage2)

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 900 600"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      style={{ opacity: cityOpacity }}
    >
      <defs>
        <filter id="glow-cyan" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <filter id="glow-strong" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="10" result="blur" />
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <filter id="glow-pink" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>

        <radialGradient id="fog" cx="50%" cy="85%" r="50%">
          <stop offset="0%" stopColor="#00f5ff" stopOpacity={fogOpacity} />
          <stop offset="100%" stopColor="#00f5ff" stopOpacity="0" />
        </radialGradient>

        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#020408" />
          <stop offset="60%" stopColor="#050d1a" />
          <stop offset="100%" stopColor="#0a1628" />
        </linearGradient>

        <linearGradient id="bldg-cyan" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#00f5ff" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#003344" stopOpacity="0.8" />
        </linearGradient>
        <linearGradient id="bldg-pink" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ff006e" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#330015" stopOpacity="0.8" />
        </linearGradient>
        <linearGradient id="bldg-purple" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7b2fff" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#1a0044" stopOpacity="0.8" />
        </linearGradient>
        <linearGradient id="road" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#00f5ff" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#00f5ff" stopOpacity="0" />
        </linearGradient>
      </defs>

      <rect width="900" height="600" fill="url(#sky)" />

      {[...Array(60)].map((_, i) => {
        const x = (i * 137.5) % 900
        const y = (i * 97.3) % 380
        const r = i % 4 === 0 ? 1.5 : 0.8
        const opacity = 0.3 + (i % 5) * 0.14
        return (
          <circle
            key={i}
            cx={x} cy={y} r={r}
            fill="white"
            opacity={opacity * lerp(1, 0.4, stage2)}
          />
        )
      })}

      <g transform={`translate(450, ${300 + cityY}) scale(${cityScale}) translate(-450, -300)`}>

        <g transform={`translate(${splitLeft}, 0)`}>

          <rect x="30"  y="160" width="55" height="280" fill="#0a1628" stroke="#00f5ff" strokeWidth="0.5" strokeOpacity="0.3" />
          <rect x="95"  y="200" width="40" height="240" fill="#0a1628" stroke="#00f5ff" strokeWidth="0.5" strokeOpacity="0.3" />
          <rect x="145" y="140" width="65" height="300" fill="#050d1a" stroke="#7b2fff" strokeWidth="0.5" strokeOpacity="0.4" />

          <rect x="20"  y="200" width="70" height="250" fill="none" stroke="#00f5ff" strokeWidth="1" opacity="0.7" filter="url(#glow-cyan)" />
          <rect x="100" y="180" width="50" height="270" fill="none" stroke="#ff006e" strokeWidth="1" opacity="0.6" filter="url(#glow-pink)" />
          <rect x="155" y="160" width="80" height="280" fill="none" stroke="#7b2fff" strokeWidth="1.5" opacity="0.8" filter="url(#glow-cyan)" />

          <rect x="50" y="100" width="90" height="350" fill="#04111f" stroke="#00f5ff" strokeWidth="2" filter="url(#glow-cyan)" />
          {[...Array(8)].map((_, row) =>
            [...Array(4)].map((_, col) => (
              <rect
                key={`lw-${row}-${col}`}
                x={58 + col * 20} y={115 + row * 30}
                width="12" height="18"
                fill={(row + col) % 3 === 0 ? '#00f5ff' : (row + col) % 3 === 1 ? '#7b2fff' : '#050d1a'}
                opacity={(row + col) % 3 === 2 ? 0.1 : 0.7}
              />
            ))
          )}
          <line x1="95" y1="100" x2="95" y2="60" stroke="#00f5ff" strokeWidth="2" filter="url(#glow-cyan)" />
          <circle cx="95" cy="58" r="4" fill="#00f5ff" filter="url(#glow-strong)" />

          <line x1="155" y1="160" x2="155" y2="440" stroke="#7b2fff" strokeWidth="3" opacity="0.5" filter="url(#glow-cyan)" />
          <line x1="235" y1="160" x2="235" y2="440" stroke="#7b2fff" strokeWidth="3" opacity="0.5" filter="url(#glow-cyan)" />
          {[180, 210, 240, 270, 300, 330, 360].map(y => (
            <line key={y} x1="155" y1={y} x2="235" y2={y} stroke="#7b2fff" strokeWidth="0.5" opacity="0.4" />
          ))}
        </g>

        <g transform={`translate(${splitRight}, 0)`}>

          <rect x="740" y="170" width="60" height="270" fill="#0a1628" stroke="#00f5ff" strokeWidth="0.5" strokeOpacity="0.3" />
          <rect x="790" y="190" width="50" height="250" fill="#050d1a" stroke="#ff006e" strokeWidth="0.5" strokeOpacity="0.3" />
          <rect x="695" y="150" width="55" height="290" fill="#0a1628" stroke="#7b2fff" strokeWidth="0.5" strokeOpacity="0.4" />

          <rect x="750" y="195" width="65" height="255" fill="none" stroke="#00f5ff" strokeWidth="1" opacity="0.7" filter="url(#glow-cyan)" />
          <rect x="695" y="170" width="55" height="280" fill="none" stroke="#ff006e" strokeWidth="1" opacity="0.6" filter="url(#glow-pink)" />

          <rect x="760" y="90" width="90" height="360" fill="#04111f" stroke="#ff006e" strokeWidth="2" filter="url(#glow-pink)" />
          {[...Array(9)].map((_, row) =>
            [...Array(4)].map((_, col) => (
              <rect
                key={`rw-${row}-${col}`}
                x={768 + col * 20} y={105 + row * 30}
                width="12" height="18"
                fill={(row + col) % 3 === 0 ? '#ff006e' : (row + col) % 3 === 1 ? '#00f5ff' : '#050d1a'}
                opacity={(row + col) % 3 === 2 ? 0.1 : 0.7}
              />
            ))
          )}
          <line x1="805" y1="90" x2="805" y2="50" stroke="#ff006e" strokeWidth="2" filter="url(#glow-pink)" />
          <circle cx="805" cy="48" r="4" fill="#ff006e" filter="url(#glow-strong)" />

          <line x1="660" y1="150" x2="760" y2="440" stroke="#00f5ff" strokeWidth="1" opacity="0.25" />
          <line x1="660" y1="200" x2="760" y2="440" stroke="#00f5ff" strokeWidth="1" opacity="0.15" />
        </g>

        <line x1="450" y1="600" x2="150" y2="440" stroke="#00f5ff" strokeWidth="1.5" opacity={0.3 + stage2 * 0.5} />
        <line x1="450" y1="600" x2="750" y2="440" stroke="#00f5ff" strokeWidth="1.5" opacity={0.3 + stage2 * 0.5} />
        <line x1="450" y1="600" x2="280" y2="440" stroke="#00f5ff" strokeWidth="0.5" opacity={0.15 + stage2 * 0.3} />
        <line x1="450" y1="600" x2="620" y2="440" stroke="#00f5ff" strokeWidth="0.5" opacity={0.15 + stage2 * 0.3} />

        <polygon points="350,600 550,600 530,440 370,440" fill="url(#road)" opacity={0.3 + stage1 * 0.3} />

        <radialGradient id="vp" cx="50%" cy="73%" r="20%">
          <stop offset="0%" stopColor="#00f5ff" stopOpacity={0.5 + stage2 * 0.4} />
          <stop offset="100%" stopColor="#00f5ff" stopOpacity="0" />
        </radialGradient>
        <ellipse cx="450" cy="440" rx="120" ry="50" fill="url(#vp)" />

        <rect x="408" y="200" width="84" height="240" fill="#030a14" stroke="#00f5ff" strokeWidth="2.5" filter="url(#glow-strong)" />
        {[...Array(6)].map((_, row) =>
          [...Array(3)].map((_, col) => (
            <rect
              key={`cw-${row}-${col}`}
              x={416 + col * 26} y={215 + row * 30}
              width="16" height="20"
              fill={row % 2 === 0 ? '#00f5ff' : '#ff006e'}
              opacity={0.8}
              filter="url(#glow-cyan)"
            />
          ))
        )}
        <polygon points="450,120 460,200 440,200" fill="#00f5ff" filter="url(#glow-strong)" opacity="0.9" />
        <line x1="450" y1="120" x2="450" y2="60" stroke="#00f5ff" strokeWidth="3" filter="url(#glow-strong)" />
        <circle cx="450" cy="58" r="6" fill="#00f5ff" filter="url(#glow-strong)" />
        <circle cx="450" cy="58" r="10" fill="#00f5ff" opacity={0.3 + Math.sin(Date.now() / 500) * 0.2} filter="url(#glow-strong)" />
      </g>

      {[
        { x: 200, angle: -15, color: '#00f5ff', w: 60 },
        { x: 350, angle: -5,  color: '#7b2fff', w: 40 },
        { x: 450, angle: 0,   color: '#00f5ff', w: 80 },
        { x: 560, angle: 5,   color: '#7b2fff', w: 40 },
        { x: 700, angle: 12,  color: '#ff006e', w: 55 },
      ].map((ray, i) => (
        <g key={i} transform={`rotate(${ray.angle}, ${ray.x}, 0)`}>
          <linearGradient id={`ray-${i}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={ray.color} stopOpacity={rayOpacity * 0.6} />
            <stop offset="100%" stopColor={ray.color} stopOpacity="0" />
          </linearGradient>
          <polygon
            points={`${ray.x - ray.w / 2},0 ${ray.x + ray.w / 2},0 ${ray.x + ray.w * 1.5},600 ${ray.x - ray.w * 1.5},600`}
            fill={`url(#ray-${i})`}
          />
        </g>
      ))}

      <ellipse cx="450" cy="520" rx={fogRadius * 2} ry={fogRadius * 0.5} fill="url(#fog)" />

      {[100, 200, 300, 400].map(y => (
        <line key={y} x1="0" y1={y} x2="900" y2={y}
          stroke="#00f5ff" strokeWidth="0.3" opacity={0.06 + stage2 * 0.08} strokeDasharray="4 8" />
      ))}

      {[
        { x: 20, y: 20, r: 0 },
        { x: 880, y: 20, r: 90 },
        { x: 20, y: 580, r: 270 },
        { x: 880, y: 580, r: 180 },
      ].map((corner, i) => (
        <g key={i} transform={`rotate(${corner.r}, ${corner.x}, ${corner.y})`}>
          <line x1={corner.x} y1={corner.y} x2={corner.x + 30} y2={corner.y} stroke="#00f5ff" strokeWidth="1.5" opacity="0.5" />
          <line x1={corner.x} y1={corner.y} x2={corner.x} y2={corner.y + 30} stroke="#00f5ff" strokeWidth="1.5" opacity="0.5" />
        </g>
      ))}
    </svg>
  )
}
