import { Navigate, Route, Routes } from 'react-router-dom'
import { PlatformOwnerDashboardPage } from '../features/platform/pages/PlatformOwnerDashboardPage'
import { PersonListPage } from '../features/person/pages/PersonListPage'
import { WorkspaceDashboardPage } from '../features/workspace/pages/WorkspaceDashboardPage'

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<PlatformOwnerDashboardPage />} />
      <Route path="/workspace/:slug" element={<WorkspaceDashboardPage />} />
      <Route path="/workspace/:slug/persons" element={<PersonListPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
