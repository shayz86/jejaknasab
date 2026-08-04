type QuickActionCardProps = {
  icon: string
  title: string
  onClick?: () => void
}

export function QuickActionCard({ icon, title, onClick }: QuickActionCardProps) {
  return (
    <button type="button" className="action-card" onClick={onClick}>
      <div className="action-card__icon">{icon}</div>
      <span>{title}</span>
    </button>
  )
}
