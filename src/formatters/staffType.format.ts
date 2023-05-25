import { IStaffType } from '@/types/api/staffs.api.interface'

/*
  * @param {string} staffType - тип участника
  * @returns string - название параметра для участника

*/

export const formatStaffType = (
  staffType: IStaffType
): 'actors' | 'directors' | undefined => {
  switch (staffType) {
    case 'actor':
      return 'actors'
    case 'director':
      return 'directors'
    default:
      return undefined
  }
}
