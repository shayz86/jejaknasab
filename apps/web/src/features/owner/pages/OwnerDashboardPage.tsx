import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../../components/Button'
import { EmptyState } from '../../../components/EmptyState'
import { Header } from '../../../components/Header'
import { StatCard } from '../../../components/StatCard'
import { createWorkspace, getWorkspaces } from '../../../services/workspaceApi'
import { initialForm } from '../../platform/data'
import { WorkspaceCard } from '../../platform/components/WorkspaceCard'
import { WorkspaceCreateModal } from '../../platform/components/WorkspaceCreateModal'
import type { ErrorMap, PackageOption, Workspace, WorkspaceForm } from '../../platform/types'

export function OwnerDashboardPage() {
  const navigate = useNavigate()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [form, setForm] = useState<WorkspaceForm>(initialForm)
  const [errors, setErrors] = useState<ErrorMap>({})
  const [workspaces, setWorkspaces] = useState<Workspace[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    void loadWorkspaces()
  }, [])

  const loadWorkspaces = async () => {
    setIsLoading(true)
    setErrorMessage('')

    try {
      const nextWorkspaces = await getWorkspaces()
      setWorkspaces(nextWorkspaces)
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Gagal memuat workspace.')
    } finally {
      setIsLoading(false)
    }
  }

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

  const handleSave = async () => {
    if (!validateForm()) {
      return
    }

    setIsSaving(true)
    setErrorMessage('')

    try {
      const newWorkspace = await createWorkspace({
        ...form,
        namaKeluarga: form.namaKeluarga.trim(),
        slug: form.slug.trim(),
        familyAdmin: form.familyAdmin.trim(),
        email: form.email.trim(),
        paket: form.paket as PackageOption,
      })

      setWorkspaces((current) => [newWorkspace, ...current])
      closeModal()
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Gagal menyimpan workspace.')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <main className="dashboard-page">
      <section className="dashboard-shell">
        <Header title="JejakNasab" subtitle="Owner Dashboard" />

        <div className="stats-grid">
          <StatCard label="Total Workspace" value={stats.total} />
          <StatCard label="Premium" value={stats.premium} />
          <StatCard label="Ultimate" value={stats.ultimate} />
        </div>

        <Button className="primary-button" onClick={openModal}>
          + Buat Workspace
        </Button>

        {errorMessage ? <p className="form-field__error">{errorMessage}</p> : null}

        {isLoading ? (
          <EmptyState icon="⏳" title="Memuat Workspace" description="Mengambil data workspace dari server..." />
        ) : workspaces.length === 0 ? (
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
          isSaving={isSaving}
        />
      ) : null}
    </main>
  )
}
