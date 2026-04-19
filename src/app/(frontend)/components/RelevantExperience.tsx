import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { draftMode } from 'next/headers'
import { RelevantExperiencePreviewClient } from './RelevantExperiencePreviewClient'

export async function RelevantExperience() {
  const payload = await getPayload({ config: configPromise })
  const { isEnabled: isDraftMode } = await draftMode()

  const relevantexperienceData = await payload.findGlobal({
    slug: 'relevantExperience',
    draft: isDraftMode,
    depth: 1,
  })

  const serverURL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

  return (
    <RelevantExperiencePreviewClient initialData={relevantexperienceData} serverURL={serverURL} />
  )
}
