type SVGProps = {
  icon: string
  size: number
  className?: string
  onClick?: React.MouseEventHandler
}

export function SVG({ icon, size, className, onClick }: SVGProps) {
  return (
    <img
      src={icon}
      style={{ width: size, height: size }}
      className={className}
      onClick={onClick}
      alt=""
    />
  )
}
