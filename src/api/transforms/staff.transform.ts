import { IStaff, IStaffGetResponse, IStaffType } from '@/types/staffs.interface'

/*
  * Преобразуем данные об участнике
  * @param {IStaffGetResponse} staffData - данные об участнике
  * @returns IStaff - преобразованные данные об участнике

*/

export const transformStaff = (staffData: IStaffGetResponse): IStaff => {
  const result: IStaff = {
    ...staffData,
    type: staffData.types[0].name as IStaffType,
  }

  return result
}
