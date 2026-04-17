import { getPayload } from 'payload'
import configPromise from '@payload-config'
import Image from 'next/image'
import { Mail, ArrowDown } from 'lucide-react'
import type { Hero as HeroType, Media } from '@/payload-types'

// GitHub brand icons — theme-aware (not available in lucide-react)
const GithubIcon = ({ size = 20 }: { size?: number }) => (
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
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
)

const LinkedinIcon = ({ size = 20 }: { size?: number }) => (
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

// ─── Sub-components ────────────────────────────────────────────────────────────

function AvailableBadge() {
  return (
    <div
      className="flex items-center gap-2 font-mono text-[11px]"
      style={{ color: 'var(--text-muted)' }}
    >
      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--accent)' }} />
      Available for work
    </div>
  )
}

function SocialLinks({ github, linkedin, email }: Pick<HeroType, 'github' | 'linkedin' | 'email'>) {
  if (!github && !linkedin && !email) return null

  return (
    <div className="pt-4 space-y-4">
      <div className="flex gap-6">
        {github && (
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
            aria-label="GitHub profile"
          >
            <GithubIcon size={20} />
          </a>
        )}
        {linkedin && (
          <a
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
            aria-label="LinkedIn profile"
          >
            <LinkedinIcon size={20} />
          </a>
        )}
        {email && (
          <a href={`mailto:${email}`} className="social-link" aria-label="Send email">
            <Mail size={20} />
          </a>
        )}
      </div>
      <div className="w-full h-px" style={{ backgroundColor: 'var(--border)' }} />
    </div>
  )
}

function HeroContent({ data }: { data: HeroType }) {
  return (
    <div className="space-y-8">
      {data.availableForWork && <AvailableBadge />}

      {/* Name */}
      <div className="space-y-2 animate-fade-in">
        <h1
          className="text-[72px] md:text-[80px] leading-[0.95] font-serif"
          style={{ color: 'var(--text-primary)' }}
        >
          {data.firstName}
        </h1>
        <h1
          className="text-[72px] md:text-[80px] leading-[0.95] font-serif"
          style={{ color: 'var(--text-primary)' }}
        >
          {data.lastName}
        </h1>
      </div>

      {/* Role */}
      <p className="text-[20px] animate-fade-in-delay-1" style={{ color: 'var(--text-secondary)' }}>
        {data.role}
      </p>

      {/* Bio */}
      <p
        className="text-[16px] leading-[1.7] max-w-[520px] animate-fade-in-delay-2"
        style={{ color: 'var(--text-secondary)' }}
      >
        {data.bio}
      </p>

      {/* CTAs */}
      <div className="flex flex-wrap gap-6 animate-fade-in-delay-3">
        {data.ctaLabel && data.ctaTarget && (
          <a
            href={data.ctaTarget}
            className="group inline-flex items-center gap-2 transition-colors"
            style={{ color: 'var(--accent)' }}
          >
            {data.ctaLabel}
            <ArrowDown size={16} className="group-hover:translate-y-1 transition-transform" />
          </a>
        )}
        {data.cvUrl && (
          <a
            href={data.cvUrl}
            className="underline transition-colors hover:opacity-70"
            style={{ color: 'var(--text-secondary)' }}
          >
            Download CV
          </a>
        )}
      </div>

      <SocialLinks github={data.github} linkedin={data.linkedin} email={data.email} />
    </div>
  )
}

function ProfilePhoto({ photo, name }: { photo: HeroType['photo']; name: string }) {
  if (!photo || typeof photo === 'number') return null

  const media = photo as Media
  if (!media.url) return null

  return (
    <div className="hidden md:block">
      <Image
        src={media.url}
        alt={media.alt ?? name}
        width={media.width ?? 400}
        height={media.height ?? 400}
        className="w-full aspect-square object-cover rounded-lg grayscale-30"
        style={{ border: '1px solid var(--border)' }}
        priority
        unoptimized
      />
    </div>
  )
}

// ─── Main Component ────────────────────────────────────────────────────────────

export async function Hero() {
  const payload = await getPayload({ config: configPromise })

  const data = await payload.findGlobal({
    slug: 'hero',
    depth: 1, // populate photo relationship
  })

  const isCentered = data.layout === 'centered'

  return (
    <section
      className="min-h-screen flex items-center relative overflow-hidden"
      style={{ backgroundColor: 'var(--bg-base)' }}
    >
      <div className="w-full mx-auto max-w-[760px] px-6 md:px-20 lg:px-20 py-20 relative z-10">
        {isCentered ? (
          /* ── Centered Layout ── */
          <div className="flex flex-col items-center text-center max-w-[600px] mx-auto space-y-8">
            {data.availableForWork && <AvailableBadge />}

            <div className="space-y-2 animate-fade-in">
              <h1
                className="text-[72px] md:text-[80px] leading-[0.95] font-serif"
                style={{ color: 'var(--text-primary)' }}
              >
                {data.firstName}
              </h1>
              <h1
                className="text-[72px] md:text-[80px] leading-[0.95] font-serif"
                style={{ color: 'var(--text-primary)' }}
              >
                {data.lastName}
              </h1>
            </div>

            <p
              className="text-[20px] animate-fade-in-delay-1"
              style={{ color: 'var(--text-secondary)' }}
            >
              {data.role}
            </p>
            <p
              className="text-[16px] leading-[1.7] animate-fade-in-delay-2"
              style={{ color: 'var(--text-secondary)' }}
            >
              {data.bio}
            </p>

            <div className="flex flex-wrap justify-center gap-6 animate-fade-in-delay-3">
              {data.ctaLabel && data.ctaTarget && (
                <a
                  href={data.ctaTarget}
                  className="group inline-flex items-center gap-2 transition-colors"
                  style={{ color: 'var(--accent)' }}
                >
                  {data.ctaLabel}
                  <ArrowDown size={16} className="group-hover:translate-y-1 transition-transform" />
                </a>
              )}
              {data.cvUrl && (
                <a
                  href={data.cvUrl}
                  className="underline hover:opacity-70 transition-opacity"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  Download CV
                </a>
              )}
            </div>

            <SocialLinks github={data.github} linkedin={data.linkedin} email={data.email} />
          </div>
        ) : (
          /* ── Photo Right Layout (default) ── */
          <div className="grid md:grid-cols-[1fr_220px] gap-12 items-start">
            <HeroContent data={data} />
            <ProfilePhoto photo={data.photo} name={`${data.firstName} ${data.lastName}`} />
          </div>
        )}
      </div>
    </section>
  )
}
