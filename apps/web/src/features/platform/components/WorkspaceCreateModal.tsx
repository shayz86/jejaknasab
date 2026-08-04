import { Button } from '../../../components/Button'
import { Card } from '../../../components/Card'
import type { ErrorMap, WorkspaceForm } from '../types'

type WorkspaceCreateModalProps = {
  form: WorkspaceForm
  errors: ErrorMap
  onClose: () => void
  onChange: (field: keyof WorkspaceForm, value: string) => void
  onSave: () => void
}

export function WorkspaceCreateModal({ form, errors, onClose, onChange, onSave }: WorkspaceCreateModalProps) {
  return (
    <div className="modal-overlay" role="presentation">
      <Card className="modal-card">
        <h2 id="modal-title">Buat Workspace Baru</h2>

        <div className="form-grid">
          <label className="field">
            <span>Nama Keluarga</span>
            <input value={form.namaKeluarga} onChange={(event) => onChange('namaKeluarga', event.target.value)} />
            {errors.namaKeluarga ? <small>{errors.namaKeluarga}</small> : null}
          </label>

          <label className="field">
            <span>Slug</span>
            <input value={form.slug} onChange={(event) => onChange('slug', event.target.value)} />
            {errors.slug ? <small>{errors.slug}</small> : null}
          </label>

          <label className="field">
            <span>Nama Family Admin</span>
            <input value={form.familyAdmin} onChange={(event) => onChange('familyAdmin', event.target.value)} />
            {errors.familyAdmin ? <small>{errors.familyAdmin}</small> : null}
          </label>

          <label className="field">
            <span>Email</span>
            <input type="email" value={form.email} onChange={(event) => onChange('email', event.target.value)} />
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
                onChange={(event) => onChange('paket', event.target.value)}
              />
              <span>Premium</span>
            </label>
            <label>
              <input
                type="radio"
                name="paket"
                value="Ultimate"
                checked={form.paket === 'Ultimate'}
                onChange={(event) => onChange('paket', event.target.value)}
              />
              <span>Ultimate</span>
            </label>
            {errors.paket ? <small>{errors.paket}</small> : null}
          </fieldset>
        </div>

        <div className="modal-actions">
          <Button className="secondary-button" onClick={onClose}>
            Batal
          </Button>
          <Button className="primary-button" onClick={onSave}>
            Simpan Workspace
          </Button>
        </div>
      </Card>
    </div>
  )
}
