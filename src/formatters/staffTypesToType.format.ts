import {
  IStaff,
  IStaffGetResponse,
  IStaffType,
} from '@/types/api/staffs.api.interface'

/*
  * Форматирует данные об участнике: достаёт название типа

  * @param {IStaffGetResponse} staffData - данные об участнике
  * @returns IStaff | undefined - отформатированные данные об участнике

*/

const formatStaffTypestoType = (staffData: IStaffGetResponse): IStaff => {
  const copyStaffData: Partial<IStaffGetResponse> = { ...staffData }
  const typesName = staffData.types[0].name
  delete copyStaffData.types

  const result: IStaff = {
    ...(copyStaffData as IStaffGetResponse),
    type: typesName as IStaffType,
  }

  return result
}

export default formatStaffTypestoType
