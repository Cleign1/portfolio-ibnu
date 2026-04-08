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
    layout: 'list',
    viewAllUrl: null,
    projectsBlocks: [
      {
        blockType: 'projectItem',
        number: '01',
        title: 'FlowState Design System',
        description: 'A production-ready component library for React and Figma',
        caseStudy: {
          situation: 'Teams at fast-growing startups wasted weeks rebuilding the same UI components from scratch.',
          task: 'Design and build a production-ready component library usable by both designers in Figma and developers in React.',
          action: 'Created a unified design token system with 60+ components, full Storybook documentation, and a Figma library that mirrors every component 1-to-1.',
          result: 'Reduced design-to-dev handoff time from 2 weeks to 2 days across 4 product teams.',
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
          situation: 'A SaaS platform\'s analytics dashboard was unusable — it took over 10 seconds to load for any dataset above 100k rows.',
          task: 'Redesign and re-implement the data pipeline and frontend rendering to handle 1M+ data points without sacrificing UX.',
          action: 'Built an optimised streaming data pipeline with incremental loading, virtual scrolling, and progressive chart rendering using D3.',
          result: 'Dashboard loads in under 1 second for 1M+ data points; churn among power users dropped by 30%.',
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
          situation: 'Technical writers on documentation teams found markdown syntax a barrier that slowed their publishing workflow.',
          task: 'Build a block-based WYSIWYG editor tailored to technical content, with first-class support for code blocks, callouts, and collaborative editing.',
          action: 'Implemented a ProseMirror-based editor with keyboard shortcut discovery, real-time collaboration via WebSockets, and an extensible block system.',
          result: 'Adopted by 5,000+ writers; 95% satisfaction rating in post-launch survey.',
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
          situation: 'Users of complex web apps struggled to discover keyboard shortcuts and frequently relied on slow mouse navigation.',
          task: 'Design and ship a command palette that surfaces every available action via fuzzy search, without requiring any UI changes across the app.',
          action: 'Built a VS Code-style command palette using Fuse.js for fuzzy search, Radix UI for accessible dialog primitives, and a plugin API for third-party commands.',
          result: 'Power users reduced average task completion time by 40%; the palette was opened 2× more than the traditional nav menu within the first week.',
        },
        tags: [{ tag: 'TypeScript' }, { tag: 'Fuse.js' }, { tag: 'Radix UI' }],
        githubUrl: 'https://github.com',
        liveUrl: 'https://example.com',
      },
    ],
  }

  const serverURL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

  return <ProjectsPreviewClient initialData={initialData} serverURL={serverURL} />
}
