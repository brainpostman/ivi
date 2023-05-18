/*
  * @param {object} obj - проверяемый объект
  * @param {string[]} properties - проверяемые свойства

*/
export const checkObjHaveProperties = (obj: object, properties: string[]) => {
  properties.forEach(property => expect(obj).toHaveProperty(property))
}
