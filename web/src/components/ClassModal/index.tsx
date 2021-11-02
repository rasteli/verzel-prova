import styles from "./styles.module.scss"

import { SVG } from "../SVG"
import { Class } from "../../contexts/ModuleContext"

import clock from "../../assets/svg/clock.svg"
import terminal from "../../assets/svg/terminal.svg"

type ClassModalProps = {
  open: boolean
  moduleName: string
  classes: Class[] | null
  moduleDescription: string
  setOpen: (open: boolean) => void
}

export function ClassModal({
  open,
  classes,
  setOpen,
  moduleName,
  moduleDescription
}: ClassModalProps) {
  if (!open) return null

  return (
    <>
      <div className={styles.overlay} onClick={() => setOpen(false)} />

      <div className={styles.modal}>
        <header>
          <h1>{moduleName}</h1>
          <h4>{moduleDescription}</h4>
        </header>

        <main>
          {classes?.map(lesson => (
            <div key={lesson.id} className={styles.class}>
              <SVG icon={terminal} size={100} />
              <div className={styles.classInfo}>
                <h3>{lesson.name}</h3>
                <h5>{lesson.description}</h5>
              </div>

              <footer className={styles.classDate}>
                <SVG icon={clock} size={20} />
                <p>{lesson.begins_at}</p>
              </footer>
            </div>
          ))}
        </main>
      </div>
    </>
  )
}
