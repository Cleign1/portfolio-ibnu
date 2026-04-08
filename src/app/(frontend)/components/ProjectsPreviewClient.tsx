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

  const safeData        = data || initialData
  const label           = safeData?.label           || 'PROJECTS'
  const title           = safeData?.title           || 'Selected work'
  const layout          = safeData?.layout          || 'list'
  const viewAllUrl      = safeData?.viewAllUrl      || null
  const projectsBlocks  = safeData?.projectsBlocks  || []

  // Sort by displayOrder if present
  const sorted = [...projectsBlocks].sort(
    (a: any, b: any) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0),
  )

  const items = sorted.filter((b: any) => b.blockType === 'projectItem')

  return (
    <section
      id="projects"
      className="py-20 md:py-32"
      style={{ backgroundColor: 'var(--bg-base)' }}
    >
      <div className="mx-auto max-w-[760px] px-6 md:px-20 lg:px-20">

        {/* ── Section Label ── */}
        <div
          className="font-mono text-[11px] uppercase tracking-[0.12em] mb-4"
          style={{ color: 'var(--text-muted)' }}
        >
          {label}
        </div>

        {/* ── Section Title ── */}
        <h2
          className="text-[40px] font-serif mb-12"
          style={{ color: 'var(--text-primary)' }}
        >
          {title}
        </h2>

        {/* ── Project List ── */}
        {layout === 'grid' ? (
          /* 2-column grid layout */
          <div className="grid md:grid-cols-2 gap-6">
            {items.map((block: any, index: number) => (
              <ProjectItem
                key={block.id || index}
                project={block}
                isLast={index === items.length - 1}
              />
            ))}
          </div>
        ) : layout === 'feature' ? (
          /* Featured-first layout: first item full-width, rest as list */
          <div>
            {items[0] && (
              <div className="mb-8">
                <ProjectItem project={items[0]} isLast={false} />
              </div>
            )}
            <div className="space-y-0">
              {items.slice(1).map((block: any, index: number) => (
                <ProjectItem
                  key={block.id || index}
                  project={block}
                  isLast={index === items.length - 2}
                />
              ))}
            </div>
          </div>
        ) : (
          /* Default: minimal list */
          <div className="space-y-0">
            {items.map((block: any, index: number) => (
              <ProjectItem
                key={block.id || index}
                project={block}
                isLast={index === items.length - 1}
              />
            ))}
          </div>
        )}

        {/* ── View All link ── */}
        {viewAllUrl && (
          <div className="mt-8">
            <a
              href={viewAllUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 transition-colors"
              style={{ color: 'var(--accent)' }}
            >
              View all projects →
            </a>
          </div>
        )}
      </div>
    </section>
  )
}
