import { IStaff, IStaffGetResponse } from '@/types/staffs.interface'

export const transformStaff = (
  staffData: IStaffGetResponse,
  formatNameCallback?: (value: string) => string
): IStaff => {
  const name = formatNameCallback
    ? formatNameCallback(staffData.name)
    : staffData.name
  const result = { ...staffData, name, type: staffData.types[0].name }

  return result
}
