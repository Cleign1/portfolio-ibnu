'use client'

import { useEffect, useState, useRef } from 'react'

export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [resizeDir, setResizeDir] = useState<string | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const rafRef = useRef<number>(undefined)
  const isHoveringRef = useRef(false)
  const resizeDirRef = useRef<string | null>(null)

  useEffect(() => {
    // Only show custom cursor on desktop (pointer: fine)
    const mediaQuery = window.matchMedia('(pointer: fine)')
    setIsVisible(mediaQuery.matches)

    if (!mediaQuery.matches) return

    let targetX = 0
    let targetY = 0
    let currentX = 0
    let currentY = 0

    const handleMove = (e: MouseEvent) => {
      targetX = e.clientX
      targetY = e.clientY

      // Detect interactive elements on every move — most reliable approach
      const el = e.target as HTMLElement
      const interactive = !!el.closest('a, button, [role="button"]')

      // Detect resize handles
      const resizeEl = el.closest('[data-resize]') as HTMLElement | null
      const dir = resizeEl?.dataset.resize ?? null

      // Only call setState when the value actually changes to avoid churn
      if (interactive !== isHoveringRef.current) {
        isHoveringRef.current = interactive
        setIsHovering(interactive)
      }

      if (dir !== resizeDirRef.current) {
        resizeDirRef.current = dir
        setResizeDir(dir)
      }
    }

    const animate = () => {
      currentX += (targetX - currentX) * 0.15
      currentY += (targetY - currentY) * 0.15

      setPosition({ x: currentX, y: currentY })
      rafRef.current = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', handleMove, { passive: true })
    rafRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', handleMove)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  if (!isVisible) return null

  return (
    <div
      className="fixed top-0 left-0 pointer-events-none z-[10000]"
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        willChange: 'transform',
      }}
    >
      {resizeDir ? (
        /* Resize handle cursor — crosshair with directional arrows */
        <div
          style={{
            transform: 'translate(-50%, -50%)',
            width: '20px',
            height: '20px',
            position: 'relative',
          }}
        >
          {/* Horizontal bar */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '0',
              right: '0',
              height: '1.5px',
              backgroundColor: 'var(--accent)',
              transform: 'translateY(-50%)',
              opacity: resizeDir === 'n' || resizeDir === 's' ? 0 : 1,
            }}
          />
          {/* Vertical bar */}
          <div
            style={{
              position: 'absolute',
              left: '50%',
              top: '0',
              bottom: '0',
              width: '1.5px',
              backgroundColor: 'var(--accent)',
              transform: 'translateX(-50%)',
              opacity: resizeDir === 'e' || resizeDir === 'w' ? 0 : 1,
            }}
          />
          {/* Outer ring */}
          <div
            style={{
              position: 'absolute',
              inset: '0',
              borderRadius: '50%',
              border: '1.5px solid var(--accent)',
              opacity: 0.5,
            }}
          />
        </div>
      ) : (
        <div
          className="rounded-full transition-all duration-150"
          style={{
            width: isHovering ? '32px' : '10px',
            height: isHovering ? '32px' : '10px',
            border: `${isHovering ? '1px' : '1.5px'} solid var(--accent)`,
            backgroundColor: isHovering ? 'var(--accent-subtle)' : 'transparent',
            transform: 'translate(-50%, -50%)',
          }}
        />
      )}
    </div>
  )
}