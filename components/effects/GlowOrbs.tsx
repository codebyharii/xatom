export function GlowOrbs() {
  return (
    <>
      {/* Purple Orb Top-Right */}
      <div
        className="fixed -top-40 -right-40 w-96 h-96 rounded-full pointer-events-none z-0"
        style={{
          background: 'radial-gradient(circle, rgba(23, 77, 56, 0.16) 0%, transparent 70%)',
          filter: 'blur(120px)',
          opacity: 0.15,
        }}
      />

      {/* Cyan Orb Bottom-Left */}
      <div
        className="fixed -bottom-40 -left-40 w-96 h-96 rounded-full pointer-events-none z-0"
        style={{
          background: 'radial-gradient(circle, rgba(143, 74, 72, 0.16) 0%, transparent 70%)',
          filter: 'blur(120px)',
          opacity: 0.12,
        }}
      />

      {/* Small Purple Orb Center */}
      <div
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full pointer-events-none z-0"
        style={{
          background: 'radial-gradient(circle, rgba(231, 159, 156, 0.16) 0%, transparent 70%)',
          filter: 'blur(120px)',
          opacity: 0.12,
        }}
      />
    </>
  )
}
