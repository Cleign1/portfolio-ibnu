import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { draftMode } from 'next/headers'
import { ExperiencePreviewClient } from './ExperiencePreviewClient'

export async function Experience() {
  const payload = await getPayload({ config: configPromise })
  const { isEnabled: isDraftMode } = await draftMode()

  const experienceData = await payload.findGlobal({
    slug: 'experience',
    draft: isDraftMode,
    depth: 1,
  })

  // Fallback to localhost if the env var isn't set
  const serverURL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

  return <ExperiencePreviewClient initialData={experienceData} serverURL={serverURL} />
}
