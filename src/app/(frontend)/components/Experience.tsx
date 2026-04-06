interface ExperienceItem {
  company: string
  role: string
  dates: string
  context: string
  bullets: string[]
  tags: string[]
}

const experiences: ExperienceItem[] = [
  {
    company: 'Flux Technologies',
    role: 'Senior Product Designer',
    dates: '2023 - Present',
    context: 'Remote · Full-time',
    bullets: [
      'Led design system overhaul that reduced component library from 120 to 45 components, decreasing build time by 40%',
      'Shipped redesigned onboarding flow that improved trial-to-paid conversion by 28% across 50K+ users',
      'Established design-to-development handoff process using Figma Variables and design tokens',
    ],
    tags: ['Figma', 'React', 'TypeScript', 'Design Systems'],
  },
  {
    company: 'Watershed Analytics',
    role: 'Product Designer & Frontend Engineer',
    dates: '2021 - 2023',
    context: 'San Francisco, CA · Full-time',
    bullets: [
      'Designed and built data visualization dashboard handling 10M+ events/day, used by Fortune 500 clients',
      'Reduced dashboard load time from 8s to 1.2s through component optimization and lazy loading',
      'Mentored 3 junior designers on prototyping and frontend implementation best practices',
    ],
    tags: ['React', 'D3.js', 'PostgreSQL', 'Tailwind CSS'],
  },
  {
    company: 'Stealth Startup',
    role: 'Founding Designer',
    dates: '2020 - 2021',
    context: 'Remote · Contract',
    bullets: [
      'First design hire—defined visual identity, design system, and product strategy from scratch',
      'Designed and shipped MVP to 1,000 beta users in 4 months, achieving 45% weekly active rate',
      'Built entire frontend in Next.js while establishing design direction',
    ],
    tags: ['Next.js', 'Framer', 'Product Strategy'],
  },
]

export function Experience() {
  return (
    <section
      id="experience"
      className="py-20 md:py-32"
      style={{ backgroundColor: 'var(--bg-base)' }}
    >
      <div className="mx-auto max-w-[760px] px-6 md:px-20 lg:px-20">
        {/* Section Label */}
        <div
          className="font-mono text-[11px] uppercase tracking-[0.12em] mb-4"
          style={{ color: 'var(--text-muted)' }}
        >
          EXPERIENCE
        </div>

        {/* Section Title */}
        <h2
          className="text-[40px] font-serif mb-12"
          style={{ color: 'var(--text-primary)' }}
        >
          Where I&apos;ve worked
        </h2>

        {/* Experience List */}
        <div className="space-y-0">
          {experiences.map((exp, index) => (
            <div key={index} className="experience-item py-8">
              {/* Company & Date Row */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                <h3
                  className="text-[16px] font-semibold"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {exp.company}
                </h3>
                <span
                  className="font-mono text-[13px] md:text-[14px] mt-1 md:mt-0"
                  style={{ color: 'var(--text-muted)' }}
                >
                  {exp.dates}
                </span>
              </div>

              {/* Role */}
              <div className="text-[14px] mb-1" style={{ color: 'var(--accent)' }}>
                {exp.role}
              </div>

              {/* Context */}
              <div className="text-[13px] mb-4" style={{ color: 'var(--text-muted)' }}>
                {exp.context}
              </div>

              {/* Bullets */}
              <ul className="space-y-2 mb-4">
                {exp.bullets.map((bullet, i) => (
                  <li
                    key={i}
                    className="text-[15px] leading-[1.6] pl-4 relative"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    <span
                      className="absolute left-0 top-[0.6em]"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      •
                    </span>
                    {bullet}
                  </li>
                ))}
              </ul>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {exp.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded font-mono text-[11px]"
                    style={{
                      backgroundColor: 'var(--accent-subtle)',
                      color: 'var(--text-secondary)',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
