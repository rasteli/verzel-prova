import { useHistory } from "react-router"

import styles from "./styles.module.scss"

import { SVG } from "../SVG"
import { useAuth } from "../../contexts/AuthContext"
import { useModule } from "../../contexts/ModuleContext"
import { ProfileModuleItem } from "../ProfileModuleItem"
import { useOperations } from "../../contexts/OperationsContext"

import plus from "../../assets/svg/plus.svg"
import logout from "../../assets/svg/logout.svg"

export function Profile() {
  const history = useHistory()
  const { signOut, user } = useAuth()
  const { profileModules } = useModule()

  const {
    operations: { addModule }
  } = useOperations()

  function handleSignOut() {
    signOut()
    history.push("/")
  }

  return (
    <div className={styles.profileContainer}>
      <header className={styles.profileHeader}>
        <h1>Bem vindo, {user?.username}!</h1>
        <button onClick={handleSignOut}>
          <SVG icon={logout} size={50} />
        </button>
      </header>

      <main className={styles.profileBody}>
        <div className={styles.headBar}>
          <h4>Aqui estão todas as suas aulas!</h4>
          <button onClick={addModule}>
            <SVG icon={plus} size={40} />
          </button>
        </div>

        <div className={styles.moduleList}>
          {profileModules?.modules.map((module, index) => (
            <ProfileModuleItem
              key={module.id}
              module={module}
              styles={styles}
              zIndex={profileModules.modules.length - index}
            />
          ))}
        </div>
      </main>
    </div>
  )
}
