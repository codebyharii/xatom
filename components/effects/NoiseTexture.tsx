export function NoiseTexture() {
  return (
    <svg
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-50"
      style={{
        opacity: 0.035,
        mixBlendMode: 'overlay',
      }}
      width="100%"
      height="100%"
      preserveAspectRatio="none"
    >
      <filter id="noise">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.9"
          numOctaves="4"
          seed="2"
          result="noise"
        />
      </filter>
      <rect width="100%" height="100%" filter="url(#noise)" opacity="0.5" />
    </svg>
  )
}
