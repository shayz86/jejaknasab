import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../../components/Button'
import { Card } from '../../../components/Card'
import { Header } from '../../../components/Header'
import { loginUser } from '../services/authService'

export function OwnerLoginPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('owner@jejaknasab.dev')
  const [password, setPassword] = useState('owner123')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setErrorMessage('')

    try {
      const session = loginUser(email, password)

      if (session.role !== 'owner') {
        throw new Error('Akses platform owner hanya untuk akun owner.')
      }

      navigate('/owner', { replace: true })
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Gagal masuk.')
    }
  }

  return (
    <main className="dashboard-page">
      <section className="dashboard-shell">
        <Card className="modal-card">
          <Header title="JejakNasab" subtitle="Login Platform Owner" />

          <form className="form-grid" onSubmit={handleSubmit}>
            <label className="field">
              <span>Email</span>
              <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
            </label>

            <label className="field">
              <span>Password</span>
              <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
            </label>

            {errorMessage ? <small className="form-field__error">{errorMessage}</small> : null}

            <div className="modal-actions">
              <Button className="primary-button" type="submit">
                Login
              </Button>
            </div>
          </form>
        </Card>
      </section>
    </main>
  )
}
