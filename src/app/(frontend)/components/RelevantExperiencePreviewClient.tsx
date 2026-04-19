'use client'

import { useLivePreview } from '@payloadcms/live-preview-react'
import type { RelevantExperience as RelevantExperienceTypes } from '@/payload-types'

interface Props {
  initialData: RelevantExperienceTypes
  serverURL: string
}

export function RelevantExperiencePreviewClient({ initialData, serverURL }: Props) {
  const { data } = useLivePreview<RelevantExperienceTypes>({
    initialData,
    serverURL,
    depth: 1,
  })

  const title = data.title || 'Relevant Experience'
  const blocks = data.relevantexperienceBlocks || []

  return (
    <section
      id="relevant-experience"
      className="py-20 md:py-32"
      style={{ backgroundColor: 'var(--bg-base)' }}
    >
      <div className="mx-auto max-w-[760px] px-6 md:px-20 lg:px-20">
        {/* Section Label */}
        <div
          className="font-mono text-[11px] uppercase tracking-[0.12em] mb-4"
          style={{ color: 'var(--text-muted)' }}
        >
          RELEVANT EXPERIENCE
        </div>

        {/* Section Title */}
        <h2 className="text-[40px] font-serif mb-12" style={{ color: 'var(--text-primary)' }}>
          {title}
        </h2>

        {/* Experience List */}
        <div className="space-y-0">
          {blocks.map((block, index) => {
            if (block.blockType === 'relevantExperienceItem') {
              return (
                <div key={block.id || index} className="experience-item py-8">
                  {/* Company & Date Row */}
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                    <h3
                      className="text-[16px] font-semibold"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {block.company}
                    </h3>
                    <span
                      className="font-mono text-[13px] md:text-[14px] mt-1 md:mt-0"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      {block.dates}
                    </span>
                  </div>

                  {/* Role */}
                  <div className="text-[14px] mb-1" style={{ color: 'var(--accent)' }}>
                    {block.role}
                  </div>

                  {/* Context */}
                  {block.context && (
                    <div className="text-[13px] mb-4" style={{ color: 'var(--text-muted)' }}>
                      {block.context}
                    </div>
                  )}

                  {/* Bullets */}
                  {block.bullets && block.bullets.length > 0 && (
                    <ul className="space-y-2 mb-4">
                      {block.bullets.map((bulletItem, i) => (
                        <li
                          key={bulletItem.id || i}
                          className="text-[15px] leading-[1.6] flex items-start"
                          style={{ color: 'var(--text-secondary)' }}
                        >
                          <span className="mr-3 shrink-0" style={{ color: 'var(--text-muted)' }}>
                            •
                          </span>
                          <span>{bulletItem.bullet}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Tags */}
                  {block.tags && block.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {block.tags.map((tagItem, i) => (
                        <span
                          key={tagItem.id || i}
                          className="px-2.5 py-1 rounded font-mono text-[11px]"
                          style={{
                            backgroundColor: 'var(--accent-subtle)',
                            color: 'var(--text-secondary)',
                          }}
                        >
                          {tagItem.tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )
            }
            return null
          })}
        </div>
      </div>
    </section>
  )
}
