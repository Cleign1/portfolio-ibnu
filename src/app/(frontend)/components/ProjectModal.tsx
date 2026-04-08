'use client'

import { useEffect, useCallback, useState } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'
import { X, ExternalLink } from 'lucide-react'
import type { ProjectData } from './ProjectItem'

// GitHub SVG brand icon (not in lucide-react)
const GithubIcon = ({ size = 16 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M12 0C5.37 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.729.083-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.835 2.807 1.305 3.492.998.108-.776.42-1.305.762-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.468-2.38 1.235-3.22-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.3 1.23A11.51 11.51 0 0 1 12 5.803c1.02.005 2.046.138 3.004.404 2.29-1.552 3.296-1.23 3.296-1.23.654 1.652.243 2.873.12 3.176.77.84 1.233 1.91 1.233 3.22 0 4.61-2.807 5.625-5.48 5.921.43.372.814 1.102.814 2.222 0 1.606-.015 2.898-.015 3.293 0 .322.216.694.825.576C20.565 21.796 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
  </svg>
)

// STAR sections in display order
const STAR_SECTIONS = [
  { key: 'situation' as const, label: 'Situation', accent: false },
  { key: 'task'      as const, label: 'Task',      accent: false },
  { key: 'action'   as const, label: 'Action',    accent: false },
  { key: 'result'   as const, label: 'Result',    accent: true  },
]

interface ProjectModalProps {
  project: ProjectData | null
  onClose: () => void
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  // Escape key & body scroll lock
  const handleKey = useCallback(
    (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() },
    [onClose],
  )
  useEffect(() => {
    if (!project) return
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [project, handleKey])

  if (!project || !mounted) return null

  const thumbnailSrc =
    typeof project.thumbnail === 'string'
      ? project.thumbnail
      : (project.thumbnail as any)?.url ?? null

  return createPortal(
    /* ── Backdrop ── */
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} details`}
      onClick={onClose}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4
                 bg-black/55 backdrop-blur-md
                 animate-in fade-in duration-200"
    >
      {/* ── Card ── */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-[680px] max-h-[calc(100dvh-2rem)] overflow-y-auto
                   rounded-xl border border-[var(--border)] bg-[var(--bg-surface)]
                   shadow-2xl
                   animate-in fade-in slide-in-from-bottom-4 zoom-in-95 duration-250"
      >
        {/* ── Close button ── */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 z-10
                     flex items-center justify-center w-8 h-8 rounded-full
                     bg-[var(--bg-subtle)] border border-[var(--border)]
                     text-[var(--text-muted)] transition-colors duration-150
                     hover:bg-[var(--border)] hover:text-[var(--text-primary)]
                     cursor-pointer"
        >
          <X size={16} />
        </button>

        {/* ── Thumbnail ── */}
        {thumbnailSrc && (
          <div className="relative w-full h-[220px] rounded-t-xl overflow-hidden">
            <Image
              src={thumbnailSrc}
              alt={project.title}
              fill
              className="object-cover"
              unoptimized
            />
            {/* gradient fade into card body */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[var(--bg-surface)]" />
          </div>
        )}

        {/* ── Body ── */}
        <div className="px-7 pb-8 pt-6 space-y-5">

          {/* Featured badge */}
          {project.featured && (
            <span className="inline-block font-mono text-[11px] uppercase tracking-widest text-[var(--accent)]">
              Featured
            </span>
          )}

          {/* Number + Title */}
          <div className="flex items-baseline gap-3">
            {!project.featured && (
              <span className="font-mono text-[13px] text-[var(--text-muted)] shrink-0">
                {project.number}
              </span>
            )}
            <h2 className="font-serif text-[clamp(20px,4vw,26px)] font-medium text-[var(--text-primary)] leading-tight m-0">
              {project.title}
            </h2>
          </div>

          {/* Description */}
          <p className="text-[15px] text-[var(--text-secondary)] leading-relaxed">
            {project.description}
          </p>

          {/* Tags */}
          {project.tags && project.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((t) => (
                <span
                  key={t.id ?? t.tag}
                  className="px-2.5 py-1 rounded font-mono text-[11px]
                             bg-[var(--accent-subtle)] text-[var(--text-secondary)]"
                >
                  {t.tag}
                </span>
              ))}
            </div>
          )}

          {/* ── STAR block ── */}
          <div className="rounded-lg border border-[var(--border)] bg-[var(--bg-subtle)] p-5 space-y-5">

            {STAR_SECTIONS.map(({ key, label, accent }) => {
              const text = project.caseStudy[key]
              if (!text) return null
              return (
                <div key={key} className="space-y-1.5">
                  {/* Label */}
                  <span
                    className={
                      `font-mono text-[11px] font-semibold uppercase tracking-widest ${
                        accent
                          ? 'text-[var(--accent)]'
                          : 'text-[var(--text-muted)]'
                      }`
                    }
                  >
                    {label}
                  </span>
                  {/* Paragraph — whitespace-pre-wrap preserves newlines */}
                  <p
                    className={
                      `text-[14px] leading-relaxed whitespace-pre-wrap ${
                        accent
                          ? 'text-[var(--text-primary)] font-medium'
                          : 'text-[var(--text-secondary)]'
                      }`
                    }
                  >
                    {text}
                  </p>
                </div>
              )
            })}
          </div>

          {/* ── Action buttons ── */}
          {(project.githubUrl || project.liveUrl) && (
            <div className="flex flex-wrap gap-3 pt-1">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${project.title} source code on GitHub`}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-md
                             font-mono text-[13px] font-medium no-underline
                             bg-[var(--text-primary)] text-[var(--bg-base)]
                             transition-colors duration-150
                             hover:bg-[var(--accent)] hover:text-white
                             dark:bg-[var(--bg-subtle)] dark:text-[var(--text-primary)]
                             dark:border dark:border-[var(--border)]
                             dark:hover:bg-[var(--accent)] dark:hover:text-white
                             cursor-pointer active:scale-[0.97]"
                >
                  <GithubIcon size={15} />
                  Source code
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${project.title} live app`}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-md
                             font-mono text-[13px] font-medium no-underline
                             bg-transparent text-[var(--accent)]
                             border border-[var(--accent)]
                             transition-colors duration-150
                             hover:bg-[var(--accent)] hover:text-white
                             cursor-pointer active:scale-[0.97]"
                >
                  <ExternalLink size={15} />
                  Live app
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body,
  )
}
