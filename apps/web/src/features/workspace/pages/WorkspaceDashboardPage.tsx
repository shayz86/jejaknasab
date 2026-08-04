import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { Button } from '../../../components/Button'
import { QuickActionCard } from '../components/QuickActionCard'
import { workspaceQuickActions } from '../data'
import type { Workspace } from '../../platform/types'

const STORAGE_KEY = 'jejaknasab-workspaces'

export function WorkspaceDashboardPage() {
  const { slug } = useParams()
  const navigate = useNavigate()

  const workspace = (() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    const list: Workspace[] = saved ? JSON.parse(saved) : []
    return list.find((item) => item.slug === slug) ?? null
  })()

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
            {workspaceQuickActions.map((action) => (
              <QuickActionCard key={action.title} icon={action.icon} title={action.title} />
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
