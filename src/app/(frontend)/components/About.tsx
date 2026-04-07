import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { draftMode } from 'next/headers'
import { AboutPreviewClient } from './AboutPreviewClient'

export async function About() {
  const payload = await getPayload({ config: configPromise })
  const { isEnabled: isDraftMode } = await draftMode()

  const aboutData = await payload.findGlobal({
    slug: 'about',
    draft: isDraftMode,
    depth: 1, // depth 1 to fetch media relations
  })

  // We fall back to localhost if the env var isn't set
  const serverURL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

  return <AboutPreviewClient initialData={aboutData} serverURL={serverURL} />
}
