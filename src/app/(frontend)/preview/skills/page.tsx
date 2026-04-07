import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { SkillsPreviewClient } from '../../components/SkillsPreviewClient'

export default async function SkillsPreviewRoute() {
  const payload = await getPayload({ config: configPromise })
  
  const initialData = await payload.findGlobal({
    slug: 'skills',
    draft: true,
  })

  const serverURL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

  return (
    <div className="preview-container bg-white dark:bg-black">
      <SkillsPreviewClient 
        initialData={initialData} 
        serverURL={serverURL} 
      />
    </div>
  )
}
