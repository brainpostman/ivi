/*
  * @param {object} obj - проверяемый объект
  * @param {string[]} properties - проверяемые свойства

*/
export const checkObjHaveProperties = (
  obj: object | undefined,
  properties: string[]
) => {
  properties.forEach((property, index) => {
    if (!obj) {
      console.error(`checkObjHaveProperties {undefined}; ID = ${index}`)
      return
    }
    expect(obj).toHaveProperty(property)
  })
}
