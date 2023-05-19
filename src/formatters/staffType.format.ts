/*
  * @param {string} staffType - тип участника
  * @returns string - название параметра для участника

*/

import { IFilmsGetRequest } from '@/types/films.api.interface'
import { IStaffType } from '@/types/staffs.interface'

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
