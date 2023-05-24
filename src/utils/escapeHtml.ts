/*
    * @param {string} str - строка
    * @returns string - отформатированная строка

*/

export function escapeHtmlNbsp(str: string): string {
  return str.replaceAll('&nbsp;', ' ')
}
