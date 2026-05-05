export function GlowOrbs() {
  return (
    <>
      {/* Purple Orb Top-Right */}
      <div
        className="fixed -top-40 -right-40 w-96 h-96 rounded-full pointer-events-none z-0"
        style={{
          background: 'radial-gradient(circle, rgba(123, 94, 255, 0.18) 0%, transparent 70%)',
          filter: 'blur(120px)',
          opacity: 0.15,
        }}
      />

      {/* Cyan Orb Bottom-Left */}
      <div
        className="fixed -bottom-40 -left-40 w-96 h-96 rounded-full pointer-events-none z-0"
        style={{
          background: 'radial-gradient(circle, rgba(0, 212, 255, 0.18) 0%, transparent 70%)',
          filter: 'blur(120px)',
          opacity: 0.12,
        }}
      />

      {/* Small Purple Orb Center */}
      <div
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full pointer-events-none z-0"
        style={{
          background: 'radial-gradient(circle, rgba(123, 94, 255, 0.15) 0%, transparent 70%)',
          filter: 'blur(120px)',
          opacity: 0.12,
        }}
      />
    </>
  )
}
