import React, { useContext, useState, createContext } from "react"

import { useModule } from "./ModuleContext"
import { type, modal } from "../components/ProfileOperationsModal"

type OperationsProviderProps = {
  children: React.ReactNode
}

type Props = {
  id: string
  open: boolean
  type: type
  modal: modal
}

type Operations = {
  addModule: () => void
  addClass: (id: string) => void
  editClass: (id: string) => void
  editModule: (id: string) => void
  removeClass: (id: string) => void
  removeModule: (id: string) => void
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

type OperationsContextData = {
  props: Props
  operations: Operations
}

const OperationContext = createContext({} as OperationsContextData)

export function useOperations() {
  return useContext(OperationContext)
}

export function OperationsProvider({ children }: OperationsProviderProps) {
  const { methods } = useModule()

  const [id, setId] = useState("")
  const [open, setOpen] = useState(false)
  const [type, setType] = useState<type>("create")
  const [modal, setModal] = useState<modal>("module")

  function setModalProps(
    type: type,
    modal: modal,
    open: boolean,
    id: string = ""
  ) {
    setId(id)
    setType(type)
    setModal(modal)
    setOpen(open)
  }

  function addModule() {
    setModalProps("create", "module", true)
  }

  function addClass(id: string) {
    setModalProps("create", "class", true, id)
  }

  function editModule(id: string) {
    setModalProps("update", "module", true, id)
  }

  function editClass(id: string) {
    setModalProps("update", "class", true, id)
  }

  async function removeClass(id: string) {
    await methods.deleteClass(id)
  }

  async function removeModule(id: string) {
    await methods.deleteModule(id)
  }

  const value: OperationsContextData = {
    props: {
      id,
      open,
      type,
      modal
    },

    operations: {
      setOpen,
      addClass,
      addModule,
      editClass,
      editModule,
      removeClass,
      removeModule
    }
  }

  return (
    <OperationContext.Provider value={value}>
      {children}
    </OperationContext.Provider>
  )
}
