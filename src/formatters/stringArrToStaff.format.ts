import { IStaffGetResponse, IStaffType } from '@/types/staffs.interface'

/*
  Преобразует массив строк в список участников
  * @param {string[]} staffNames - список имён участников
  * @param {IStaffType} staffType - тип участника
  * @returns IStaffGetResponse[] - массив участников

*/

const formatStringArrToStaff = (
  staffNames: string[],
  staffType: IStaffType
): IStaffGetResponse[] => {
  const resultStaffs: IStaffGetResponse[] = staffNames.map((staff, index) => ({
    id: index + 1,
    name: staff,
    types: [{ name: staffType }],
    biography: 'Биография',
  }))

  return resultStaffs
}

export default formatStringArrToStaff
