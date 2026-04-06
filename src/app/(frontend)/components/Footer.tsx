import Image from 'next/image'
import { Mail } from 'lucide-react'
import { TerminalTrigger } from './TerminalTrigger'

// GitHub brand assets from Cloudflare R2 (theme-aware)
const GITHUB_ICON_LIGHT =
  'https://portfolio.ibnukhaidar.my.id/portfolio-ibnu/GitHub_Invertocat_Black.svg'
const GITHUB_ICON_DARK =
  'https://portfolio.ibnukhaidar.my.id/portfolio-ibnu/GitHub_Invertocat_White.svg'

// LinkedIn inline SVG (no brand asset provided)
const LinkedinIcon = ({ size = 24 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
)

export function Footer() {
  return (
    <section
      id="contact"
      className="py-20 md:py-32"
      style={{ backgroundColor: 'var(--bg-base)' }}
    >
      <div className="mx-auto max-w-[760px] px-6 md:px-20 lg:px-20">
        {/* Contact Section */}
        <div className="text-center mb-16">
          {/* Label */}
          <div
            className="font-mono text-[11px] uppercase tracking-[0.12em] mb-6"
            style={{ color: 'var(--text-muted)' }}
          >
            GET IN TOUCH
          </div>

          {/* Heading */}
          <h2
            className="text-[36px] md:text-[40px] font-serif italic mb-4"
            style={{ color: 'var(--text-primary)' }}
          >
            Have a project in mind?
          </h2>

          {/* Subtitle */}
          <p className="text-[16px] mb-8" style={{ color: 'var(--text-secondary)' }}>
            My inbox is always open. Feel free to reach out.
          </p>

          {/* Email */}
          <a
            href="mailto:alex@example.com"
            className="inline-block text-[18px] md:text-[20px] mb-8 transition-opacity hover:opacity-70"
            style={{ color: 'var(--accent)' }}
          >
            alex@example.com
          </a>

          {/* Social Icons */}
          <div className="flex justify-center gap-6 mb-8">
            {/* GitHub — theme-aware image: black in light mode, white in dark mode */}
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link flex items-center"
              aria-label="GitHub profile"
            >
              {/* Light mode logo */}
              <Image
                src={GITHUB_ICON_LIGHT}
                alt="GitHub"
                width={24}
                height={24}
                className="block dark:hidden"
                unoptimized
              />
              {/* Dark mode logo */}
              <Image
                src={GITHUB_ICON_DARK}
                alt="GitHub"
                width={24}
                height={24}
                className="hidden dark:block"
                unoptimized
              />
            </a>

            {/* LinkedIn */}
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              aria-label="LinkedIn profile"
            >
              <LinkedinIcon size={24} />
            </a>

            {/* Email */}
            <a
              href="mailto:alex@example.com"
              className="social-link"
              aria-label="Send email"
            >
              <Mail size={24} />
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px mb-8" style={{ backgroundColor: 'var(--border)' }} />

        {/* Footer bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p
            className="font-mono text-[11px] md:text-[12px] text-center md:text-left"
            style={{ color: 'var(--text-muted)' }}
          >
            Designed &amp; built by Alex Chen · 2026
          </p>

          {/* Terminal trigger — client island */}
          <TerminalTrigger />
        </div>
      </div>
    </section>
  )
}
