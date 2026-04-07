'use client'

import { useLivePreview } from '@payloadcms/live-preview-react'
import type { Project } from '@/payload-types'
import { ProjectItem } from './ProjectItem'

interface Props {
  initialData: Project | any
  serverURL: string
}

export function ProjectsPreviewClient({ initialData, serverURL }: Props) {
  const { data } = useLivePreview<Project | any>({
    initialData,
    serverURL,
    depth: 1,
  })

  const safeData = data || initialData
  const label = safeData?.label || 'PROJECTS'
  const title = safeData?.title || 'Selected work'
  const projectsBlocks = safeData?.projectsBlocks || []

  return (
    <section
      id="projects"
      className="py-20 md:py-32"
      style={{ backgroundColor: 'var(--bg-base)' }}
    >
      <div className="mx-auto max-w-[760px] px-6 md:px-20 lg:px-20">
        {/* Section Label */}
        <div
          className="font-mono text-[11px] uppercase tracking-[0.12em] mb-4"
          style={{ color: 'var(--text-muted)' }}
        >
          {label}
        </div>

        {/* Section Title */}
        <h2
          className="text-[40px] font-serif mb-12"
          style={{ color: 'var(--text-primary)' }}
        >
          {title}
        </h2>

        {/* Projects List */}
        <div className="space-y-0">
          {projectsBlocks.map((block: any, index: number) => {
            if (block.blockType !== 'projectItem') return null
            return (
              <ProjectItem
                key={block.id || index}
                project={block}
                isLast={index === projectsBlocks.length - 1}
              />
            )
          })}
        </div>

        {/* View All Link */}
        <div className="mt-8">
          <a
            href="#"
            className="inline-flex items-center gap-2 transition-colors"
            style={{ color: 'var(--accent)' }}
          >
            View all projects →
          </a>
        </div>
      </div>
    </section>
  )
}
