'use client'

import { useLivePreview } from '@payloadcms/live-preview-react'
import type { About, Media } from '@/payload-types'
import Image from 'next/image'

// Reusable bento card wrapper
function BentoCard({
  children,
  colSpan2 = false,
}: {
  children: React.ReactNode
  colSpan2?: boolean
}) {
  return (
    <div
      className={`${colSpan2 ? 'md:col-span-2' : ''} p-6 md:p-8 rounded-xl transition-colors duration-150`}
      style={{
        backgroundColor: 'var(--bg-surface)',
        border: '1px solid var(--border)',
      }}
    >
      {children}
    </div>
  )
}

function CardLabel({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="font-mono text-[11px] uppercase tracking-wider mb-3"
      style={{ color: 'var(--text-muted)' }}
    >
      {children}
    </div>
  )
}

interface Props {
  initialData: About
  serverURL: string
}

export function AboutPreviewClient({ initialData, serverURL }: Props) {
  const { data } = useLivePreview<About>({
    initialData,
    serverURL,
    depth: 1,
  })

  const title = data.title || 'A bit about me'
  const blocks = data.bentoBlocks || []

  return (
    <section id="about" className="py-20 md:py-32" style={{ backgroundColor: 'var(--bg-base)' }}>
      <div className="mx-auto max-w-[760px] px-6 md:px-20 lg:px-20">
        <div
          className="font-mono text-[11px] uppercase tracking-[0.12em] mb-4"
          style={{ color: 'var(--text-muted)' }}
        >
          ABOUT
        </div>

        <h2 className="text-[40px] font-serif mb-12" style={{ color: 'var(--text-primary)' }}>
          {title}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {blocks.map((block, index) => {
            if (block.blockType === 'text') {
              return (
                <BentoCard key={index} colSpan2={block.colSpan2 === true}>
                  <p
                    className={
                      block.isQuote
                        ? 'text-[18px] font-serif italic leading-[1.6]'
                        : 'text-[16px] leading-[1.8]'
                    }
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {block.isQuote ? `"${block.content}"` : block.content}
                  </p>
                </BentoCard>
              )
            }

            if (block.blockType === 'infoCard') {
              return (
                <BentoCard key={index} colSpan2={block.colSpan2 === true}>
                  <CardLabel>{block.label}</CardLabel>
                  <p className="text-[15px]" style={{ color: 'var(--text-secondary)' }}>
                    {block.value}
                  </p>
                </BentoCard>
              )
            }

            if (block.blockType === 'tagsCard') {
              return (
                <BentoCard key={index} colSpan2={block.colSpan2 === true}>
                  <CardLabel>{block.label}</CardLabel>
                  <div className="flex flex-wrap gap-2">
                    {block.tags?.map((item, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1.5 rounded font-mono text-[11px]"
                        style={{
                          backgroundColor: 'var(--accent-subtle)',
                          color: 'var(--text-secondary)',
                        }}
                      >
                        {item.tag}
                      </span>
                    ))}
                  </div>
                </BentoCard>
              )
            }

            if (block.blockType === 'mediaCard') {
              const media = block.media as Media | undefined
              return (
                <BentoCard key={index} colSpan2={block.colSpan2 === true}>
                  <CardLabel>{block.label}</CardLabel>
                  <div className="flex items-center gap-3">
                    {media?.url && (
                      <Image
                        src={media.url}
                        alt={media.alt ?? block.title}
                        width={40}
                        height={40}
                        className="rounded object-cover flex-shrink-0"
                        unoptimized
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="text-[13px] truncate" style={{ color: 'var(--text-primary)' }}>
                        {block.title}
                      </div>
                      {block.subtitle && (
                        <div className="text-[12px] truncate" style={{ color: 'var(--text-muted)' }}>
                          {block.subtitle}
                        </div>
                      )}
                    </div>
                  </div>
                </BentoCard>
              )
            }

            return null
          })}
        </div>
      </div>
    </section>
  )
}
