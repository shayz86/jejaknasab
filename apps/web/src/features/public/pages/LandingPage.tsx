import { useNavigate } from 'react-router-dom'
import { Button } from '../../../components/Button'
import { Header } from '../../../components/Header'

const features = [
  {
    title: 'Silsilah digital aman',
    description: 'Ramah untuk keluarga, tetap aman untuk data sensitif dan catatan generasi.',
  },
  {
    title: 'Berbagi dengan mudah',
    description: 'Tambah anggota keluarga dan bagikan jejak genealogis tanpa ribet.',
  },
  {
    title: 'Dapat diwariskan',
    description: 'Mendukung warisan pengetahuan yang bisa dilanjutkan dari generasi ke generasi.',
  },
]

const faqs = [
  {
    question: 'Apakah JejakNasab cocok untuk keluarga besar?',
    answer: 'Ya. Platform ini dirancang untuk memudahkan satu keluarga mengelola silsilah, catatan penting, dan kesinambungan data secara terstruktur.',
  },
  {
    question: 'Apakah saya bisa mulai dengan paket yang sesuai?',
    answer: 'Tersedia paket Premium dan Ultimate, sehingga keluarga bisa memilih skala kebutuhan dan fitur yang paling cocok.',
  },
  {
    question: 'Apakah data keluarga aman?',
    answer: 'JejakNasab berfokus pada keamanan data keluarga, arsitektur Cloudflare Pages + D1, dan pengalaman yang mudah dipelihara.',
  },
]

export function LandingPage() {
  const navigate = useNavigate()

  return (
    <main className="dashboard-page">
      <section className="dashboard-shell landing-shell">
        <Header title="JejakNasab" subtitle="Menjaga Jejak, Menghubungkan Generasi" />

        <div className="landing-hero">
          <div className="landing-copy">
            <p className="eyebrow">Platform genealogis multi-tenant</p>
            <h1>Bangun silsilah keluarga digital yang aman, mudah dibagikan, dan dapat diwariskan kepada generasi berikutnya.</h1>
            <p>
              JejakNasab membantu keluarga membangun jejak generasi secara terorganisir: dari data utama, silsilah,
              hingga akses yang aman untuk peran keluarga admin.
            </p>
          </div>

          <div className="landing-actions">
            <Button className="primary-button" onClick={() => navigate('/login')}>
              Masuk
            </Button>
            <Button className="secondary-button" onClick={() => navigate('/register')}>
              Daftar
            </Button>
          </div>
        </div>

        <section className="marketing-section">
          <div className="section-heading section-heading--left">
            <h2>Fitur unggulan</h2>
          </div>

          <div className="feature-grid">
            {features.map((feature) => (
              <article key={feature.title} className="feature-card">
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="marketing-section">
          <div className="section-heading section-heading--left">
            <h2>Harga</h2>
          </div>

          <div className="price-grid">
            <article className="price-card">
              <p className="price-card__label">Premium</p>
              <h3>Untuk keluarga yang ingin mulai hadir secara rapi dan konsisten.</h3>
              <ul>
                <li>Kelola silsilah dasar</li>
                <li>Catatan keluarga terstruktur</li>
                <li>Access admin yang aman</li>
              </ul>
            </article>

            <article className="price-card price-card--featured">
              <p className="price-card__label">Ultimate</p>
              <h3>Untuk kebutuhan warisan keluarga yang lebih luas dan premium.</h3>
              <ul>
                <li>Semua fitur Premium</li>
                <li>Ruang keluarga yang lebih ekspansif</li>
                <li>Prioritas dukungan dan pengalaman kelas atas</li>
              </ul>
            </article>
          </div>
        </section>

        <section className="marketing-section">
          <div className="section-heading section-heading--left">
            <h2>FAQ</h2>
          </div>

          <div className="faq-list">
            {faqs.map((faq) => (
              <details key={faq.question} className="faq-item" open={faq.question === 'Apakah JejakNasab cocok untuk keluarga besar?'}>
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <footer className="footer-card">
          <p className="dashboard-title footer-title">JejakNasab</p>
          <p>Menjaga Jejak, Menghubungkan Generasi</p>
        </footer>
      </section>
    </main>
  )
}
