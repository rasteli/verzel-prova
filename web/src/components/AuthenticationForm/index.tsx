import { useState } from "react"
import styles from "./styles.module.scss"

import { SVG } from "../SVG"
import { Login } from "../Login"
import { SignUp } from "../SignUp"
import { ForgotPassword } from "../ForgotPassword"

import classIcon from "../../assets/svg/class.svg"

export function AuthenticationForm() {
  const [toggleLogin, setToggleLogin] = useState(true)
  const [toggleSignUp, setToggleSignUp] = useState(true)

  return (
    <div className={styles.authContainer}>
      <aside>
        <h1>APP TITLE</h1>
        <p>
          Bacon ipsum dolor amet landjaeger nisi sunt veniam chuck spare ribs
          duis. Sed flank tail, porchetta fatback turkey ut leberkas non.
          Meatloaf ut turkey in. Pastrami sint biltong nisi et, ground round
          nostrud pork belly turducken chuck aute porchetta adipisicing
          prosciutto leberkas.
        </p>
        <p>
          Prosciutto ut alcatra, ribeye in occaecat rump salami pork loin.
          Pastrami landjaeger strip steak, dolor turkey tongue tempor ham
          boudin.
        </p>
        <SVG icon={classIcon} size={500} />
      </aside>

      <main>
        {toggleSignUp ? (
          <SignUp toggleSignUp={setToggleSignUp} />
        ) : toggleLogin ? (
          <Login toggleSignUp={setToggleSignUp} toggleLogin={setToggleLogin} />
        ) : (
          <ForgotPassword toggleLogin={setToggleLogin} />
        )}
      </main>
    </div>
  )
}
