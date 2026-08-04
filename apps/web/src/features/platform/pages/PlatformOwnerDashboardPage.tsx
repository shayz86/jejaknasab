import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../../components/Button'
import { EmptyState } from '../../../components/EmptyState'
import { Header } from '../../../components/Header'
import { StatCard } from '../../../components/StatCard'
import { initialForm } from '../data'
import { WorkspaceCard } from '../components/WorkspaceCard'
import { WorkspaceCreateModal } from '../components/WorkspaceCreateModal'
import type { ErrorMap, PackageOption, Workspace, WorkspaceForm } from '../types'

const STORAGE_KEY = 'jejaknasab-workspaces'

function getStoredWorkspaces(): Workspace[] {
  const saved = localStorage.getItem(STORAGE_KEY)
  return saved ? JSON.parse(saved) : []
}

export function PlatformOwnerDashboardPage() {
  const navigate = useNavigate()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [form, setForm] = useState<WorkspaceForm>(initialForm)
  const [errors, setErrors] = useState<ErrorMap>({})
  const [workspaces, setWorkspaces] = useState<Workspace[]>(() => getStoredWorkspaces())

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
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextList))
    closeModal()
  }

  return (
    <main className="dashboard-page">
      <section className="dashboard-shell">
        <Header title="JejakNasab" subtitle="Platform Owner Dashboard" />

        <div className="stats-grid">
          <StatCard label="Total Workspace" value={stats.total} />
          <StatCard label="Premium" value={stats.premium} />
          <StatCard label="Ultimate" value={stats.ultimate} />
        </div>

        <Button className="primary-button" onClick={openModal}>
          + Buat Workspace
        </Button>

        {workspaces.length === 0 ? (
          <EmptyState
            icon="📂"
            title="Belum ada Workspace"
            description="Tambahkan Workspace pertama untuk mulai mengelola keluarga."
          />
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
        <WorkspaceCreateModal
          form={form}
          errors={errors}
          onClose={closeModal}
          onChange={handleFieldChange}
          onSave={handleSave}
        />
      ) : null}
    </main>
  )
}
