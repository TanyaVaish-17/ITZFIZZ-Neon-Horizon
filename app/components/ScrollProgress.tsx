'use client'

interface Props {
  progress: number
}

export default function ScrollProgress({ progress }: Props) {
  return (
    <>
      <div className="fixed left-5 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-2">
        <span
          className="font-orbitron text-[9px] tracking-widest rotate-180 mb-2"
          style={{ fontFamily: "'Orbitron', sans-serif", color: '#00f5ff88', writingMode: 'vertical-rl' }}
        >
          SCROLL
        </span>
        <div className="w-px h-32 bg-white/10 relative overflow-hidden rounded-full">
          <div
            className="absolute top-0 left-0 w-full transition-none"
            style={{
              height: `${progress * 100}%`,
              background: 'linear-gradient(180deg, #00f5ff, #7b2fff)',
              boxShadow: '0 0 6px #00f5ff',
            }}
          />
        </div>
        <span
          className="font-orbitron text-[9px] mt-2"
          style={{ fontFamily: "'Orbitron', sans-serif", color: '#00f5ff88' }}
        >
          {Math.round(progress * 100).toString().padStart(2, '0')}
        </span>
      </div>

      <div className="fixed top-0 left-0 right-0 h-px z-50">
        <div
          className="h-full"
          style={{
            width: `${progress * 100}%`,
            background: 'linear-gradient(90deg, #7b2fff, #00f5ff)',
            boxShadow: '0 0 8px #00f5ff',
            transition: 'width 0.05s linear',
          }}
        />
      </div>
    </>
  )
}
