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

interface IPutFilmReviewData {
  id: number
  text: string
}

/*
  * Получить количество отзывов

  * @param {number} id - id фильма

  * @returns Promise<number>

*/

const getFilmReviewCount = async (id: number): Promise<number> => {
  try {
    const response = await customAxios.get<number>(`/reviews/count/${id}`)
    return response.data
  } catch (_) {
    return 0
  }
}

/*
  * Получить родительские комментарии к фильму

  * @param {number} id - id фильма

  * @returns Promise<IReviewGetResponse[]>

*/

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

/*
  * Получить все дочерние комментарии

  * @param {number} film_id - id фильма
  * @param {number} parent_id - id отзыва
  
  * @returns Promise<IReviewGetResponse[]>

*/

const getComments = async (
  film_id: number,
  parent_id: number
): Promise<IReviewGetResponse[]> => {
  try {
    const response = await customAxios.get<IReviewGetResponse[]>(
      `/reviews/film/${film_id}/${parent_id}`
    )
    return response.data
  } catch (_) {
    return []
  }
}

/*
  * Получить отзыв по id

  * @param {number} id - id отзыва
  
  * @returns Promise<IReviewGetResponse[]>

*/

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

/*
  * Создать отзыв

  * @param {IReviewPostRequest} data - отзыв
  * @param {string | null} accessToken - токен
  
  * @returns Promise<IReviewGetResponse | null>

*/

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

/*
  * Обновить отзыв

  * @param {IPutFilmReviewData} data - отзыв
  * @param {string | null} accessToken - токен
  
  * @returns Promise<IReviewGetResponse | null>

*/

const putFilmReview = async (
  data: IPutFilmReviewData,
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
