import { useEffect, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { Button } from '../../../components/Button'
import { getWorkspaces } from '../../../services/workspaceApi'
import { QuickActionCard } from '../components/QuickActionCard'
import { workspaceQuickActions } from '../data'
import type { Workspace } from '../../platform/types'

export function WorkspaceDashboardPage() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [workspace, setWorkspace] = useState<Workspace | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    void loadWorkspace()
  }, [slug])

  const loadWorkspace = async () => {
    setIsLoading(true)
    setErrorMessage('')

    try {
      const list = await getWorkspaces()
      const nextWorkspace = list.find((item) => item.slug === slug) ?? null
      setWorkspace(nextWorkspace)
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Gagal memuat workspace.')
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <main className="workspace-dashboard-page">
        <section className="workspace-dashboard-shell">
          <p className="dashboard-title">Memuat Workspace...</p>
        </section>
      </main>
    )
  }

  if (errorMessage) {
    return (
      <main className="workspace-dashboard-page">
        <section className="workspace-dashboard-shell">
          <p className="dashboard-title">{errorMessage}</p>
        </section>
      </main>
    )
  }

  if (!workspace) {
    return <Navigate to="/" replace />
  }

  return (
    <main className="workspace-dashboard-page">
      <section className="workspace-dashboard-shell">
        <div className="workspace-dashboard__topbar">
          <Button className="back-button" onClick={() => navigate('/')}>
            ← Kembali
          </Button>
        </div>

        <div className="workspace-dashboard__hero">
          <div>
            <p className="dashboard-title">Workspace Name</p>
            <h1>{workspace.namaKeluarga}</h1>
          </div>
          <span className="workspace-card__badge">{workspace.paket}</span>
        </div>

        <div className="workspace-dashboard__grid">
          <div className="workspace-dashboard__info-card">
            <p className="workspace-card__label">Family Admin</p>
            <span>{workspace.familyAdmin}</span>
          </div>
          <div className="workspace-dashboard__info-card">
            <p className="workspace-card__label">Member Count</p>
            <span>24</span>
          </div>
          <div className="workspace-dashboard__info-card">
            <p className="workspace-card__label">Generation Count</p>
            <span>5</span>
          </div>
          <div className="workspace-dashboard__info-card">
            <p className="workspace-card__label">Status</p>
            <span>{workspace.status}</span>
          </div>
        </div>

        <section className="workspace-dashboard__actions">
          <div className="section-heading">
            <h2>Quick Actions</h2>
          </div>

          <div className="actions-grid">
            {workspaceQuickActions.map((action, index) => (
              <QuickActionCard
                key={action.title}
                icon={action.icon}
                title={action.title}
                onClick={() => {
                  if (index === 0) {
                    navigate(`/workspace/${workspace.slug}/persons?workspaceId=${encodeURIComponent(workspace.id)}`)
                  }
                }}
              />
            ))}
          </div>
        </section>

        <section className="workspace-dashboard__activity">
          <div className="section-heading">
            <h2>Recent Activity</h2>
          </div>
          <div className="activity-card">
            <p>Belum ada aktivitas.</p>
          </div>
        </section>
      </section>
    </main>
  )
}
