import React, { useState } from "react"

import styles from "./styles.module.scss"

import { Alert } from "../Alert"
import { useModule } from "../../contexts/ModuleContext"
import { OperationsModalHeaderContent } from "../OperationsModalHeaderContent"

export type type = "create" | "update"
export type modal = "module" | "class"

type ModalType = {
  id: string
  type: type
  modal: modal
  open: boolean
  setOpen: (open: boolean) => void
}

const TYPES = {
  module: {
    whatIs: "módulo",
    pronouns: {
      your: "seu",
      of: "do"
    }
  },

  class: {
    whatIs: "aula",
    pronouns: {
      your: "sua",
      of: "da"
    }
  }
}

export function ProfileOperationsModal({
  id,
  type,
  modal,
  open,
  setOpen
}: ModalType) {
  const { methods } = useModule()

  const [name, setName] = useState("")
  const [desc, setDesc] = useState("")
  const [date, setDate] = useState("")
  const [error, setError] = useState("")

  if (!open) return null

  const operations = {
    create: {
      class: () => methods.createClass(name, desc, date, id),
      module: () => methods.createModule(name, desc)
    },
    update: {
      class: () => methods.updateClass(id, name, desc, date),
      module: () => methods.updateModule(id, name, desc)
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    const operation = operations[type][modal]

    try {
      await operation()
      closeModal()
    } catch (error: any) {
      setError(error.reponse.data.error)
    }
  }

  function closeModal() {
    setName("")
    setDesc("")
    setDate("")
    setOpen(false)
  }

  const {
    whatIs,
    pronouns: { your, of }
  } = TYPES[modal]

  const isCreateType = type === "create"

  return (
    <>
      <div className={styles.overlay} onClick={closeModal} />

      <div className={styles.modal}>
        <header className={styles.modalHeader}>
          {isCreateType ? (
            <OperationsModalHeaderContent
              type="create"
              your={your}
              whatIs={whatIs}
            />
          ) : (
            <OperationsModalHeaderContent type="update" />
          )}
        </header>

        {error && <Alert variant="error">{error}</Alert>}

        <main className={styles.modalBody}>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder={`Nome ${of} ${whatIs}`}
              required={isCreateType}
              onChange={e => setName(e.target.value)}
            />
            <input
              type="text"
              placeholder={`Descrição ${of} ${whatIs}`}
              required={isCreateType}
              onChange={e => setDesc(e.target.value)}
            />

            {modal === "class" && (
              <input
                type="text"
                placeholder="Data de início (dd/mm)"
                required={isCreateType}
                onChange={e => setDate(e.target.value)}
              />
            )}

            <button type="submit" disabled={!name && !desc && !date}>
              {isCreateType ? "CRIAR" : "ATUALIZAR"}
            </button>
          </form>
        </main>
      </div>
    </>
  )
}
