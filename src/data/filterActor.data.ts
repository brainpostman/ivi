import { IStaffGetResponse } from '@/types/api/staffs.api.interface'

export const filterActorData: IStaffGetResponse[] = new Array(22)
  .fill(0)
  .map((_, index) => ({
    id: index + 1,
    name: `актёр${index + 1}`,
    types: [{ name: 'actor' }],
  }))
