import {
  IStaff,
  IStaffGetRequest,
  IStaffGetResponse,
} from '@/types/api/staffs.api.interface'
import { transformStaffs } from '../transforms/staff.transform'
import { customAxios } from './customAxios'
import formatStaffTypestoType from '@/formatters/staffTypesToType.format'

export const staffsAPI = {
  getDirectors(params?: IStaffGetRequest) {
    return getDirectors(params)
  },
  getActors(params?: IStaffGetRequest) {
    return getActors(params)
  },
  getStaffById(id: number) {
    return getStaffById(id)
  },
  getStaffByParams(params: IStaffGetRequest) {
    return getStaffByParams(params)
  },
}

/*
  * Получаем режиссёров

  * @param {IStaffGetRequest} params - параметры
  * @returns Promise<IStaff[]>

*/

const getDirectors = async (params?: IStaffGetRequest): Promise<IStaff[]> => {
  try {
    const directorsData = (
      await customAxios.get<IStaffGetResponse[]>('/staffs', {
        params: {
          type: 'director',
          ...params,
        },
      })
    ).data

    const directors = transformStaffs(directorsData)
    return directors
  } catch (_) {
    return []
  }
}

/*
  * Получаем актёров

  * @param {IStaffGetRequest} params - параметры
  * @returns Promise<IStaff[]>

*/

const getActors = async (params?: IStaffGetRequest): Promise<IStaff[]> => {
  try {
    const actorsData = (
      await customAxios.get<IStaffGetResponse[]>('/staffs', {
        params: {
          type: 'actor',
          ...params,
        },
      })
    ).data

    const actors = transformStaffs(actorsData)

    return actors
  } catch (_) {
    return []
  }
}

/*
  * Получаем участника по id

  * @param {number} id - id участника
  * @returns Promise<IStaff | undefined>

*/

const getStaffById = async (id: number): Promise<IStaff | undefined> => {
  try {
    const staff = (await customAxios.get<IStaffGetResponse>(`/staffs/${id}`))
      .data
    const formattedStaff = formatStaffTypestoType(staff)

    return formattedStaff
  } catch (_) {
    return undefined
  }
}

/*
  * Получаем участников по параметрам

  * @param {IStaffGetRequest} params - параметры
  * @returns Promise<IStaff[]>

*/

const getStaffByParams = async (
  params: IStaffGetRequest
): Promise<IStaff[]> => {
  try {
    const staffs = (
      await customAxios.get<IStaffGetResponse[]>('/staffs', { params })
    ).data

    const formattedStaffs = transformStaffs(staffs)

    return formattedStaffs
  } catch (_) {
    return []
  }
}
