import { IStaff, IStaffGetResponse } from '@/types/staffs.interface'

export const transformStaff = (staffData: IStaffGetResponse): IStaff => {
  const result = { ...staffData, type: staffData.types[0].name }

  return result
}
