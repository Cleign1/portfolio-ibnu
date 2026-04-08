'use client'

import { useEffect, useState, useRef } from 'react'

export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const rafRef = useRef<number>(undefined)
  const isHoveringRef = useRef(false)

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

      // Only call setState when the value actually changes to avoid churn
      if (interactive !== isHoveringRef.current) {
        isHoveringRef.current = interactive
        setIsHovering(interactive)
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
    </div>
  )
}