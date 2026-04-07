import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { ProjectsPreviewClient } from '../../components/ProjectsPreviewClient'

export default async function ProjectsPreviewRoute() {
  const payload = await getPayload({ config: configPromise })
  
  const initialData = await payload.findGlobal({
    slug: 'projects',
    draft: true,
    depth: 1,
  })

  const serverURL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

  return (
    <div className="preview-container bg-white dark:bg-black">
      <ProjectsPreviewClient 
        initialData={initialData} 
        serverURL={serverURL} 
      />
    </div>
  )
}
