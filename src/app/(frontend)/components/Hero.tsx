import Image from 'next/image'
import { Mail, ArrowDown } from 'lucide-react'

// Brand icons not available in this lucide-react version
const GithubIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
)

const LinkedinIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
)


export function Hero() {
  return (
    <section
      className="min-h-screen flex items-center relative overflow-hidden"
      style={{ backgroundColor: 'var(--bg-base)' }}
    >
      <div className="w-full mx-auto max-w-[760px] px-6 md:px-20 lg:px-20 py-20 relative z-10">
        <div className="grid md:grid-cols-[1fr_220px] gap-12 items-start">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Available Status */}
            <div
              className="flex items-center gap-2 font-mono text-[11px]"
              style={{ color: 'var(--text-muted)' }}
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: 'var(--accent)' }}
              />
              Available for work
            </div>

            {/* Name */}
            <div className="space-y-2 animate-fade-in">
              <h1
                className="text-[72px] md:text-[80px] leading-[0.95] font-serif"
                style={{ color: 'var(--text-primary)' }}
              >
                Alex
              </h1>
              <h1
                className="text-[72px] md:text-[80px] leading-[0.95] font-serif"
                style={{ color: 'var(--text-primary)' }}
              >
                Chen
              </h1>
            </div>

            {/* Role */}
            <p
              className="text-[20px] animate-fade-in-delay-1"
              style={{ color: 'var(--text-secondary)' }}
            >
              Product Designer &amp; Frontend Developer
            </p>

            {/* Bio */}
            <p
              className="text-[16px] leading-[1.7] max-w-[520px] animate-fade-in-delay-2"
              style={{ color: 'var(--text-secondary)' }}
            >
              I design and build thoughtful digital products that solve real problems.
              Currently crafting user experiences at early-stage startups, with a focus
              on design systems and frontend architecture.
            </p>

            {/* Action Links */}
            <div className="flex flex-wrap gap-6 animate-fade-in-delay-3">
              <a
                href="#projects"
                className="group inline-flex items-center gap-2 transition-colors"
                style={{ color: 'var(--accent)' }}
              >
                View my work
                <ArrowDown
                  size={16}
                  className="group-hover:translate-y-1 transition-transform"
                />
              </a>
              <a
                href="#"
                className="underline transition-colors hover:opacity-70"
                style={{ color: 'var(--text-secondary)' }}
              >
                Download CV
              </a>
            </div>

            {/* Social Links */}
            <div className="pt-4 space-y-4">
              <div className="flex gap-6">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  aria-label="GitHub profile"
                >
                  <GithubIcon size={20} />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  aria-label="LinkedIn profile"
                >
                  <LinkedinIcon size={20} />
                </a>
                <a
                  href="mailto:alex@example.com"
                  className="social-link"
                  aria-label="Send email"
                >
                  <Mail size={20} />
                </a>
              </div>

              <div className="w-full h-px" style={{ backgroundColor: 'var(--border)' }} />
            </div>
          </div>

          {/* Right Photo — desktop/tablet only */}
          <div className="hidden md:block">
            <Image
              src="https://images.unsplash.com/photo-1758600587839-56ba05596c69?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBhc2lhbiUyMHBlcnNvbiUyMHBvcnRyYWl0fGVufDF8fHx8MTc3NTEwNTY2MXww&ixlib=rb-4.1.0&q=80&w=400"
              alt="Alex Chen"
              width={400}
              height={400}
              className="w-full aspect-square object-cover rounded-lg grayscale-[30%]"
              style={{ border: '1px solid var(--border)' }}
              priority
              unoptimized
            />
          </div>
        </div>
      </div>
    </section>
  )
}
