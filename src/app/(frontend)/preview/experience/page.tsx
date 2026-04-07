import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { ExperiencePreviewClient } from '@/app/(frontend)/components/ExperiencePreviewClient'

export default async function ExperiencePreviewRoute() {
  const payload = await getPayload({ config: configPromise })

  // Fetch from DB. Uses draft: true to ensure draft changes appear in the preview
  const initialData = await payload.findGlobal({
    slug: 'experience',
    draft: true,
    depth: 1, // depth 1 to resolve media relations if any
  })

  // Derive Server URL without trailing slash
  const serverURL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

  return (
    <div className="preview-container bg-white dark:bg-black w-full min-h-screen">
      <ExperiencePreviewClient initialData={initialData} serverURL={serverURL} />
    </div>
  )
}
