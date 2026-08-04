type QuickActionCardProps = {
  icon: string
  title: string
}

export function QuickActionCard({ icon, title }: QuickActionCardProps) {
  return (
    <div className="action-card">
      <div className="action-card__icon">{icon}</div>
      <span>{title}</span>
    </div>
  )
}
