import { reviewsAPI } from '@/api/queries/reviews.api'
import { IReviewGetResponse } from '@/types/api/reviews.api.interface'

const consoleErrorSpy = jest.spyOn(console, 'error')

const testErrorFilmReviewCountId = -1

const testErrorFilmReviewsId = -1

const testErrorCommentsFilmdId = -1
const testErrorCommentsParentId = -2

describe('API-REVIEWS ERROR', () => {
  let errorReviewCount: number
  let errorFilmReviews: IReviewGetResponse[]
  let errorComments: IReviewGetResponse[]
  let errorReviewById: IReviewGetResponse | undefined

  afterEach(() => {
    consoleErrorSpy.mockClear()
  })

  beforeAll(async () => {
    errorReviewCount = await reviewsAPI.getFilmReviewCount(
      testErrorFilmReviewCountId
    )
    errorFilmReviews = await reviewsAPI.getFilmReviews(testErrorFilmReviewsId)
    errorComments = await reviewsAPI.getComments(
      testErrorCommentsFilmdId,
      testErrorCommentsParentId
    )
  })

  // Ошибка при получении количества отзывов
  it('Review count by film id', () => {
    expect(errorReviewCount).toBe(0)
  })

  // Ошибка при получении отзывов
  it('Review count by film id', () => {
    expect(errorFilmReviews).toStrictEqual([])
  })

  // Ошибка при получении дочерних комментариев
  it('Сhild comments', () => {
    expect(errorComments).toStrictEqual([])
  })

  // Ошибка при получении отзыва по id
  it('Review by id', () => {
    expect(errorReviewById).toBe(undefined)
  })
})
