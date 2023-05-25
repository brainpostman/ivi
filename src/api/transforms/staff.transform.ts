import formatStaffTypestoType from '@/formatters/staffTypesToType.format'
import { IStaff, IStaffGetResponse } from '@/types/api/staffs.api.interface'

/*
  * Преобразуем данные об участниках

  * @param {IStaffGetResponse[] | undefined} staffData - данные об участниках
  * @returns IStaff[] - преобразованные данные об участниках

*/

export const transformStaffs = (
  staffData: IStaffGetResponse[] | undefined
): IStaff[] => {
  if (!staffData) return []

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
