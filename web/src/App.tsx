import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

import { Profile } from "./components/Profile"
import { Dashboard } from "./components/Dashboard"
import { DynamicRoute } from "./components/DynamicRoute"
import { ResetPassword } from "./components/ResetPassword"
import { AuthenticationForm } from "./components/AuthenticationForm"

export function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Dashboard} />
        <DynamicRoute type="private" path="/profile" component={Profile} />
        <DynamicRoute
          type="public"
          path="/user/:userId/reset-password"
          component={ResetPassword}
        />
        <DynamicRoute
          type="public"
          path="/auth"
          component={AuthenticationForm}
        />
      </Switch>
    </Router>
  )
}
