import type { ReactNode } from 'react'

type ButtonProps = {
  children: ReactNode
  type?: 'button' | 'submit' | 'reset'
  className?: string
  onClick?: () => void
}

export function Button({ children, type = 'button', className = '', onClick }: ButtonProps) {
  return (
    <button type={type} className={className} onClick={onClick}>
      {children}
    </button>
  )
}
