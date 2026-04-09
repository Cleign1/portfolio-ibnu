import React from 'react'
import './styles.css'
import './theme.css'
import { CustomCursor } from './components/CustomCursor'

export const metadata = {
  title: 'Portfolio - Ibnu Khaidar',
  description: 'Portfolio of Ibnu Khaidar.',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body className="relative min-h-screen">
        <CustomCursor />
        {children}
      </body>
    </html>
  )
}
