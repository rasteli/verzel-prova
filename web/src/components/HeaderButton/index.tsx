import { Link } from "react-router-dom"

type HeaderButtonProps = {
  path: string
  title: string
  className: string
  children: React.ReactNode
}

export function HeaderButton({
  path,
  title,
  className,
  children
}: HeaderButtonProps) {
  return (
    <div>
      <h5>{title}</h5>
      <Link className={className} to={path}>
        {children}
      </Link>
    </div>
  )
}
