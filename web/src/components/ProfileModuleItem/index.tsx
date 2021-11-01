import { SVG } from "../SVG"
import { ClassList } from "../ClassList"
import { Class } from "../../contexts/ModuleContext"
import { useOperations } from "../../contexts/OperationsContext"

import cam from "../../assets/svg/cam.svg"
import code from "../../assets/svg/code.svg"
import edit from "../../assets/svg/edit.svg"
import remove from "../../assets/svg/remove.svg"
import plus_nb from "../../assets/svg/plus_no_border.svg"

type ModuleItem = {
  module: {
    id: string
    name: string
    description: string
    classes: Class[]
  }

  zIndex: number
  styles: {
    readonly [key: string]: string
  }
}

export function ProfileModuleItem({ module, styles, zIndex }: ModuleItem) {
  const {
    operations: { addClass, editModule, removeModule }
  } = useOperations()

  return (
    <div className={styles.module} style={{ zIndex }}>
      <SVG icon={code} size={70} className={styles.codeImg} />
      <h4>{module.name}</h4>
      <footer>
        <div className={styles.classCount}>
          <SVG icon={cam} size={20} className={styles.camImg} />
          {module.classes.length}
        </div>

        <div className={styles.actionButtons}>
          <SVG
            icon={plus_nb}
            size={28}
            className={styles.camImg}
            onClick={() => addClass(module.id)}
          />
          <SVG
            icon={edit}
            size={20}
            className={styles.camImg}
            onClick={() => editModule(module.id)}
          />
          <SVG
            icon={remove}
            size={20}
            className={styles.camImg}
            onClick={() => removeModule(module.id)}
          />
        </div>
      </footer>
      <ClassList classes={module.classes} className={styles.dropdownAnim} />
    </div>
  )
}
