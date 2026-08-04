import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../../components/Button'
import { Card } from '../../../components/Card'
import { getRoleRedirect, registerUser } from '../services/authService'

export function RegisterPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    familyName: '',
    assignedWorkspaceSlug: '',
    packageName: 'Premium' as 'Premium' | 'Ultimate',
  })
  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = (field: keyof typeof form, value: string) => {
    setForm((current) => ({ ...current, [field]: value }))
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setErrorMessage('')

    try {
      const session = registerUser({
        ...form,
        fullName: form.fullName,
        email: form.email,
        password: form.password,
        confirmPassword: form.confirmPassword,
        familyName: form.familyName,
        assignedWorkspaceSlug: form.assignedWorkspaceSlug,
        packageName: form.packageName,
      })
      navigate(getRoleRedirect(session.role, session.assignedWorkspaceSlug))
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Gagal mendaftar.')
    }
  }

  return (
    <main className="dashboard-page">
      <section className="dashboard-shell">
        <Card className="modal-card">
          <h2>Daftar</h2>
          <form className="form-grid" onSubmit={handleSubmit}>
            <label className="field">
              <span>Nama Lengkap</span>
              <input value={form.fullName} onChange={(event) => handleChange('fullName', event.target.value)} />
            </label>

            <label className="field">
              <span>Email</span>
              <input type="email" value={form.email} onChange={(event) => handleChange('email', event.target.value)} />
            </label>

            <label className="field">
              <span>Password</span>
              <input type="password" value={form.password} onChange={(event) => handleChange('password', event.target.value)} />
            </label>

            <label className="field">
              <span>Konfirmasi Password</span>
              <input type="password" value={form.confirmPassword} onChange={(event) => handleChange('confirmPassword', event.target.value)} />
            </label>

            <label className="field">
              <span>Nama Keluarga</span>
              <input value={form.familyName} onChange={(event) => handleChange('familyName', event.target.value)} />
            </label>

            <label className="field">
              <span>Alamat Keluarga (workspace slug)</span>
              <input value={form.assignedWorkspaceSlug} onChange={(event) => handleChange('assignedWorkspaceSlug', event.target.value)} />
            </label>

            <label className="field">
              <span>Paket</span>
              <select value={form.packageName} onChange={(event) => handleChange('packageName', event.target.value)}>
                <option value="Premium">Premium</option>
                <option value="Ultimate">Ultimate</option>
              </select>
            </label>

            {errorMessage ? <small className="form-field__error">{errorMessage}</small> : null}

            <div className="modal-actions">
              <Button className="secondary-button" onClick={() => navigate('/login')}>
                Masuk
              </Button>
              <Button className="primary-button" type="submit">
                Daftar
              </Button>
            </div>
          </form>
        </Card>
      </section>
    </main>
  )
}
