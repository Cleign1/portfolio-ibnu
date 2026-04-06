'use client'

import { createContext, useContext, useState } from 'react'

interface TerminalContextValue {
  isOpen: boolean
  open: () => void
  close: () => void
}

const TerminalContext = createContext<TerminalContextValue>({
  isOpen: false,
  open: () => {},
  close: () => {},
})

export function TerminalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <TerminalContext.Provider
      value={{
        isOpen,
        open: () => setIsOpen(true),
        close: () => setIsOpen(false),
      }}
    >
      {children}
    </TerminalContext.Provider>
  )
}

export const useTerminal = () => useContext(TerminalContext)
