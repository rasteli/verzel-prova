import { useState } from "react"

import { SVG } from "../SVG"
import { ClassModal } from "../ClassModal"
import { HeaderButton } from "../HeaderButton"
import { useAuth } from "../../contexts/AuthContext"
import { Class, useModule } from "../../contexts/ModuleContext"

import styles from "./styles.module.scss"
import cam from "../../assets/svg/cam.svg"
import code from "../../assets/svg/code.svg"
import search from "../../assets/svg/search.svg"
import userPhoto from "../../assets/svg/user.svg"

export function Dashboard() {
  const { user } = useAuth()
  const { modules, methods } = useModule()

  const [open, setOpen] = useState(false)
  const [moduleDesc, setModuleDesc] = useState("")
  const [moduleName, setModuleName] = useState("")
  const [classes, setClasses] = useState<Class[] | null>(null)

  function openModal(classes: Class[], desc: string, name: string) {
    setOpen(true)
    setModuleDesc(desc)
    setModuleName(name)
    setClasses(classes)
  }

  return (
    <>
      <header className={styles.headerContainer}>
        <h1>APP TITLE</h1>

        {!user ? (
          <HeaderButton
            path="/auth"
            title={"Tem algo a ensinar?"}
            className={styles.signButton}
          >
            CADASTRE-SE
          </HeaderButton>
        ) : (
          <HeaderButton
            title={"Perfil"}
            path="/profile"
            className={styles.profileButton}
          >
            <SVG icon={userPhoto} size={50} />
          </HeaderButton>
        )}
      </header>

      <main className={styles.dashboardContainer}>
        <div className={styles.searchBox}>
          <SVG icon={search} size={24} />
          <input
            type="search"
            placeholder="Buscar por módulo"
            onChange={e => methods.setModuleName(e.target.value)}
          />
        </div>

        <div className={styles.moduleHelp}>
          <h3>Módulos</h3>
          <p>Escolha o módulo para visualizar as aulas</p>
        </div>
      </main>
      <div className={styles.moduleGrid}>
        {/* apenas renderiza módulos que têm aulas */}
        {modules?.modules.map(
          module =>
            module.classes.length > 0 && (
              <div
                key={module.id}
                className={styles.module}
                onClick={() =>
                  openModal(module.classes, module.description, module.name)
                }
              >
                <SVG icon={code} size={70} className={styles.codeImg} />
                <h4>{module.name}</h4>
                <footer>
                  <SVG icon={cam} size={20} className={styles.camImg} />
                  {module.classes.length}
                </footer>
              </div>
            )
        )}
      </div>

      <ClassModal
        description={moduleDesc}
        name={moduleName}
        classes={classes}
        open={open}
        setOpen={setOpen}
      />
    </>
  )
}
