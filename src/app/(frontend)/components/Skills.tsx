interface SkillCategory {
  label: string
  skills: string[]
}

const skillCategories: SkillCategory[] = [
  {
    label: 'FRONTEND',
    skills: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Framer Motion'],
  },
  {
    label: 'BACKEND',
    skills: ['Node.js', 'PostgreSQL', 'Prisma', 'REST', 'GraphQL'],
  },
  {
    label: 'DESIGN',
    skills: ['Figma', 'Prototyping', 'Design Systems', 'User Research', 'Interaction Design'],
  },
  {
    label: 'TOOLS',
    skills: ['Git', 'Docker', 'Vercel', 'Linear', 'Notion'],
  },
]

export function Skills() {
  return (
    <section
      id="skills"
      className="py-20 md:py-32"
      style={{ backgroundColor: 'var(--bg-base)' }}
    >
      <div className="mx-auto max-w-[760px] px-6 md:px-20 lg:px-20">
        {/* Section Label */}
        <div
          className="font-mono text-[11px] uppercase tracking-[0.12em] mb-4"
          style={{ color: 'var(--text-muted)' }}
        >
          SKILLS
        </div>

        {/* Section Title */}
        <h2
          className="text-[40px] font-serif mb-12"
          style={{ color: 'var(--text-primary)' }}
        >
          What I work with
        </h2>

        {/* Desktop — label + dot-joined list */}
        <div className="hidden md:block space-y-0">
          {skillCategories.map((category, index) => (
            <div key={category.label}>
              <div className="flex items-start py-6">
                {/* Category label */}
                <div
                  className="w-[120px] font-mono text-[11px] uppercase tracking-wider text-right pr-8 shrink-0"
                  style={{ color: 'var(--text-muted)' }}
                >
                  {category.label}
                </div>

                {/* Skills */}
                <div
                  className="flex-1 text-[14px]"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {category.skills.join(' · ')}
                </div>
              </div>

              {/* Divider */}
              {index < skillCategories.length - 1 && (
                <div className="h-px" style={{ backgroundColor: 'var(--border)' }} />
              )}
            </div>
          ))}
        </div>

        {/* Mobile — pill grid per category */}
        <div className="md:hidden space-y-6">
          {skillCategories.map((category) => (
            <div key={category.label}>
              {/* Category label */}
              <div
                className="font-mono text-[11px] uppercase tracking-wider mb-3"
                style={{ color: 'var(--text-muted)' }}
              >
                {category.label}
              </div>

              {/* Skill pills */}
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 rounded font-mono text-[11px]"
                    style={{
                      backgroundColor: 'var(--accent-subtle)',
                      color: 'var(--text-secondary)',
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* Divider */}
              <div className="h-px mt-6" style={{ backgroundColor: 'var(--border)' }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
