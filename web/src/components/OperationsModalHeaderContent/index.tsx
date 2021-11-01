type HeaderContentProps = {
  type: "create" | "update"
  your?: string
  whatIs?: string
}

export function OperationsModalHeaderContent(props: HeaderContentProps) {
  if (props.type === "create") {
    return (
      <>
        <h2>Pronto para ensinar?</h2>
        <p>
          Crie {props.your} {props.whatIs}
        </p>
      </>
    )
  }

  return (
    <h2>
      Atualize as <br /> informações
    </h2>
  )
}
