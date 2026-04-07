import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { draftMode } from 'next/headers'
import { ProjectsPreviewClient } from './ProjectsPreviewClient'

export async function Projects() {
  const payload = await getPayload({ config: configPromise })
  const { isEnabled: isDraftMode } = await draftMode()

  const projectsData = await payload.findGlobal({
    slug: 'projects',
    draft: isDraftMode,
    depth: 1,
  })

  // Fallback data in case the DB is empty
  const initialData = projectsData || {
    label: 'PROJECTS',
    title: 'Selected work',
    projectsBlocks: [
      {
        blockType: 'projectItem',
        number: '01',
        title: 'FlowState Design System',
        description: 'A production-ready component library for React and Figma',
        caseStudy: {
          problem: 'Teams wasted weeks rebuilding the same components',
          built: 'Unified design token system with 60+ components and documentation',
          result: 'Reduced design-to-dev handoff time from 2 weeks to 2 days',
        },
        tags: [{ tag: 'React' }, { tag: 'TypeScript' }, { tag: 'Storybook' }, { tag: 'Figma' }],
        githubUrl: 'https://github.com',
        liveUrl: 'https://example.com',
        featured: true,
        thumbnail: {
          url: 'https://images.unsplash.com/photo-1763718528755-4bca23f82ac3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
          alt: 'FlowState Design System',
        },
      },
      {
        blockType: 'projectItem',
        number: '02',
        title: 'Pulse Analytics Dashboard',
        description: 'Real-time analytics platform for SaaS products',
        caseStudy: {
          problem: 'Existing dashboards took 10+ seconds to load',
          built: 'Optimized data pipeline with incremental loading and virtualization',
          result: 'Dashboard loads in under 1 second for 1M+ data points',
        },
        tags: [{ tag: 'Next.js' }, { tag: 'D3.js' }, { tag: 'PostgreSQL' }, { tag: 'WebSockets' }],
        githubUrl: 'https://github.com',
        liveUrl: 'https://example.com',
      },
      {
        blockType: 'projectItem',
        number: '03',
        title: 'Clarity — Content Editor',
        description: 'Notion-like block editor built for technical writers',
        caseStudy: {
          problem: 'Writers struggled with complex markdown syntax',
          built: 'WYSIWYG editor with keyboard shortcuts and collaborative editing',
          result: 'Adopted by 5,000+ writers, 95% satisfaction rating',
        },
        tags: [{ tag: 'ProseMirror' }, { tag: 'React' }, { tag: 'Tailwind CSS' }],
        githubUrl: 'https://github.com',
      },
      {
        blockType: 'projectItem',
        number: '04',
        title: 'DevTools Command Palette',
        description: 'VS Code-style command palette for web apps',
        caseStudy: {
          problem: 'Users could not discover keyboard shortcuts',
          built: 'Fuzzy search command palette with shortcuts and recent actions',
          result: 'Power users reduced task completion time by 40%',
        },
        tags: [{ tag: 'TypeScript' }, { tag: 'Fuse.js' }, { tag: 'Radix UI' }],
        githubUrl: 'https://github.com',
        liveUrl: 'https://example.com',
      },
    ]
  }

  const serverURL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

  return <ProjectsPreviewClient initialData={initialData} serverURL={serverURL} />
}
