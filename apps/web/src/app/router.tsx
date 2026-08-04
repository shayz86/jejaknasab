import { Navigate, Route, Routes } from 'react-router-dom'
import { ProtectedRoute } from '../components/ProtectedRoute'
import { LoginPage } from '../features/auth/pages/LoginPage'
import { RegisterPage } from '../features/auth/pages/RegisterPage'
import { OwnerDashboardPage } from '../features/owner/pages/OwnerDashboardPage'
import { PersonListPage } from '../features/person/pages/PersonListPage'
import { LandingPage } from '../features/public/pages/LandingPage'
import { WorkspaceDashboardPage } from '../features/workspace/pages/WorkspaceDashboardPage'

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route
        path="/owner"
        element={
          <ProtectedRoute role="owner">
            <OwnerDashboardPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/workspace/:slug"
        element={
          <ProtectedRoute role="member">
            <WorkspaceDashboardPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/workspace/:slug/persons"
        element={
          <ProtectedRoute role="member">
            <PersonListPage />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
