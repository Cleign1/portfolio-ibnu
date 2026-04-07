'use client'

import { useLivePreview } from '@payloadcms/live-preview-react'
import type { Skill } from '@/payload-types'

interface Props {
  initialData: Skill | any
  serverURL: string
}

export function SkillsPreviewClient({ initialData, serverURL }: Props) {
  const { data } = useLivePreview<Skill | any>({
    initialData,
    serverURL,
    depth: 1,
  })

  const safeData = data || initialData
  const title = safeData?.title || 'What I work with'
  const skillBlocks = safeData?.skillsBlocks || []

  return (
    <section
      id="skills"
      className="py-20 md:py-32"
      style={{ backgroundColor: 'var(--bg-base)' }}
    >
      <div className="mx-auto max-w-[760px] px-6 md:px-20 lg:px-20">
        {/* Section Label */}
        <div
          className="font-mono text-[11px] uppercase tracking-[0.12em] mb-4"
          style={{ color: 'var(--text-muted)' }}
        >
          SKILLS
        </div>

        {/* Section Title */}
        <h2
          className="text-[40px] font-serif mb-12"
          style={{ color: 'var(--text-primary)' }}
        >
          {title}
        </h2>

        {/* Desktop — label + dot-joined list */}
        <div className="hidden md:block space-y-0">
          {skillBlocks.map((block: any, index: number) => {
            if (block.blockType !== 'skillCategory') return null
            return (
              <div key={block.id || index}>
                <div className="flex items-start py-6">
                  {/* Category label */}
                  <div
                    className="w-[120px] font-mono text-[11px] uppercase tracking-wider text-right pr-8 shrink-0"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    {block.label}
                  </div>

                  {/* Skills */}
                  <div
                    className="flex-1 text-[14px]"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {block.skills?.map((s: any) => s.skill).join(' · ')}
                  </div>
                </div>

                {/* Divider */}
                {index < skillBlocks.length - 1 && (
                  <div className="h-px" style={{ backgroundColor: 'var(--border)' }} />
                )}
              </div>
            )
          })}
        </div>

        {/* Mobile — pill grid per category */}
        <div className="md:hidden space-y-6">
          {skillBlocks.map((block: any, index: number) => {
            if (block.blockType !== 'skillCategory') return null
            return (
              <div key={block.id || index}>
                {/* Category label */}
                <div
                  className="font-mono text-[11px] uppercase tracking-wider mb-3"
                  style={{ color: 'var(--text-muted)' }}
                >
                  {block.label}
                </div>

                {/* Skill pills */}
                <div className="flex flex-wrap gap-2">
                  {block.skills?.map((s: any, idx: number) => (
                    <span
                      key={s.id || idx}
                      className="px-3 py-1.5 rounded font-mono text-[11px]"
                      style={{
                        backgroundColor: 'var(--accent-subtle)',
                        color: 'var(--text-secondary)',
                      }}
                    >
                      {s.skill}
                    </span>
                  ))}
                </div>

                {/* Divider */}
                <div className="h-px mt-6" style={{ backgroundColor: 'var(--border)' }} />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
