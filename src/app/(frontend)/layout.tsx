import React from 'react'
import './styles.css'
import './theme.css'
import { CustomCursor } from './components/CustomCursor'

export const metadata = {
  title: 'Alex Chen — Product Designer & Frontend Developer',
  description: 'Portfolio of Alex Chen, a hybrid designer-developer specialising in design systems and frontend architecture.',
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
