import { ProjectItem, type Project } from './ProjectItem'

const projects: Project[] = [
  {
    number: '01',
    title: 'FlowState Design System',
    description: 'A production-ready component library for React and Figma',
    caseStudy: {
      problem: 'Teams wasted weeks rebuilding the same components',
      built: 'Unified design token system with 60+ components and documentation',
      result: 'Reduced design-to-dev handoff time from 2 weeks to 2 days',
    },
    tags: ['React', 'TypeScript', 'Storybook', 'Figma'],
    githubUrl: 'https://github.com',
    liveUrl: 'https://example.com',
    featured: true,
    thumbnail:
      'https://images.unsplash.com/photo-1763718528755-4bca23f82ac3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
  },
  {
    number: '02',
    title: 'Pulse Analytics Dashboard',
    description: 'Real-time analytics platform for SaaS products',
    caseStudy: {
      problem: 'Existing dashboards took 10+ seconds to load',
      built: 'Optimized data pipeline with incremental loading and virtualization',
      result: 'Dashboard loads in under 1 second for 1M+ data points',
    },
    tags: ['Next.js', 'D3.js', 'PostgreSQL', 'WebSockets'],
    githubUrl: 'https://github.com',
    liveUrl: 'https://example.com',
  },
  {
    number: '03',
    title: 'Clarity — Content Editor',
    description: 'Notion-like block editor built for technical writers',
    caseStudy: {
      problem: 'Writers struggled with complex markdown syntax',
      built: 'WYSIWYG editor with keyboard shortcuts and collaborative editing',
      result: 'Adopted by 5,000+ writers, 95% satisfaction rating',
    },
    tags: ['ProseMirror', 'React', 'Tailwind CSS'],
    githubUrl: 'https://github.com',
  },
  {
    number: '04',
    title: 'DevTools Command Palette',
    description: 'VS Code-style command palette for web apps',
    caseStudy: {
      problem: 'Users could not discover keyboard shortcuts',
      built: 'Fuzzy search command palette with shortcuts and recent actions',
      result: 'Power users reduced task completion time by 40%',
    },
    tags: ['TypeScript', 'Fuse.js', 'Radix UI'],
    githubUrl: 'https://github.com',
    liveUrl: 'https://example.com',
  },
]

export function Projects() {
  return (
    <section
      id="projects"
      className="py-20 md:py-32"
      style={{ backgroundColor: 'var(--bg-base)' }}
    >
      <div className="mx-auto max-w-[760px] px-6 md:px-20 lg:px-20">
        {/* Section Label */}
        <div
          className="font-mono text-[11px] uppercase tracking-[0.12em] mb-4"
          style={{ color: 'var(--text-muted)' }}
        >
          PROJECTS
        </div>

        {/* Section Title */}
        <h2
          className="text-[40px] font-serif mb-12"
          style={{ color: 'var(--text-primary)' }}
        >
          Selected work
        </h2>

        {/* Projects List */}
        <div className="space-y-0">
          {projects.map((project, index) => (
            <ProjectItem
              key={project.number}
              project={project}
              isLast={index === projects.length - 1}
            />
          ))}
        </div>

        {/* View All Link */}
        <div className="mt-8">
          <a
            href="#"
            className="inline-flex items-center gap-2 transition-colors"
            style={{ color: 'var(--accent)' }}
          >
            View all projects →
          </a>
        </div>
      </div>
    </section>
  )
}
