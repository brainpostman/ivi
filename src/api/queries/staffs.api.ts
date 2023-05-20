import {
  IStaff,
  IStaffGetRequest,
  IStaffGetResponse,
} from '@/types/staffs.interface'
import { transformStaff } from '../transforms/staff.transform'
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

    const directors = transformStaff(directorsData)
    return directors
  } catch (_) {
    return []
  }
}

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

    const actors = transformStaff(actorsData)

    return actors
  } catch (_) {
    return []
  }
}

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

const getStaffByParams = async (
  params: IStaffGetRequest
): Promise<IStaff[]> => {
  try {
    const staffs = (
      await customAxios.get<IStaffGetResponse[]>('/staffs', { params })
    ).data

    const formattedStaffs = transformStaff(staffs)

    return formattedStaffs
  } catch (_) {
    return []
  }
}
