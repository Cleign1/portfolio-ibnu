'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ExternalLink } from 'lucide-react'

// Github brand icon not available in this lucide-react version
const GithubIcon = ({ size = 20 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
)

import { Media } from '@/payload-types'

export interface ProjectData {
  id?: string
  number: string
  title: string
  description: string
  caseStudy: {
    problem: string
    built: string
    result: string
  }
  tags?: { tag: string, id?: string }[] | null
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
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div
      className="group py-7 transition-all duration-150"
      style={{ borderBottom: !isLast ? '1px solid var(--border)' : 'none' }}
    >
      <div
        className={
          project.featured
            ? 'space-y-4'
            : 'grid md:grid-cols-[40px_1fr_auto] gap-4 items-start'
        }
      >
        {/* Project Number — hidden on mobile for non-featured */}
        {!project.featured && (
          <div
            className="hidden md:block font-mono text-[14px] pt-1"
            style={{ color: 'var(--text-muted)' }}
          >
            {project.number}
          </div>
        )}

        {/* Content */}
        <div className="flex-1">
          {project.featured && (
            <div
              className="font-mono text-[11px] uppercase tracking-wider mb-3"
              style={{ color: 'var(--accent)' }}
            >
              Featured
            </div>
          )}

          {/* Title row */}
          <div className="flex items-start justify-between gap-4 mb-2">
            <h3
              className="text-[18px] font-semibold"
              style={{ color: 'var(--text-primary)' }}
            >
              {project.title}
            </h3>

            {/* Icon links — desktop */}
            <div className="hidden md:flex gap-3">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  aria-label={`${project.title} GitHub repository`}
                >
                  <GithubIcon size={20} />
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  aria-label={`${project.title} live demo`}
                >
                  <ExternalLink size={20} />
                </a>
              )}
            </div>
          </div>

          <p className="text-[15px] mb-3" style={{ color: 'var(--text-secondary)' }}>
            {project.description}
          </p>

          {/* Featured thumbnail — desktop, floated right */}
          {project.featured && project.thumbnail && (
            <div className="hidden md:block mb-4">
              <Image
                src={typeof project.thumbnail === 'string' ? project.thumbnail : project.thumbnail?.url || ''}
                alt={project.title}
                width={300}
                height={180}
                className="w-full max-w-[300px] h-[180px] object-cover rounded-lg grayscale-20 float-right ml-6 mb-2"
                style={{ border: '1px solid var(--border)' }}
                unoptimized
              />
            </div>
          )}

          {/* Mobile toggle button */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="md:hidden text-[12px] mb-3 font-mono transition-colors"
            style={{ color: 'var(--text-muted)' }}
            aria-expanded={isExpanded}
          >
            {isExpanded ? '↑ Hide details' : '↓ Details'}
          </button>

          {/* Case study
              Mobile: controlled by isExpanded state
              Desktop: revealed by CSS group-hover on parent div */}
          <div
            className={[
              'overflow-hidden transition-all duration-200',
              isExpanded ? 'max-h-[500px]' : 'max-h-0',
              'md:max-h-0 md:group-hover:max-h-[500px]',
            ].join(' ')}
          >
            <div
              className="space-y-2 font-mono text-[13px] mb-4"
              style={{ color: 'var(--text-muted)' }}
            >
              <div className="flex gap-2">
                <span className="opacity-70 shrink-0">Problem:</span>
                <span>{project.caseStudy.problem}</span>
              </div>
              <div className="flex gap-2">
                <span className="opacity-70 shrink-0">Built:</span>
                <span>{project.caseStudy.built}</span>
              </div>
              <div className="flex gap-2">
                <span className="opacity-70 shrink-0">Result:</span>
                <span>{project.caseStudy.result}</span>
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-3">
            {project.tags?.map((t) => (
              <span
                key={t.id || t.tag}
                className="px-2.5 py-1 rounded font-mono text-[11px]"
                style={{
                  backgroundColor: 'var(--accent-subtle)',
                  color: 'var(--text-secondary)',
                }}
              >
                {t.tag}
              </span>
            ))}
          </div>

          {/* Text links — mobile */}
          <div className="flex md:hidden gap-4 font-mono text-[12px]">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'var(--accent)' }}
              >
                GitHub ↗
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'var(--accent)' }}
              >
                Demo ↗
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
