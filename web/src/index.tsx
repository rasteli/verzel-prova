import React from "react"
import ReactDOM from "react-dom"

import { App } from "./App"
import { AuthProvider } from "./contexts/AuthContext"
import { ModuleProvider } from "./contexts/ModuleContext"
import { OperationsProvider } from "./contexts/OperationsContext"

import "./styles/global.css"

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <ModuleProvider>
        <OperationsProvider>
          <App />
        </OperationsProvider>
      </ModuleProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
)
