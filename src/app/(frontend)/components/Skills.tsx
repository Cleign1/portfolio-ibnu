import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { draftMode } from 'next/headers'
import { SkillsPreviewClient } from './SkillsPreviewClient'

export async function Skills() {
  const payload = await getPayload({ config: configPromise })
  const { isEnabled: isDraftMode } = await draftMode()

  const safeData = await payload.findGlobal({
    slug: 'skills',
    draft: isDraftMode,
  })

  // Fallback data in case the DB is empty
  const initialData = safeData || {
    title: 'What I work with',
    skillsBlocks: [
      {
        blockType: 'skillCategory',
        label: 'FRONTEND',
        skills: [{ skill: 'React' }, { skill: 'TypeScript' }, { skill: 'Next.js' }, { skill: 'Tailwind CSS' }, { skill: 'Framer Motion' }]
      },
      {
        blockType: 'skillCategory',
        label: 'BACKEND',
        skills: [{ skill: 'Node.js' }, { skill: 'PostgreSQL' }, { skill: 'Prisma' }, { skill: 'REST' }, { skill: 'GraphQL' }]
      },
      {
        blockType: 'skillCategory',
        label: 'DESIGN',
        skills: [{ skill: 'Figma' }, { skill: 'Prototyping' }, { skill: 'Design Systems' }, { skill: 'User Research' }, { skill: 'Interaction Design' }]
      },
      {
        blockType: 'skillCategory',
        label: 'TOOLS',
        skills: [{ skill: 'Git' }, { skill: 'Docker' }, { skill: 'Vercel' }, { skill: 'Linear' }, { skill: 'Notion' }]
      }
    ]
  }

  const serverURL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

  return <SkillsPreviewClient initialData={initialData} serverURL={serverURL} />
}
