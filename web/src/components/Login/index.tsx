import React, { useState } from "react"
import { useHistory } from "react-router"

import styles from "./styles.module.scss"
import formStyles from "../AuthenticationForm/styles.module.scss"

import { SVG } from "../SVG"
import { Alert } from "../Alert"
import { AuthProps } from "../SignUp"
import { ForgotPWDProps } from "../ForgotPassword"
import { useAuth } from "../../contexts/AuthContext"

import emailIcon from "../../assets/svg/email.svg"
import padlock from "../../assets/svg/padlock.svg"

type LoginProps = AuthProps & ForgotPWDProps

export function Login({ toggleSignUp, toggleLogin }: LoginProps) {
  const { logIn } = useAuth()
  const history = useHistory()

  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [password, setPassword] = useState("")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!email || !password) return

    try {
      await logIn(email, password)

      setEmail("")
      setPassword("")

      history.push("/")
    } catch (error: any) {
      setError(error.response.data.error)
    }
  }

  return (
    <>
      <h1>Entre na sua conta</h1>

      {error && <Alert variant="error">{error}</Alert>}

      <form onSubmit={handleSubmit}>
        <div className={formStyles.inputField}>
          <SVG icon={emailIcon} size={27} className={formStyles.emailImg} />
          <input
            type="email"
            placeholder="Email"
            required
            onChange={e => setEmail(e.target.value)}
          />
        </div>

        <div className={formStyles.inputField}>
          <SVG icon={padlock} size={25} className={formStyles.passwordImg} />
          <input
            type="password"
            placeholder="Senha"
            required
            onChange={e => setPassword(e.target.value)}
          />
        </div>

        <button
          className={styles.forgotPassword}
          onClick={() => toggleLogin(false)}
        >
          Esqueceu sua senha?
        </button>

        <button type="submit">ENTRAR</button>
      </form>

      <footer>
        <span className={formStyles.question}>Não tem uma conta?</span>
        <button
          className={formStyles.action}
          onClick={() => toggleSignUp(true)}
        >
          Crie sua conta
        </button>
      </footer>
    </>
  )
}
