import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../../components/Button'
import { Card } from '../../../components/Card'
import { getRoleRedirect, registerUser } from '../services/authService'
import type { UserRole } from '../types'

export function RegisterPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    password: '',
    role: 'owner' as UserRole,
    assignedWorkspaceSlug: '',
  })
  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = (field: keyof typeof form, value: string) => {
    setForm((current) => ({ ...current, [field]: value }))
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setErrorMessage('')

    try {
      const session = registerUser(form)
      navigate(getRoleRedirect(session.role, session.assignedWorkspaceSlug))
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Gagal mendaftar.')
    }
  }

  return (
    <main className="dashboard-page">
      <section className="dashboard-shell">
        <Card className="modal-card">
          <h2>Register</h2>
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
              <span>Role</span>
              <select value={form.role} onChange={(event) => handleChange('role', event.target.value)}>
                <option value="owner">Owner</option>
                <option value="family_admin">Family Admin</option>
                <option value="member">Member</option>
              </select>
            </label>

            <label className="field">
              <span>Assigned Workspace Slug</span>
              <input value={form.assignedWorkspaceSlug} onChange={(event) => handleChange('assignedWorkspaceSlug', event.target.value)} />
            </label>

            {errorMessage ? <small className="form-field__error">{errorMessage}</small> : null}

            <div className="modal-actions">
              <Button className="secondary-button" onClick={() => navigate('/login')}>
                Login
              </Button>
              <Button className="primary-button" type="submit">
                Register
              </Button>
            </div>
          </form>
        </Card>
      </section>
    </main>
  )
}
