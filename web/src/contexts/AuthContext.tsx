import { useContext, useEffect, useState, createContext } from "react"

import { api } from "../services/api"

type AuthProviderProps = {
  children: React.ReactNode
}

type User = {
  id: string
  username: string
  email: string
  password: string
}

type AuthResponse = {
  token: string
  user: User
}

type ResetResponse = {
  message: string
}

type AuthContextData = {
  user: User | null
  signOut: () => void
  logIn: (email: string, password: string) => Promise<void>
  sendResetEmail: (email: string) => Promise<ResetResponse>
  resetPassword: (user_id: string, password: string) => Promise<void>
  signUp: (username: string, email: string, password: string) => Promise<void>
}

const AuthContext = createContext({} as AuthContextData)

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    async function setUserIfToken() {
      const token = localStorage.getItem("@verzel:token")

      if (token) {
        api.defaults.headers.common.authorization = `Bearer ${token}`

        const response = await api.get<AuthResponse>("/profile")

        setUser(response.data.user)
      }
    }

    setUserIfToken()
  }, []) // -> first render

  async function authenticateUser(route: string, body: object) {
    const response = await api.post<AuthResponse>(route, body)

    const { token, user } = response.data

    setUser(user)
    localStorage.setItem("@verzel:token", token)
  }

  async function signUp(username: string, email: string, password: string) {
    await authenticateUser("/signup", {
      username,
      email,
      password
    })
  }

  async function logIn(email: string, password: string) {
    await authenticateUser("/login", { email, password })
  }

  async function resetPassword(user_id: string, password: string) {
    await authenticateUser("/reset-password", { user_id, password })
  }

  async function sendResetEmail(email: string) {
    const response = await api.post<ResetResponse>("/send-reset", { email })

    return response.data
  }

  function signOut() {
    setUser(null)
    localStorage.removeItem("@verzel:token")
  }

  const value: AuthContextData = {
    user,
    logIn,
    signUp,
    signOut,
    resetPassword,
    sendResetEmail
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
