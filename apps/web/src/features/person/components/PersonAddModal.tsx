import { Button } from '../../../components/Button'
import { Card } from '../../../components/Card'
import type { PersonErrorMap, PersonForm } from '../types'

type PersonAddModalProps = {
  form: PersonForm
  errors: PersonErrorMap
  onClose: () => void
  onChange: (field: keyof PersonForm, value: string) => void
  onSave: () => void
  isSaving?: boolean
}

export function PersonAddModal({ form, errors, onClose, onChange, onSave, isSaving = false }: PersonAddModalProps) {
  return (
    <div className="modal-overlay" role="presentation">
      <Card className="modal-card">
        <h2 id="modal-title">Tambah Anggota Keluarga</h2>

        <div className="form-grid">
          <label className="field">
            <span>Nama Lengkap</span>
            <input value={form.fullName} onChange={(event) => onChange('fullName', event.target.value)} />
            {errors.fullName ? <small>{errors.fullName}</small> : null}
          </label>

          <label className="field">
            <span>Gender</span>
            <input value={form.gender} onChange={(event) => onChange('gender', event.target.value)} />
            {errors.gender ? <small>{errors.gender}</small> : null}
          </label>

          <label className="field">
            <span>Tanggal Lahir</span>
            <input type="date" value={form.birthDate} onChange={(event) => onChange('birthDate', event.target.value)} />
            {errors.birthDate ? <small>{errors.birthDate}</small> : null}
          </label>

          <label className="field">
            <span>Tanggal Meninggal</span>
            <input type="date" value={form.deathDate} onChange={(event) => onChange('deathDate', event.target.value)} />
            {errors.deathDate ? <small>{errors.deathDate}</small> : null}
          </label>

          <label className="field">
            <span>Status Hidup</span>
            <input value={form.livingStatus} onChange={(event) => onChange('livingStatus', event.target.value)} />
            {errors.livingStatus ? <small>{errors.livingStatus}</small> : null}
          </label>

          <label className="field">
            <span>Photo URL</span>
            <input value={form.photoUrl} onChange={(event) => onChange('photoUrl', event.target.value)} />
            {errors.photoUrl ? <small>{errors.photoUrl}</small> : null}
          </label>
        </div>

        <div className="modal-actions">
          <Button className="secondary-button" onClick={onClose}>
            Batal
          </Button>
          <Button className="primary-button" onClick={onSave} disabled={isSaving}>
            {isSaving ? 'Menyimpan...' : 'Simpan Person'}
          </Button>
        </div>
      </Card>
    </div>
  )
}
