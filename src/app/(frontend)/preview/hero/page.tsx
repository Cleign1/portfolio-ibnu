import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { HeroPreviewClient } from '../../components/HeroPreviewClient'
import '../../styles.css'
import '../../theme.css'

/**
 * /preview/hero — Dedicated live-preview route for the Hero global.
 *
 * Payload admin embeds this URL in an iframe and sends real-time
 * document updates via postMessage. HeroPreviewClient consumes those
 * updates with useLivePreview so every keystroke in the admin panel
 * is instantly reflected here.
 */
export default async function HeroPreviewPage() {
  const payload = await getPayload({ config: configPromise })

  // Fetch current saved state — used as initialData before the first
  // postMessage arrives (prevents a flash of empty content).
  const heroData = await payload.findGlobal({
    slug: 'hero',
    depth: 1,
  })

  const serverURL = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'

  return <HeroPreviewClient initialData={heroData} serverURL={serverURL} />
}
