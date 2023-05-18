/*
  * @param {string} staffType - тип участника
  * @returns string - название параметра для участника

*/

export const formatStaffType = (staffType?: string): string => {
  switch (staffType) {
    case 'actor':
      return 'actors'
    case 'director':
      return 'directors'
    default:
      return ''
  }
}
