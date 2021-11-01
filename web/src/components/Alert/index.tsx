import styles from "./styles.module.scss"

type AlertProps = {
  children: React.ReactNode
  variant: "error" | "success"
}

export function Alert({ children, variant }: AlertProps) {
  const STYLES = {
    error: styles.error,
    success: styles.success
  }

  return <div className={`${STYLES[variant]} ${styles.alert}`}>{children}</div>
}
