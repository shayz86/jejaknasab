type EmptyStateProps = {
  icon: string
  title: string
  description: string
}

export function EmptyState({ icon, title, description }: EmptyStateProps) {
  return (
    <section className="empty-state-card" aria-label="Workspace empty state">
      <div className="empty-state-card__icon">{icon}</div>
      <h2>{title}</h2>
      <p>{description}</p>
    </section>
  )
}
