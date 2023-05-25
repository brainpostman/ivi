import { IStaff, IStaffGetResponse } from '@/types/api/staffs.api.interface'

export const staffData: IStaff = {
  id: 1,
  name: 'Участник 1',
  type: 'actor',
  biography: 'biography',
  name_en: 'Staff 1',
}

export const staffDataResponse: IStaffGetResponse = {
  id: 1,
  name: 'Участник 1',
  types: [{ name: 'actor' }],
  biography: 'biography',
  name_en: 'Staff 1',
}
