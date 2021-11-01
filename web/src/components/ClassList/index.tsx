import styles from "./styles.module.scss"

import { SVG } from "../SVG"
import { Class } from "../../contexts/ModuleContext"
import { useOperations } from "../../contexts/OperationsContext"

import edit from "../../assets/svg/edit.svg"
import clock from "../../assets/svg/clock.svg"
import remove from "../../assets/svg/remove.svg"
import terminal from "../../assets/svg/terminal.svg"

type ClassListProps = {
  className: string
  classes: Class[]
}

export function ClassList({ classes, className }: ClassListProps) {
  const {
    operations: { editClass, removeClass }
  } = useOperations()

  return (
    <ul className={`${styles.dropdown} ${styles.dropdown_6} ${className}`}>
      {classes.map(lesson => (
        <li key={lesson.id}>
          <div className={styles.class}>
            <SVG icon={terminal} size={80} />
            <div className={styles.classInfo}>
              <h3>{lesson.name}</h3>
              <h5>{lesson.description}</h5>
            </div>

            <div className={styles.classActionButtons}>
              <SVG
                icon={edit}
                size={20}
                className={styles.camImg}
                onClick={() => editClass(lesson.id)}
              />
              <SVG
                icon={remove}
                size={20}
                className={styles.camImg}
                onClick={() => removeClass(lesson.id)}
              />
            </div>

            <div className={styles.classDate}>
              <SVG icon={clock} size={20} />
              <p>{lesson.begins_at}</p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}
