export function removeEmptyProps(object: Object) {
  const filledData = Object.entries(object).filter(([, value]) => {
    return value.length > 0 // Ignora as propriedades vazias do objeto
  })

  const newData = {} as Object

  filledData.map(([key, value]) => {
    newData[key] = value
  })

  return newData
}
