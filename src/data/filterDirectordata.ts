import { IStaffGetResponse } from '@/types/staffs.interface'

export const filterDirectorData: IStaffGetResponse[] = new Array(22)
  .fill(0)
  .map((_, index) => ({
    id: index + 1,
    name: `продюсер${index + 1}`,
    types: [{ name: 'director' }],
  }))
