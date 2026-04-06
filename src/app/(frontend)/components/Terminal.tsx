'use client'

import { useState, useEffect, useRef } from 'react'

interface TerminalProps {
  isOpen: boolean
  onClose: () => void
}

type HistoryEntry = { type: 'input' | 'output'; content: string }

const INITIAL_HISTORY: HistoryEntry[] = [
  { type: 'output', content: "Welcome to Alex Chen's portfolio terminal." },
  { type: 'output', content: 'Type "help" to see available commands.\n' },
]

const COMMANDS: Record<string, string> = {
  whoami: `Alex Chen\nProduct Designer & Frontend Developer\n\nI design and build thoughtful digital products that solve real problems. Currently crafting user experiences at early-stage startups.`,

  skills: `Technical Stack:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Frontend:    React, TypeScript, Next.js, Tailwind CSS
Backend:     Node.js, PostgreSQL, Prisma, GraphQL
Design:      Figma, Design Systems, Prototyping
Tools:       Git, Docker, Vercel, Linear`,

  contact: `Contact Information:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Email:       alex@example.com
GitHub:      github.com/alexchen
LinkedIn:    linkedin.com/in/alexchen`,

  work: `Work Experience:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Flux Technologies          2023 - Present
Watershed Analytics        2021 - 2023
Stealth Startup            2020 - 2021`,

  help: `Available Commands:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
whoami       Personal info and bio
skills       Technical stack
contact      Contact information
work         Work experience
help         Show this help menu
clear        Clear terminal
exit         Close terminal`,
}

export function Terminal({ isOpen, onClose }: TerminalProps) {
  const [input, setInput] = useState('')
  const [history, setHistory] = useState<HistoryEntry[]>(INITIAL_HISTORY)
  const inputRef = useRef<HTMLInputElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)

  // Focus input whenever the terminal opens
  useEffect(() => {
    if (isOpen) inputRef.current?.focus()
  }, [isOpen])

  // Scroll to bottom on every new history entry
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [history])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const trimmedInput = input.trim().toLowerCase()
    if (!trimmedInput) return

    const newHistory: HistoryEntry[] = [
      ...history,
      { type: 'input', content: trimmedInput },
    ]

    if (trimmedInput === 'clear') {
      setHistory([])
      setInput('')
      return
    }

    if (trimmedInput === 'exit') {
      onClose()
      setInput('')
      return
    }

    const output =
      COMMANDS[trimmedInput] ??
      `Command not found: ${trimmedInput}\nType "help" for available commands.`

    newHistory.push({ type: 'output', content: output })
    setHistory(newHistory)
    setInput('')
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') onClose()
  }

  if (!isOpen) return null

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-50 flex items-end justify-center p-4 md:items-center"
      onClick={onClose}
    >
      {/* Terminal Window */}
      <div
        className="w-full md:w-[580px] h-[90vh] md:h-[420px] rounded-none md:rounded-lg overflow-hidden shadow-2xl animate-slide-up"
        style={{
          backgroundColor: '#0D0D0D',
          border: '1px solid #2E2E2B',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Scrollable output */}
        <div
          ref={terminalRef}
          className="h-[calc(100%-48px)] overflow-y-auto p-4 font-mono text-[13px] md:text-[14px] leading-relaxed"
          style={{
            color: '#EEEDE9',
            backgroundImage: `repeating-linear-gradient(
              0deg,
              rgba(0,0,0,0.15),
              rgba(0,0,0,0.15) 1px,
              transparent 1px,
              transparent 2px
            )`,
          }}
        >
          {history.map((item, index) => (
            <div key={index} className="mb-2">
              {item.type === 'input' ? (
                <div className="flex gap-2">
                  <span style={{ color: '#D97706' }}>[alex@portfolio ~]$</span>
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

        {/* Input line */}
        <form
          onSubmit={handleSubmit}
          className="h-[48px] px-4 flex items-center border-t"
          style={{ borderColor: '#2E2E2B' }}
        >
          <span
            className="font-mono text-[13px] md:text-[14px] mr-2 shrink-0"
            style={{ color: '#D97706' }}
          >
            [alex@portfolio ~]$
          </span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent border-none outline-none font-mono text-[13px] md:text-[14px]"
            style={{ color: '#EEEDE9' }}
            autoComplete="off"
            spellCheck={false}
            aria-label="Terminal input"
          />
          {/* Blinking cursor */}
          <span
            className="w-2 h-4 ml-1 animate-blink"
            style={{ backgroundColor: '#D97706' }}
            aria-hidden="true"
          />
        </form>
      </div>
    </div>
  )
}
