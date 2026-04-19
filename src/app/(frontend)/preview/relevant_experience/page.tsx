import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { RelevantExperiencePreviewClient } from '@/app/(frontend)/components/RelevantExperiencePreviewClient'

export default async function RelevantExperiencePreviewRoute() {
  const payload = await getPayload({ config: configPromise })

  // Fetch from DB. Uses draft: true to ensure draft changes appear in the preview.
  const initialData = await payload.findGlobal({
    slug: 'relevantExperience',
    draft: true,
    depth: 1,
  })

  // Derive Server URL without trailing slash.
  const serverURL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

  return (
    <div className="preview-container bg-white dark:bg-black w-full min-h-screen">
      <RelevantExperiencePreviewClient initialData={initialData} serverURL={serverURL} />
    </div>
  )
}
