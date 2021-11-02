import { io } from "socket.io-client"
import { useContext, useEffect, useState, createContext } from "react"

import { api } from "../services/api"
import { useAuth } from "./AuthContext"

type ModuleProviderProps = {
  children: React.ReactNode
}

export type Class = {
  id: string
  name: string
  begins_at: string
  description: string
}

type Module = {
  modules: [
    {
      id: string
      name: string
      description: string
      classes: Class[]
    }
  ]
}

type Methods = {
  setModuleName: (name: string) => void
  deleteClass: (class_id: string) => Promise<void>
  deleteModule: (module_id: string) => Promise<void>
  createModule: (name: string, description: string) => Promise<void>

  createClass: (
    name: string,
    desc: string,
    begins_at: string,
    module_id: string
  ) => Promise<void>

  updateModule: (
    module_id: string,
    name?: string,
    description?: string
  ) => Promise<void>

  updateClass: (
    class_id: string,
    name?: string,
    desc?: string,
    begins_at?: string
  ) => Promise<void>
}

type ModuleContextData = {
  modules: Module | null
  profileModules: Module | null
  methods: Methods
}

const socket = io("http://localhost:3333")
const ModuleContext = createContext({} as ModuleContextData)

export function useModule() {
  return useContext(ModuleContext)
}

export function ModuleProvider({ children }: ModuleProviderProps) {
  const { user } = useAuth()

  const [name, setName] = useState("")
  const [modules, setModules] = useState<Module | null>(null)
  const [profileModules, setProfileModules] = useState<Module | null>(null)

  function setTimer(interval: number, listener: (...args: any[]) => void) {
    return setInterval(() => {
      socket.on("changed_db", listener)
    }, interval)
  }

  useEffect(() => {
    async function setModulesWithoutAuth() {
      const response = await api.get<Module>("/modules")
      const modules = response.data

      // @ts-ignore
      setModules(() => {
        if (!name) return modules // se não há texto de busca, retorna todos os módulos

        const filterredModules = modules.modules.filter(module => {
          return module.name.startsWith(name)
        })

        // retorna os módulos cujos nomes começam com o texto digitado na caixa de busca
        return { modules: filterredModules }
      })
    }

    setModulesWithoutAuth()

    const timer = setTimer(2000, setModulesWithoutAuth)
    return () => clearInterval(timer)
  }, [name])

  useEffect(() => {
    async function setModulesWithAuth() {
      const response = await api.get<Module>(`/modules?user_id=${user?.id}`)

      setProfileModules(response.data)
    }

    if (user) {
      setModulesWithAuth()

      const timer = setTimer(2000, setModulesWithAuth)
      return () => clearInterval(timer)
    }
  }, [user])

  async function createModule(name: string, description: string) {
    await api.post("/module", { name, description })
  }

  async function createClass(
    name: string,
    description: string,
    begins_at: string,
    module_id: string
  ) {
    await api.post("/class", { name, description, begins_at, module_id })
  }

  async function updateModule(
    module_id: string,
    name?: string,
    description?: string
  ) {
    await api.put("/module", { module_id, data: { name, description } })
  }

  async function updateClass(
    class_id: string,
    name?: string,
    description?: string,
    begins_at?: string
  ) {
    await api.put("/class", {
      class_id,
      data: { name, description, begins_at }
    })
  }

  async function deleteClass(class_id: string) {
    await api.delete(`/class/${class_id}`)
  }

  async function deleteModule(module_id: string) {
    await api.delete(`/module/${module_id}`)
  }

  const value: ModuleContextData = {
    modules,
    profileModules,

    methods: {
      createModule,
      createClass,
      updateModule,
      updateClass,
      deleteClass,
      deleteModule,
      setModuleName: setName
    }
  }

  return (
    <ModuleContext.Provider value={value}>{children}</ModuleContext.Provider>
  )
}
