import {
  Route,
  Redirect,
  RouteProps,
  RouteComponentProps
} from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"

type DynamicRouteProps = RouteProps & {
  type: "private" | "public"
  component: React.ComponentType
}

export function DynamicRoute({
  type,
  component: Component,
  ...rest
}: DynamicRouteProps) {
  const { user } = useAuth()

  const renders = {
    private: (props: RouteComponentProps) =>
      user ? <Component {...props} /> : <Redirect to="/" />,
    public: (props: RouteComponentProps) =>
      user ? <Redirect to="/" /> : <Component {...props} />
  }

  const Render = renders[type]

  return <Route {...rest} render={props => <Render {...props} />} />
}

//** Rota privada: apenas usuários autenticados podem acessá-la. */
//** Rota pública: apenas usuários não autenticados podem acessá-la. */
