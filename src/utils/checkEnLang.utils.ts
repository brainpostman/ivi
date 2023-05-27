/*
  * Проверяет, на английском ли языке написано выражение

  * @param {string} value

  * @returns boolean
*/

const enReg = /^[a-zA-Z]+$/

const checkEnLang = (value: string): boolean => {
  return enReg.test(value)
}

export default checkEnLang
