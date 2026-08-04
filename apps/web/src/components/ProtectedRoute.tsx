import type { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { getSession } from '../features/auth/services/authService'

type ProtectedRouteProps = {
  role: 'owner' | 'family_admin' | 'member'
  children: ReactNode
}

export function ProtectedRoute({ role, children }: ProtectedRouteProps) {
  const session = getSession()
  const location = useLocation()

  if (!session) {
    const fallbackPath = role === 'owner' ? '/owner/login' : '/login'
    return <Navigate to={fallbackPath} replace state={{ from: location.pathname }} />
  }

  if (role === 'owner' && session.role !== 'owner') {
    return <Navigate to="/" replace />
  }

  if (role === 'family_admin' && !['family_admin', 'member'].includes(session.role)) {
    return <Navigate to="/" replace />
  }

  return <>{children}</>
}
