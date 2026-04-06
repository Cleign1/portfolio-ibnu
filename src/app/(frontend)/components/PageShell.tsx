'use client'

import { useEffect, useState } from 'react'
import { Navigation } from './Navigation'
import { SideNav } from './SideNav'
import { Terminal } from './Terminal'
import { TerminalProvider, useTerminal } from './TerminalContext'

const SECTIONS = ['hero', 'about', 'experience', 'skills', 'projects', 'contact']

/**
 * Inner shell — consumes TerminalContext (must be rendered inside TerminalProvider).
 * Owns scroll tracking, keyboard shortcut, and IntersectionObserver.
 */
function ShellInner({ children }: { children: React.ReactNode }) {
  const [activeSection, setActiveSection] = useState('hero')
  const { isOpen, open, close } = useTerminal()

  // Active section detection via scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3

      if (window.scrollY < 100) {
        setActiveSection('hero')
        return
      }

      for (const sectionId of SECTIONS) {
        if (sectionId === 'hero') continue
        const element = document.getElementById(sectionId)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(sectionId)
            return
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // initial check

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // "/" key opens terminal (desktop only, only when closed)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && !isOpen) {
        e.preventDefault()
        open()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, open])

  // IntersectionObserver — adds .visible class to trigger CSS scroll-in animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15 },
    )

    const sections = document.querySelectorAll('section:not(:first-child)')
    sections.forEach((section) => observer.observe(section))

    return () => observer.disconnect()
  }, [])

  return (
    <div className="relative min-h-screen">
      <Navigation activeSection={activeSection} />
      <SideNav activeSection={activeSection} />

      <main>{children}</main>

      <Terminal isOpen={isOpen} onClose={close} />
    </div>
  )
}

/**
 * PageShell — exported wrapper.
 * Provides TerminalContext to the full tree (including children from Server Components).
 */
export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <TerminalProvider>
      <ShellInner>{children}</ShellInner>
    </TerminalProvider>
  )
}
