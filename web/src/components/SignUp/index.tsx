import React, { useState } from "react"

import styles from "../AuthenticationForm/styles.module.scss"

import { SVG } from "../SVG"
import { Alert } from "../Alert"
import { useAuth } from "../../contexts/AuthContext"

import emailIcon from "../../assets/svg/email.svg"
import padlock from "../../assets/svg/padlock.svg"
import userForm from "../../assets/svg/user_form.svg"

export type AuthProps = {
  toggleSignUp: React.Dispatch<React.SetStateAction<boolean>>
}

export function SignUp({ toggleSignUp }: AuthProps) {
  const { signUp } = useAuth()

  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  async function handleSumbit(e: React.FormEvent) {
    e.preventDefault()

    if (!email || !username || !password) return

    try {
      await signUp(username, email, password)

      setEmail("")
      setUsername("")
      setPassword("")
    } catch (error: any) {
      setError(error.response.data.error)
    }
  }

  return (
    <>
      <h1>
        Crie sua conta e <br /> comece a ensinar!
      </h1>

      {error && <Alert variant="error">{error}</Alert>}

      <form onSubmit={handleSumbit}>
        <div className={styles.inputField}>
          <SVG icon={userForm} size={25} className={styles.usernameImg} />
          <input
            type="text"
            placeholder="Nome"
            required
            onChange={e => setUsername(e.target.value)}
          />
        </div>

        <div className={styles.inputField}>
          <SVG icon={emailIcon} size={27} className={styles.emailImg} />
          <input
            type="email"
            placeholder="Email"
            required
            onChange={e => setEmail(e.target.value)}
          />
        </div>

        <div className={styles.inputField}>
          <SVG icon={padlock} size={25} className={styles.passwordImg} />
          <input
            type="password"
            placeholder="Senha"
            required
            onChange={e => setPassword(e.target.value)}
          />
        </div>

        <button type="submit">CADASTRAR</button>
      </form>

      <footer>
        <span className={styles.question}>Já tem uma conta?</span>
        <button className={styles.action} onClick={() => toggleSignUp(false)}>
          Faça login
        </button>
      </footer>
    </>
  )
}
