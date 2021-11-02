import React, { useState } from "react"

import styles from "./styles.module.scss"
import formStyles from "../AuthenticationForm/styles.module.scss"

import { SVG } from "../SVG"
import { Alert } from "../Alert"
import { useAuth } from "../../contexts/AuthContext"

import emailIcon from "../../assets/svg/email.svg"

export type ForgotPWDProps = {
  toggleLogin: React.Dispatch<React.SetStateAction<boolean>>
}

export function ForgotPassword({ toggleLogin }: ForgotPWDProps) {
  const { sendResetEmail } = useAuth()
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!email) return

    try {
      setError("")
      setLoading(true)

      const response = await sendResetEmail(email)

      setSuccess(response.message)
    } catch (error: any) {
      setSuccess("")
      setError(error.response.data.error)
    }

    setEmail("")
    setLoading(false)
  }

  return (
    <div className={styles.forgotContainer}>
      <div className={styles.text}>
        <h1>Recupere sua senha</h1>

        <p>
          Insira seu email e enviaremos as instruções para que você possa
          recuperar sua senha
          <em> (se não achá-lo, cheque sua caixa de spam)!</em>
        </p>
      </div>

      {error && <Alert variant="error">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      <form onSubmit={handleSubmit}>
        <div className={formStyles.inputField}>
          <SVG icon={emailIcon} size={27} className={formStyles.emailImg} />
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>

        <button type="submit" disabled={loading}>
          ENVIAR
        </button>
      </form>

      <footer>
        <span className={formStyles.question}>Lembrou sua senha?</span>
        <button className={formStyles.action} onClick={() => toggleLogin(true)}>
          Faça login
        </button>
      </footer>
    </div>
  )
}
