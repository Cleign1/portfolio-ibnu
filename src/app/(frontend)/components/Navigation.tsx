'use client'

import { useState, useEffect } from 'react'
import { Sun, Moon, X } from 'lucide-react'

const navLinks = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
]

interface NavigationProps {
  activeSection: string
}

export function Navigation({ activeSection }: NavigationProps) {
  const [isDark, setIsDark] = useState(true)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    document.documentElement.classList.add('dark')
  }, [])

  const toggleTheme = () => {
    setIsDark((prev) => !prev)
    document.documentElement.classList.toggle('dark')
  }

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsMobileMenuOpen(false)
    }
  }

  return (
    <>
      <nav
        className="sticky top-0 z-50 w-full"
        style={{
          backgroundColor: 'var(--bg-base)',
          borderBottom: '1px solid var(--border)',
        }}
      >
        <div className="mx-auto max-w-[760px] px-6 md:px-20 lg:px-20">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="font-sans font-semibold transition-colors"
              style={{ color: 'var(--text-primary)' }}
            >
              I. Khaidar
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="relative text-sm transition-colors"
                  style={{
                    color:
                      activeSection === link.id
                        ? 'var(--accent)'
                        : 'var(--text-secondary)',
                  }}
                >
                  {link.label}
                  {activeSection === link.id && (
                    <span
                      className="absolute -bottom-5 left-0 right-0 h-[2px]"
                      style={{ backgroundColor: 'var(--accent)' }}
                    />
                  )}
                </button>
              ))}

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="ml-2 p-1.5 rounded transition-colors"
                style={{ color: 'var(--text-secondary)' }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = 'var(--accent)')
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = 'var(--text-secondary)')
                }
                aria-label="Toggle theme"
              >
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden font-mono text-[13px]"
              style={{ color: 'var(--text-secondary)' }}
              aria-label="Open menu"
            >
              menu
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 md:hidden"
          style={{ backgroundColor: 'var(--bg-base)' }}
        >
          <div className="flex flex-col h-full">
            {/* Close Button */}
            <div className="flex justify-end p-6">
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                style={{ color: 'var(--text-primary)' }}
                aria-label="Close menu"
              >
                <X size={24} />
              </button>
            </div>

            {/* Menu Links */}
            <div className="flex-1 flex flex-col items-center justify-center gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="text-[32px] font-serif font-medium transition-colors"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* Theme Toggle in Mobile Menu */}
            <div className="flex justify-center pb-12">
              <button
                onClick={toggleTheme}
                className="p-2"
                style={{ color: 'var(--text-secondary)' }}
                aria-label="Toggle theme"
              >
                {isDark ? <Sun size={24} /> : <Moon size={24} />}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}