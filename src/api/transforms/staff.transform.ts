import formatStaffTypestoType from '@/formatters/staffTypesToType.format'
import { IStaff, IStaffGetResponse } from '@/types/staffs.interface'

/*
  * Преобразуем данные об участнике

  * @param {IStaffGetResponse} staffData - данные об участнике
  * @returns IStaff - преобразованные данные об участнике

*/

export const transformStaff = (staffData: IStaffGetResponse[]): IStaff[] => {
  const filteredValues = staffData.filter(staff => {
    const isExistTypesName = !!staff.types[0].name
    if (!isExistTypesName) {
      console.error(`Wrong staff type value {undefined}; ID = ${staff.id}`)
    }

    return isExistTypesName
  })

  const result = filteredValues.map(staff => formatStaffTypestoType(staff))

  return result
}
