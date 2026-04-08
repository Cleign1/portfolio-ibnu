'use client'

import { useState } from 'react'
import Image from 'next/image'
import type { Media } from '@/payload-types'
import { ProjectModal } from './ProjectModal'

export interface ProjectData {
  id?: string
  number: string
  title: string
  description: string
  caseStudy: {
    situation: string
    task: string
    action: string
    result: string
  }
  tags?: { tag: string; id?: string }[] | null
  githubUrl?: string | null
  liveUrl?: string | null
  featured?: boolean | null
  thumbnail?: string | Media | null
}

interface ProjectItemProps {
  project: ProjectData
  isLast: boolean
}

export function ProjectItem({ project, isLast }: ProjectItemProps) {
  const [modalOpen, setModalOpen] = useState(false)

  const thumbnailSrc =
    typeof project.thumbnail === 'string'
      ? project.thumbnail
      : (project.thumbnail as Media)?.url ?? null

  return (
    <>
      {/* ── Clickable card row ── */}
      <div
        role="button"
        tabIndex={0}
        aria-label={`Open ${project.title} details`}
        onClick={() => setModalOpen(true)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            setModalOpen(true)
          }
        }}
        className={[
          'group py-7 cursor-pointer rounded-sm outline-none',
          'transition-all duration-150',
          'hover:bg-[var(--bg-subtle)] hover:pl-3',
          'focus-visible:outline-2 focus-visible:outline-[var(--accent)] focus-visible:outline-offset-2',
          !isLast ? 'border-b border-[var(--border)]' : '',
        ].join(' ')}
      >
        <div
          className={
            project.featured
              ? 'space-y-4'
              : 'grid md:grid-cols-[40px_1fr] gap-4 items-start'
          }
        >
          {/* Project number — desktop, non-featured only */}
          {!project.featured && (
            <div className="hidden md:block font-mono text-[14px] pt-1 text-[var(--text-muted)]">
              {project.number}
            </div>
          )}

          {/* Content column */}
          <div className="flex-1">
            {/* Featured label */}
            {project.featured && (
              <div className="font-mono text-[11px] uppercase tracking-widest mb-3 text-[var(--accent)]">
                Featured
              </div>
            )}

            {/* Title + expand hint */}
            <div className="flex items-start justify-between gap-4 mb-2">
              <h3 className="text-[18px] font-semibold text-[var(--text-primary)]">
                {project.title}
              </h3>
              <span className="hidden md:inline-block font-mono text-[11px] mt-1 shrink-0
                               opacity-0 group-hover:opacity-100 transition-opacity duration-150
                               text-[var(--text-muted)]">
                details ↗
              </span>
            </div>

            {/* Description */}
            <p className="text-[15px] mb-3 text-[var(--text-secondary)]">
              {project.description}
            </p>

            {/* Featured thumbnail — desktop */}
            {project.featured && thumbnailSrc && (
              <div className="hidden md:block mb-4">
                <Image
                  src={thumbnailSrc}
                  alt={project.title}
                  width={300}
                  height={180}
                  className="w-full max-w-[300px] h-[180px] object-cover rounded-lg float-right ml-6 mb-2
                             border border-[var(--border)]"
                  unoptimized
                />
              </div>
            )}

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {project.tags?.map((t) => (
                <span
                  key={t.id ?? t.tag}
                  className="px-2.5 py-1 rounded font-mono text-[11px]
                             bg-[var(--accent-subtle)] text-[var(--text-secondary)]"
                >
                  {t.tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Modal ── */}
      <ProjectModal
        project={modalOpen ? project : null}
        onClose={() => setModalOpen(false)}
      />
    </>
  )
}
