import { useEffect, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { Button } from '../../../components/Button'
import { EmptyState } from '../../../components/EmptyState'
import { Header } from '../../../components/Header'
import { createPerson, getPersons } from '../services/personApi'
import { initialPersonForm } from '../data'
import { PersonAddModal } from '../components/PersonAddModal'
import type { Person, PersonErrorMap, PersonForm } from '../types'

export function PersonListPage() {
  const navigate = useNavigate()
  const { slug } = useParams()
  const [searchParams] = useSearchParams()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [form, setForm] = useState<PersonForm>(initialPersonForm)
  const [errors, setErrors] = useState<PersonErrorMap>({})
  const [persons, setPersons] = useState<Person[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const workspaceId = searchParams.get('workspaceId') ?? ''

  useEffect(() => {
    void loadPersons()
  }, [workspaceId])

  const loadPersons = async () => {
    setIsLoading(true)
    setErrorMessage('')

    try {
      const nextPersons = await getPersons(workspaceId)
      setPersons(nextPersons)
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Gagal memuat person.')
    } finally {
      setIsLoading(false)
    }
  }

  if (!workspaceId) {
    return (
      <main className="dashboard-page">
        <section className="dashboard-shell">
          <Header title="JejakNasab" subtitle="Person Management" />
          <p className="form-field__error">Workspace tidak valid.</p>
          <Button className="secondary-button" onClick={() => navigate(`/workspace/${slug}`)}>
            ← Kembali ke Workspace
          </Button>
        </section>
      </main>
    )
  }

  const openModal = () => {
    setForm(initialPersonForm)
    setErrors({})
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setErrors({})
    setIsModalOpen(false)
  }

  const handleFieldChange = (field: keyof PersonForm, value: string) => {
    setForm((current) => ({ ...current, [field]: value }))
    setErrors((current) => ({ ...current, [field]: undefined }))
  }

  const validateForm = () => {
    const nextErrors: PersonErrorMap = {}

    if (!form.fullName.trim()) {
      nextErrors.fullName = 'Nama lengkap wajib diisi.'
    }

    if (!form.gender.trim()) {
      nextErrors.gender = 'Gender wajib diisi.'
    }

    if (!form.livingStatus.trim()) {
      nextErrors.livingStatus = 'Status hidup wajib diisi.'
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
      const nextPerson = await createPerson(workspaceId, form)
      setPersons((current) => [nextPerson, ...current])
      closeModal()
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Gagal menyimpan person.')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <main className="dashboard-page">
      <section className="dashboard-shell">
        <Header title="JejakNasab" subtitle="Person Management" />

        <Button className="primary-button" onClick={openModal}>
          + Tambah Person
        </Button>

        {errorMessage ? <p className="form-field__error">{errorMessage}</p> : null}

        {isLoading ? (
          <EmptyState icon="⏳" title="Memuat Person" description="Mengambil data person dari server..." />
        ) : persons.length === 0 ? (
          <EmptyState
            icon="👤"
            title="Belum ada Person"
            description="Tambahkan person pertama untuk mulai mengelola anggota keluarga."
          />
        ) : (
          <section className="workspace-list">
            {persons.map((person) => (
              <div key={person.id} className="workspace-card">
                <div className="workspace-card__header">
                  <div>
                    <p className="workspace-card__label">Nama Lengkap</p>
                    <h3>{person.fullName}</h3>
                  </div>
                  <span className="workspace-card__badge">{person.livingStatus}</span>
                </div>
                <div className="workspace-card__body">
                  <div>
                    <p className="workspace-card__label">Gender</p>
                    <span>{person.gender}</span>
                  </div>
                  <div>
                    <p className="workspace-card__label">Tanggal Lahir</p>
                    <span>{person.birthDate ?? '-'}</span>
                  </div>
                  <div>
                    <p className="workspace-card__label">Tanggal Meninggal</p>
                    <span>{person.deathDate ?? '-'}</span>
                  </div>
                </div>
              </div>
            ))}
          </section>
        )}

        <Button className="secondary-button" onClick={() => navigate(`/workspace/${slug}`)}>
          ← Kembali ke Workspace
        </Button>
      </section>

      {isModalOpen ? (
        <PersonAddModal
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
