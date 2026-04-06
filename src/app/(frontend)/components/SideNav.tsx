'use client'

const sections = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
]

interface SideNavProps {
  activeSection: string
}

export function SideNav({ activeSection }: SideNavProps) {
  const scrollToSection = (id: string) => {
    if (id === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      const element = document.getElementById(id)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <div className="hidden md:block fixed right-8 top-1/2 -translate-y-1/2 z-40">
      <div className="flex flex-col gap-4">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => scrollToSection(section.id)}
            className="group relative transition-all duration-200"
            title={section.label}
            aria-label={`Scroll to ${section.label}`}
          >
            {/* Dot */}
            <div
              className="transition-all duration-200"
              style={{
                width: activeSection === section.id ? '20px' : '6px',
                height: '6px',
                borderRadius: activeSection === section.id ? '3px' : '50%',
                backgroundColor:
                  activeSection === section.id ? 'var(--accent)' : 'transparent',
                border:
                  activeSection === section.id ? 'none' : '1px solid var(--border)',
              }}
            />

            {/* Tooltip */}
            <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
              <div
                className="px-3 py-1.5 rounded font-mono text-[11px]"
                style={{
                  backgroundColor: 'var(--bg-surface)',
                  border: '1px solid var(--border)',
                  color: 'var(--text-secondary)',
                }}
              >
                {section.label}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
