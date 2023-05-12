// === PROPS ===
// @param { * } obj - проверяемый объект
// @param { * } properties - проверяемые свойства

export const checkObjHaveProperties = (obj: object, properties: string[]) => {
  properties.forEach(property => expect(obj).toHaveProperty(property))
}
