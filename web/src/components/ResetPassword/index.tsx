import React, { useState } from "react"
import { useParams, useHistory } from "react-router"

import { SVG } from "../SVG"
import { Alert } from "../Alert"
import { useAuth } from "../../contexts/AuthContext"

// import styles from "./styles.module.scss"
import padlock from "../../assets/svg/padlock.svg"
import styles from "./styles.module.scss"

export function ResetPassword() {
  const history = useHistory()
  const { resetPassword } = useAuth()
  const { userId } = useParams<{ userId: string }>()
  console.log(userId)

  const [error, setError] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!password && !confirmPassword) return
    if (password !== confirmPassword)
      return setError("As senhas não coincidem!")

    try {
      setError("")

      await resetPassword(userId, password)

      history.push("/")
    } catch (error: any) {
      setError(error.response.data.error)
    }
  }

  return (
    <div className={styles.resetContainer}>
      <h1>Insira sua nova senha</h1>

      {error && <Alert variant="error">{error}</Alert>}

      <form onSubmit={handleSubmit}>
        <div className={styles.inputField}>
          <SVG icon={padlock} size={27} className={styles.passwordImg} />
          <input
            type="password"
            placeholder="Nova senha"
            required
            onChange={e => setPassword(e.target.value)}
          />
        </div>

        <div className={styles.inputField}>
          <SVG icon={padlock} size={25} className={styles.passwordImg} />
          <input
            type="password"
            placeholder="Confirmar senha"
            required
            onChange={e => setConfirmPassword(e.target.value)}
          />
        </div>

        <button type="submit">CONFIRMAR</button>
      </form>
    </div>
  )
}
