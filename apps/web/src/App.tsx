import { useMemo, useState } from 'react'
import { Navigate, Route, Routes, useNavigate, useParams } from 'react-router-dom'
import './App.css'

type PackageOption = 'Premium' | 'Ultimate'

type Workspace = {
  id: number
  namaKeluarga: string
  slug: string
  familyAdmin: string
  email: string
  paket: PackageOption
  status: 'Aktif'
}

type WorkspaceForm = {
  namaKeluarga: string
  slug: string
  familyAdmin: string
  email: string
  paket: PackageOption | ''
}

type ErrorMap = Partial<Record<keyof WorkspaceForm, string>>

type StatCardProps = {
  label: string
  value: number
}

type WorkspaceCardProps = Workspace & {
  onClick: () => void
}

type QuickActionCardProps = {
  icon: string
  title: string
}

const initialForm: WorkspaceForm = {
  namaKeluarga: '',
  slug: '',
  familyAdmin: '',
  email: '',
  paket: '',
}

function StatCard({ label, value }: StatCardProps) {
  return (
    <div className="stat-card">
      <p className="stat-card__label">{label}</p>
      <strong className="stat-card__value">{value}</strong>
    </div>
  )
}

function WorkspaceCard({ namaKeluarga, paket, familyAdmin, email, status, onClick }: WorkspaceCardProps) {
  return (
    <button type="button" className="workspace-card" onClick={onClick}>
      <div className="workspace-card__header">
        <div>
          <p className="workspace-card__label">Nama Keluarga</p>
          <h3>{namaKeluarga}</h3>
        </div>
        <span className="workspace-card__badge">{paket}</span>
      </div>

      <div className="workspace-card__body">
        <div>
          <p className="workspace-card__label">Family Admin</p>
          <span>{familyAdmin}</span>
        </div>
        <div>
          <p className="workspace-card__label">Email</p>
          <span>{email}</span>
        </div>
        <div>
          <p className="workspace-card__label">Status</p>
          <span>{status}</span>
        </div>
      </div>
    </button>
  )
}

function QuickActionCard({ icon, title }: QuickActionCardProps) {
  return (
    <div className="action-card">
      <div className="action-card__icon">{icon}</div>
      <span>{title}</span>
    </div>
  )
}

function WorkspaceDashboardPage() {
  const { slug } = useParams()
  const navigate = useNavigate()

  const workspace = useMemo(() => {
    const saved = localStorage.getItem('jejaknasab-workspaces')
    const list: Workspace[] = saved ? JSON.parse(saved) : []

    return list.find((item) => item.slug === slug) ?? null
  }, [slug])

  if (!workspace) {
    return <Navigate to="/" replace />
  }

  return (
    <main className="workspace-dashboard-page">
      <section className="workspace-dashboard-shell">
        <div className="workspace-dashboard__topbar">
          <button type="button" className="back-button" onClick={() => navigate('/')}>
            ← Kembali
          </button>
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
            <QuickActionCard icon="👤" title="Anggota Keluarga" />
            <QuickActionCard icon="🌳" title="Pohon Silsilah" />
            <QuickActionCard icon="📖" title="Buku Nasab" />
            <QuickActionCard icon="⚙" title="Pengaturan Workspace" />
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

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [form, setForm] = useState<WorkspaceForm>(initialForm)
  const [errors, setErrors] = useState<ErrorMap>({})
  const [workspaces, setWorkspaces] = useState<Workspace[]>(() => {
    const saved = localStorage.getItem('jejaknasab-workspaces')
    return saved ? JSON.parse(saved) : []
  })

  const navigate = useNavigate()

  const stats = useMemo(() => {
    return {
      total: workspaces.length,
      premium: workspaces.filter((workspace) => workspace.paket === 'Premium').length,
      ultimate: workspaces.filter((workspace) => workspace.paket === 'Ultimate').length,
    }
  }, [workspaces])

  const openModal = () => {
    setForm(initialForm)
    setErrors({})
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setErrors({})
    setIsModalOpen(false)
  }

  const handleFieldChange = (field: keyof WorkspaceForm, value: string) => {
    setForm((current) => ({ ...current, [field]: value }))
    setErrors((current) => ({ ...current, [field]: undefined }))
  }

  const validateForm = () => {
    const nextErrors: ErrorMap = {}

    if (!form.namaKeluarga.trim()) {
      nextErrors.namaKeluarga = 'Nama Keluarga wajib diisi.'
    }

    if (!form.slug.trim()) {
      nextErrors.slug = 'Slug wajib diisi.'
    } else if (!/^[a-z0-9-]+$/.test(form.slug.trim())) {
      nextErrors.slug = 'Slug hanya boleh berisi huruf kecil, angka, dan dash.'
    }

    if (!form.familyAdmin.trim()) {
      nextErrors.familyAdmin = 'Nama Family Admin wajib diisi.'
    }

    if (!form.email.trim()) {
      nextErrors.email = 'Email wajib diisi.'
    }

    if (!form.paket) {
      nextErrors.paket = 'Paket wajib dipilih.'
    }

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleSave = () => {
    if (!validateForm()) {
      return
    }

    const newWorkspace: Workspace = {
      id: Date.now(),
      namaKeluarga: form.namaKeluarga.trim(),
      slug: form.slug.trim(),
      familyAdmin: form.familyAdmin.trim(),
      email: form.email.trim(),
      paket: form.paket as PackageOption,
      status: 'Aktif',
    }

    const nextList = [newWorkspace, ...workspaces]
    setWorkspaces(nextList)
    localStorage.setItem('jejaknasab-workspaces', JSON.stringify(nextList))
    closeModal()
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          <main className="dashboard-page">
            <section className="dashboard-shell">
              <p className="dashboard-title">JejakNasab</p>
              <h1 className="dashboard-subtitle">Platform Owner Dashboard</h1>

              <div className="stats-grid">
                <StatCard label="Total Workspace" value={stats.total} />
                <StatCard label="Premium" value={stats.premium} />
                <StatCard label="Ultimate" value={stats.ultimate} />
              </div>

              <button type="button" className="primary-button" onClick={openModal}>
                + Buat Workspace
              </button>

              {workspaces.length === 0 ? (
                <section className="empty-state-card" aria-label="Workspace empty state">
                  <div className="empty-state-card__icon">📂</div>
                  <h2>Belum ada Workspace</h2>
                  <p>Tambahkan Workspace pertama untuk mulai mengelola keluarga.</p>
                </section>
              ) : (
                <section className="workspace-list">
                  {workspaces.map((workspace) => (
                    <WorkspaceCard
                      key={workspace.id}
                      {...workspace}
                      onClick={() => navigate(`/workspace/${workspace.slug}`)}
                    />
                  ))}
                </section>
              )}
            </section>

            {isModalOpen ? (
              <div className="modal-overlay" role="presentation">
                <div className="modal-card" role="dialog" aria-modal="true" aria-labelledby="modal-title">
                  <h2 id="modal-title">Buat Workspace Baru</h2>

                  <div className="form-grid">
                    <label className="field">
                      <span>Nama Keluarga</span>
                      <input
                        value={form.namaKeluarga}
                        onChange={(event) => handleFieldChange('namaKeluarga', event.target.value)}
                      />
                      {errors.namaKeluarga ? <small>{errors.namaKeluarga}</small> : null}
                    </label>

                    <label className="field">
                      <span>Slug</span>
                      <input
                        value={form.slug}
                        onChange={(event) => handleFieldChange('slug', event.target.value)}
                      />
                      {errors.slug ? <small>{errors.slug}</small> : null}
                    </label>

                    <label className="field">
                      <span>Nama Family Admin</span>
                      <input
                        value={form.familyAdmin}
                        onChange={(event) => handleFieldChange('familyAdmin', event.target.value)}
                      />
                      {errors.familyAdmin ? <small>{errors.familyAdmin}</small> : null}
                    </label>

                    <label className="field">
                      <span>Email</span>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(event) => handleFieldChange('email', event.target.value)}
                      />
                      {errors.email ? <small>{errors.email}</small> : null}
                    </label>

                    <fieldset className="field fieldset">
                      <legend>Paket</legend>
                      <label>
                        <input
                          type="radio"
                          name="paket"
                          value="Premium"
                          checked={form.paket === 'Premium'}
                          onChange={(event) => handleFieldChange('paket', event.target.value)}
                        />
                        <span>Premium</span>
                      </label>
                      <label>
                        <input
                          type="radio"
                          name="paket"
                          value="Ultimate"
                          checked={form.paket === 'Ultimate'}
                          onChange={(event) => handleFieldChange('paket', event.target.value)}
                        />
                        <span>Ultimate</span>
                      </label>
                      {errors.paket ? <small>{errors.paket}</small> : null}
                    </fieldset>
                  </div>

                  <div className="modal-actions">
                    <button type="button" className="secondary-button" onClick={closeModal}>
                      Batal
                    </button>
                    <button type="button" className="primary-button" onClick={handleSave}>
                      Simpan Workspace
                    </button>
                  </div>
                </div>
              </div>
            ) : null}
          </main>
        }
      />
      <Route path="/workspace/:slug" element={<WorkspaceDashboardPage />} />
    </Routes>
  )
}

export default App
