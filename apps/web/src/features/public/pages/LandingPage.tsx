import { useNavigate } from 'react-router-dom'
import { Button } from '../../../components/Button'
import { Header } from '../../../components/Header'

export function LandingPage() {
  const navigate = useNavigate()

  return (
    <main className="dashboard-page">
      <section className="dashboard-shell landing-shell">
        <Header title="JejakNasab" subtitle="Family lineage platform" />

        <div className="landing-hero">
          <div className="landing-copy">
            <h1>Manage your family network with clarity.</h1>
            <p>
              Organize workspaces, assign Family Admins, and manage protected family member records in a role-based
              Cloudflare-ready platform.
            </p>
          </div>

          <div className="landing-actions">
            <Button className="primary-button" onClick={() => navigate('/login')}>
              Login
            </Button>
            <Button className="secondary-button" onClick={() => navigate('/register')}>
              Register
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
