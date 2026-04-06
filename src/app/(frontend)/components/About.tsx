import Image from 'next/image'

const openToTags = ['Full-time', 'Remote', 'Startups']

// Reusable bento card wrapper
function BentoCard({
  children,
  colSpan2 = false,
}: {
  children: React.ReactNode
  colSpan2?: boolean
}) {
  return (
    <div
      className={`${colSpan2 ? 'md:col-span-2' : ''} p-6 md:p-8 rounded-xl transition-colors duration-150`}
      style={{
        backgroundColor: 'var(--bg-surface)',
        border: '1px solid var(--border)',
      }}
    >
      {children}
    </div>
  )
}

function CardLabel({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="font-mono text-[11px] uppercase tracking-wider mb-3"
      style={{ color: 'var(--text-muted)' }}
    >
      {children}
    </div>
  )
}

export function About() {
  return (
    <section
      id="about"
      className="py-20 md:py-32"
      style={{ backgroundColor: 'var(--bg-base)' }}
    >
      <div className="mx-auto max-w-[760px] px-6 md:px-20 lg:px-20">
        {/* Section Label */}
        <div
          className="font-mono text-[11px] uppercase tracking-[0.12em] mb-4"
          style={{ color: 'var(--text-muted)' }}
        >
          ABOUT
        </div>

        {/* Section Title */}
        <h2
          className="text-[40px] font-serif mb-12"
          style={{ color: 'var(--text-primary)' }}
        >
          A bit about me
        </h2>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Bio — full width */}
          <BentoCard colSpan2>
            <p
              className="text-[16px] leading-[1.8]"
              style={{ color: 'var(--text-secondary)' }}
            >
              I'm a hybrid designer-developer who thrives at the intersection of craft and code.
              After years of building products for venture-backed startups, I've learned that the
              best interfaces come from deeply understanding both the user's needs and the technical
              constraints. I don't just design screens—I ship production code.
            </p>
          </BentoCard>

          {/* Currently Building */}
          <BentoCard>
            <CardLabel>Currently building</CardLabel>
            <p className="text-[15px]" style={{ color: 'var(--text-secondary)' }}>
              A design system toolkit for early-stage teams
            </p>
          </BentoCard>

          {/* Location */}
          <BentoCard>
            <CardLabel>Location</CardLabel>
            <p className="text-[15px]" style={{ color: 'var(--text-secondary)' }}>
              San Francisco, CA 🇺🇸
            </p>
          </BentoCard>

          {/* Open To */}
          <BentoCard>
            <CardLabel>Open to</CardLabel>
            <div className="flex flex-wrap gap-2">
              {openToTags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 rounded font-mono text-[11px]"
                  style={{
                    backgroundColor: 'var(--accent-subtle)',
                    color: 'var(--text-secondary)',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </BentoCard>

          {/* Last Played */}
          <BentoCard>
            <CardLabel>Last played</CardLabel>
            <div className="flex items-center gap-3">
              <Image
                src="https://images.unsplash.com/photo-1629923759854-156b88c433aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=80"
                alt="Midnight City – M83 album artwork"
                width={40}
                height={40}
                className="rounded object-cover"
                unoptimized
              />
              <div className="flex-1 min-w-0">
                <div
                  className="text-[13px] truncate"
                  style={{ color: 'var(--text-primary)' }}
                >
                  Midnight City
                </div>
                <div
                  className="text-[12px] truncate"
                  style={{ color: 'var(--text-muted)' }}
                >
                  M83
                </div>
              </div>
            </div>
          </BentoCard>

          {/* Quote — full width */}
          <BentoCard colSpan2>
            <p
              className="text-[18px] font-serif italic leading-[1.6]"
              style={{ color: 'var(--text-secondary)' }}
            >
              "Restraint is the luxury. The best design is often what you choose not to do."
            </p>
          </BentoCard>
        </div>
      </div>
    </section>
  )
}
