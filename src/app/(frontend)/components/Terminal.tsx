'use client'

import { useState, useEffect, useRef } from 'react'

interface TerminalProps {
  isOpen: boolean
  onClose: () => void
}

type HistoryEntry = { type: 'input' | 'output'; content: string }

const DEFAULT_WIDTH = 600
const DEFAULT_HEIGHT = 420
const MIN_WIDTH = 320
const MIN_HEIGHT = 200
const TITLE_BAR_H = 36
const INPUT_BAR_H = 48

const INITIAL_HISTORY: HistoryEntry[] = [
  { type: 'output', content: "Welcome to Ibnu Khaidar's portfolio terminal." },
  { type: 'output', content: 'Type "help" to see available commands.\n' },
]

const COMMANDS: Record<string, string> = {
  whoami: `Ibnu Khaidar\n\nFull-stack developer with a strong focus on real-time web applications and streaming systems Experienced in building browser-based audio tools and scalable backend services using Node.js, WebSocket, and FFmpeg. Passionate about delivering high performance, production ready solutions with clean architecture and real time communication.`,

  skills: `Technical Stack:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Programming Language: Javascript, Python, HTML, CSS, SQL, PHP
Frontend:             React, Next.js, Vite
Backend:              Express Node.js, Flask
Machine Learning:     Tensorflow, Pytorch`,

  contact: `Contact Information:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Email:       ibnu@ibnukhaidar.my.id
GitHub:      github.com/cleign1
LinkedIn:    linkedin.com/in/muhamad-ibnu-khaidar-hafiz`,

  work: `Work Experience:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Software Developer Intern - PT NexCast Indonesia
Dec 2025 - Present`,

  help: `Available Commands:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
whoami       Personal info and bio
skills       Technical stack
contact      Contact information
work         Work experience
related      Related Experience
help         Show this help menu
clear        Clear terminal
exit         Close terminal`,

  related: `Related Experience
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Machine Learning Cohort - Bangkit Academy (Google, Gojek, Tokopedia, Traveloka)
Feb 2024 - Jul 2024

Laboratory Assistant & Workshop Instructor - LePKom Gunadarma
Jan 2023 - Dec 2024`,
}

/* ─── resize handle definitions ─────────────────────────────────────────── */
const HANDLES = [
  { dir: 'n', className: 'absolute top-0 left-3 right-3 h-2' },
  { dir: 's', className: 'absolute bottom-0 left-3 right-3 h-2' },
  { dir: 'e', className: 'absolute right-0 top-3 bottom-3 w-2' },
  { dir: 'w', className: 'absolute left-0 top-3 bottom-3 w-2' },
  { dir: 'ne', className: 'absolute top-0 right-0 w-4 h-4' },
  { dir: 'nw', className: 'absolute top-0 left-0 w-4 h-4' },
  { dir: 'se', className: 'absolute bottom-0 right-0 w-4 h-4' },
  { dir: 'sw', className: 'absolute bottom-0 left-0 w-4 h-4' },
] as const

/* ─── cursor mapping (overrides custom cursor via data attr) ─────────────── */
const DIR_CURSOR: Record<string, string> = {
  n: 'cursor-n-resize',
  s: 'cursor-s-resize',
  e: 'cursor-e-resize',
  w: 'cursor-w-resize',
  ne: 'cursor-ne-resize',
  nw: 'cursor-nw-resize',
  se: 'cursor-se-resize',
  sw: 'cursor-sw-resize',
}

export function Terminal({ isOpen, onClose }: TerminalProps) {
  const [input, setInput] = useState('')
  const [history, setHistory] = useState<HistoryEntry[]>(INITIAL_HISTORY)
  const [size, setSize] = useState({ width: DEFAULT_WIDTH, height: DEFAULT_HEIGHT })
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDesktop, setIsDesktop] = useState(false)

  const inputRef = useRef<HTMLInputElement>(null)
  const termRef = useRef<HTMLDivElement>(null)

  /* ── keep refs in sync so event handlers never read stale state ── */
  const sizeRef = useRef(size)
  const posRef = useRef(position)
  sizeRef.current = size
  posRef.current = position

  const ia = useRef({
    type: 'none' as 'none' | 'drag' | 'resize',
    dir: '',
    startMouseX: 0,
    startMouseY: 0,
    startW: 0,
    startH: 0,
    startX: 0,
    startY: 0,
  })

  /* ── detect desktop ── */
  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  /* ── centre + reset on open ── */
  useEffect(() => {
    if (!isOpen) return
    setSize({ width: DEFAULT_WIDTH, height: DEFAULT_HEIGHT })
    if (window.innerWidth >= 768) {
      setPosition({
        x: Math.max(0, (window.innerWidth - DEFAULT_WIDTH) / 2),
        y: Math.max(0, (window.innerHeight - DEFAULT_HEIGHT) / 2),
      })
    }
    setTimeout(() => inputRef.current?.focus(), 50)
  }, [isOpen])

  /* ── auto-scroll output ── */
  useEffect(() => {
    if (termRef.current) termRef.current.scrollTop = termRef.current.scrollHeight
  }, [history])

  /* ── global mouse handlers (registered once, uses refs) ── */
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const { type, dir, startMouseX, startMouseY, startW, startH, startX, startY } = ia.current
      if (type === 'none') return

      const dx = e.clientX - startMouseX
      const dy = e.clientY - startMouseY

      if (type === 'drag') {
        setPosition({
          x: Math.max(0, Math.min(window.innerWidth - sizeRef.current.width, startX + dx)),
          y: Math.max(0, Math.min(window.innerHeight - TITLE_BAR_H, startY + dy)),
        })
        return
      }

      /* resize */
      let w = startW,
        h = startH,
        x = startX,
        y = startY

      if (dir.includes('e')) w = Math.max(MIN_WIDTH, startW + dx)
      if (dir.includes('w')) {
        w = Math.max(MIN_WIDTH, startW - dx)
        x = startX + startW - w
      }
      if (dir.includes('s')) h = Math.max(MIN_HEIGHT, startH + dy)
      if (dir.includes('n')) {
        h = Math.max(MIN_HEIGHT, startH - dy)
        y = startY + startH - h
      }

      setSize({ width: w, height: h })
      setPosition({ x, y })
    }

    const onUp = () => {
      if (ia.current.type === 'none') return
      ia.current.type = 'none'
      document.body.style.userSelect = ''
      document.body.style.cursor = ''
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
    }
  }, [])

  /* ─── interaction starters ─────────────────────────────────────────────── */
  const startDrag = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('button')) return
    e.preventDefault()
    ia.current = {
      type: 'drag',
      dir: '',
      startMouseX: e.clientX,
      startMouseY: e.clientY,
      startW: sizeRef.current.width,
      startH: sizeRef.current.height,
      startX: posRef.current.x,
      startY: posRef.current.y,
    }
    document.body.style.userSelect = 'none'
    document.body.style.cursor = 'grabbing'
  }

  const startResize = (e: React.MouseEvent, dir: string) => {
    e.preventDefault()
    e.stopPropagation()
    ia.current = {
      type: 'resize',
      dir,
      startMouseX: e.clientX,
      startMouseY: e.clientY,
      startW: sizeRef.current.width,
      startH: sizeRef.current.height,
      startX: posRef.current.x,
      startY: posRef.current.y,
    }
    document.body.style.userSelect = 'none'
  }

  /* ─── terminal logic ────────────────────────────────────────────────────── */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const cmd = input.trim().toLowerCase()
    if (!cmd) return

    if (cmd === 'clear') {
      setHistory([])
      setInput('')
      return
    }
    if (cmd === 'exit') {
      onClose()
      setInput('')
      return
    }

    const output = COMMANDS[cmd] ?? `Command not found: ${cmd}\nType "help" for available commands.`

    setHistory((prev) => [
      ...prev,
      { type: 'input', content: cmd },
      { type: 'output', content: output },
    ])
    setInput('')
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') onClose()
  }

  if (!isOpen) return null

  /* ─── shared inner content ──────────────────────────────────────────────── */
  const titleBar = (draggable: boolean) => (
    <div
      className={[
        'flex items-center gap-2 px-4 shrink-0 border-b select-none',
        draggable ? 'cursor-grab active:cursor-grabbing' : '',
      ].join(' ')}
      style={{ height: TITLE_BAR_H, borderColor: '#2E2E2B' }}
      onMouseDown={draggable ? startDrag : undefined}
    >
      <button
        onClick={onClose}
        className="w-3 h-3 rounded-full hover:opacity-80 transition-opacity shrink-0"
        style={{ backgroundColor: '#FF5F57' }}
        aria-label="Close terminal"
      />
      <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: '#FFBD2E' }} />
      <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: '#28C840' }} />
      <span
        className="mx-auto font-mono text-[11px] pointer-events-none"
        style={{ color: '#6B6966' }}
      >
        terminal — ibnu@portfolio
      </span>
    </div>
  )

  const outputArea = (fontSize: string) => (
    <div
      ref={termRef}
      className="terminal-content flex-1 overflow-y-auto p-4 font-mono leading-relaxed"
      style={{
        fontSize,
        color: '#EEEDE9',
        backgroundImage: `repeating-linear-gradient(
          0deg,
          rgba(0,0,0,0.12),
          rgba(0,0,0,0.12) 1px,
          transparent 1px,
          transparent 2px
        )`,
      }}
    >
      {history.map((item, i) => (
        <div key={i} className="mb-2">
          {item.type === 'input' ? (
            <div className="flex gap-2 flex-wrap">
              <span style={{ color: '#D97706' }}>[ibnu@portfolio ~]$</span>
              <span>{item.content}</span>
            </div>
          ) : (
            <pre className="whitespace-pre-wrap" style={{ color: '#A8A59E' }}>
              {item.content}
            </pre>
          )}
        </div>
      ))}
    </div>
  )

  const inputBar = (fontSize: string) => (
    <form
      onSubmit={handleSubmit}
      className="shrink-0 px-4 flex items-center border-t"
      style={{ height: INPUT_BAR_H, borderColor: '#2E2E2B' }}
    >
      <span className="font-mono mr-2 shrink-0" style={{ fontSize, color: '#D97706' }}>
        [ibnu@portfolio ~]$
      </span>
      <input
        ref={inputRef}
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        className="flex-1 bg-transparent border-none outline-none font-mono"
        style={{ fontSize, color: '#EEEDE9' }}
        autoComplete="off"
        spellCheck={false}
        aria-label="Terminal input"
      />
      <span
        className="w-2 h-4 ml-1 shrink-0 animate-blink"
        style={{ backgroundColor: '#D97706' }}
        aria-hidden="true"
      />
    </form>
  )

  /* ─── MOBILE: slide-up panel (no resize) ───────────────────────────────── */
  if (!isDesktop) {
    return (
      <div className="fixed inset-0 z-50 flex items-end" onClick={onClose}>
        <div
          className="w-full h-[90vh] overflow-hidden shadow-2xl animate-slide-up flex flex-col"
          style={{ backgroundColor: '#0D0D0D', border: '1px solid #2E2E2B' }}
          onClick={(e) => e.stopPropagation()}
        >
          {titleBar(false)}
          {outputArea('13px')}
          {inputBar('13px')}
        </div>
      </div>
    )
  }

  /* ─── DESKTOP: fixed, draggable, resizable ──────────────────────────────── */
  return (
    <>
      {/* Backdrop — click outside to close */}
      <div className="fixed inset-0 z-50" onClick={onClose} />

      {/* Outer shell — carries position & size, no overflow clip */}
      <div
        className="fixed z-50"
        style={{ left: position.x, top: position.y, width: size.width, height: size.height }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Inner window — overflow-hidden for rounded corners */}
        <div
          className="w-full h-full rounded-lg overflow-hidden shadow-2xl animate-slide-up flex flex-col"
          style={{ backgroundColor: '#0D0D0D', border: '1px solid #2E2E2B' }}
        >
          {titleBar(true)}
          {outputArea('14px')}
          {inputBar('14px')}
        </div>

        {/* ── Resize handles (outside overflow-hidden, same stacking context) ── */}
        {HANDLES.map(({ dir, className }) => (
          <div
            key={dir}
            className={`${className} ${DIR_CURSOR[dir]} z-10`}
            data-resize={dir}
            onMouseDown={(e) => startResize(e, dir)}
          />
        ))}

        {/* SE corner grip dots — visual affordance */}
        <div
          className="absolute bottom-1 right-1 pointer-events-none z-20 flex flex-col gap-[3px] items-end"
          aria-hidden="true"
        >
          <div className="flex gap-[3px]">
            <div className="w-1 h-1 rounded-full" style={{ backgroundColor: '#3E3E3B' }} />
          </div>
          <div className="flex gap-[3px]">
            <div className="w-1 h-1 rounded-full" style={{ backgroundColor: '#3E3E3B' }} />
            <div className="w-1 h-1 rounded-full" style={{ backgroundColor: '#3E3E3B' }} />
          </div>
          <div className="flex gap-[3px]">
            <div className="w-1 h-1 rounded-full" style={{ backgroundColor: '#3E3E3B' }} />
            <div className="w-1 h-1 rounded-full" style={{ backgroundColor: '#3E3E3B' }} />
            <div className="w-1 h-1 rounded-full" style={{ backgroundColor: '#3E3E3B' }} />
          </div>
        </div>
      </div>
    </>
  )
}
