import type { Workspace } from '../types'

type WorkspaceCardProps = Workspace & {
  onClick: () => void
}

export function WorkspaceCard({ namaKeluarga, paket, familyAdmin, email, status, onClick }: WorkspaceCardProps) {
  return (
    <button type="button" className="workspace-card" onClick={onClick}>
      <div className="workspace-card__header">
        <div>
          <p className="workspace-card__label">Nama Keluarga</p>
          <h3>{namaKeluarga}</h3>
        </div>
        <span className="workspace-card__badge">{paket}</span>
      </div>

      <div className="workspace-card__body">
        <div>
          <p className="workspace-card__label">Family Admin</p>
          <span>{familyAdmin}</span>
        </div>
        <div>
          <p className="workspace-card__label">Email</p>
          <span>{email}</span>
        </div>
        <div>
          <p className="workspace-card__label">Status</p>
          <span>{status}</span>
        </div>
      </div>
    </button>
  )
}
