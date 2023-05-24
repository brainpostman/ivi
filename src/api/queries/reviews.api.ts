import {
  IReviewGetResponse,
  IReviewPostRequest,
} from '@/types/api/reviews.api.interface'
import { customAxios } from './customAxios'

export const reviewsAPI = {
  getFilmReviewCount(param: number) {
    return getFilmReviewCount(param)
  },
  getFilmReviews(param: number) {
    return getFilmReviews(param)
  },
  getFilmReviewById(param: number) {
    return getFilmReviewById(param)
  },
  getComments(film_id: number, parent_id: number) {
    return getComments(film_id, parent_id)
  },
  postFilmReview(data: IReviewPostRequest, accessToken: string | null) {
    return postFilmReview(data, accessToken)
  },
  putFilmReview(
    data: { id: number; text: string },
    accessToken: string | null
  ) {
    return putFilmReview(data, accessToken)
  },
}

const getFilmReviewCount = async (id: number): Promise<number> => {
  try {
    const response = await customAxios.get<number>(`/reviews/count/${id}`)
    return response.data
  } catch (_) {
    return 0
  }
}

const getFilmReviews = async (id: number): Promise<IReviewGetResponse[]> => {
  try {
    const response = await customAxios.get<IReviewGetResponse[]>(
      `/reviews/parents/${id}`
    )
    return response.data
  } catch (_) {
    return []
  }
}

const getComments = async (film_id: number, parent_id: number) => {
  try {
    const response = await customAxios.get<IReviewGetResponse[]>(
      `/reviews/film/${film_id}/${parent_id}`
    )
    return response.data
  } catch (_) {
    return []
  }
}

const getFilmReviewById = async (
  id: number
): Promise<IReviewGetResponse | null> => {
  try {
    const response = await customAxios.get<IReviewGetResponse>(`/reviews/${id}`)
    return response.data
  } catch (_) {
    return null
  }
}

const postFilmReview = async (
  data: IReviewPostRequest,
  accessToken: string | null
): Promise<IReviewGetResponse | null> => {
  try {
    const response = await customAxios.post<IReviewGetResponse>(
      `/reviews`,
      data,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
    return response.data
  } catch (_) {
    return null
  }
}

const putFilmReview = async (
  data: { id: number; text: string },
  accessToken: string | null
): Promise<IReviewGetResponse | null> => {
  try {
    const response = await customAxios.put<IReviewGetResponse>(
      `/reviews`,
      data,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
    return response.data
  } catch (_) {
    return null
  }
}
