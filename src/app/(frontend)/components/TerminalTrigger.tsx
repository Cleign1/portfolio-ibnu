'use client'

import { useTerminal } from './TerminalContext'

export function TerminalTrigger() {
  const { open } = useTerminal()

  return (
    <div className="flex items-center gap-6">
      {/* Desktop label */}
      <button
        onClick={open}
        className="footer-terminal-btn font-mono text-[11px] md:text-[12px] hidden md:block"
      >
        Press / to open terminal
      </button>

      {/* Mobile icon */}
      <button
        onClick={open}
        className="footer-terminal-btn md:hidden font-mono text-[14px]"
        title="Open terminal"
        aria-label="Open terminal"
      >
        &gt;_
      </button>
    </div>
  )
}
