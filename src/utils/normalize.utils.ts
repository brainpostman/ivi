/*
  * @param {string} key - ключ
  * @returns TemplateStringsArray

*/

export const normalizeKey = (key: string) =>
  key as unknown as TemplateStringsArray
