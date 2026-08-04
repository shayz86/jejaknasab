type HeaderProps = {
  title: string
  subtitle: string
}

export function Header({ title, subtitle }: HeaderProps) {
  return (
    <>
      <p className="dashboard-title">{title}</p>
      <h1 className="dashboard-subtitle">{subtitle}</h1>
    </>
  )
}
