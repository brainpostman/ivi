import { reviewsAPI } from '@/api/queries/reviews.api'
import { reviewRequiredProperties } from '@/data/requiredProperties.data'
import { IReviewGetResponse } from '@/types/api/reviews.api.interface'
import { checkObjHaveProperties } from '@/utils/test-utils/checkObjHaveProperties.utils'

const testFilmReviewCountId = 1

const testFilmReviewsId = 1

const testCommentsFilmdId = 1
const testCommentsParentId = 2

const testReviewByIdId = 1

const consoleErrorSpy = jest.spyOn(console, 'error')

describe('API-REVIEWS', () => {
  let reviewCount: number
  let filmReviews: IReviewGetResponse[]
  let comments: IReviewGetResponse[]
  let reviewById: IReviewGetResponse | undefined

  afterEach(() => {
    consoleErrorSpy.mockClear()
  })

  beforeAll(async () => {
    reviewCount = await reviewsAPI.getFilmReviewCount(testFilmReviewCountId)
    filmReviews = await reviewsAPI.getFilmReviews(testFilmReviewsId)
    comments = await reviewsAPI.getComments(
      testCommentsFilmdId,
      testCommentsParentId
    )
    reviewById = await reviewsAPI.getFilmReviewById(testReviewByIdId)
  })

  // Количество отзывов по id фильма
  // В базе должен быть отзыв с id testFilmReviewCountId
  it('Review count by film id', () => {
    // Если отзывов 0
    if (reviewCount === 0) {
      expect(consoleErrorSpy).not.toBeCalled()
    }

    expect(typeof reviewCount).toBe('number')
  })

  // Отзывы к фильму
  // Проверяем свойства
  it("Film's reviews", () => {
    // Если отзывы пустые
    if (!filmReviews.length) {
      expect(consoleErrorSpy).not.toBeCalled()
      expect(filmReviews).toStrictEqual([])
      return
    }

    // Если отзывы не пустые
    filmReviews.forEach(review =>
      checkObjHaveProperties(review, reviewRequiredProperties)
    )
  })

  // Дочерние комментари
  it('Сhild comments', () => {
    // Если комментари пустые
    if (!comments.length) {
      expect(consoleErrorSpy).not.toBeCalled()
      expect(comments).toStrictEqual([])
      return
    }

    comments.forEach(comment =>
      checkObjHaveProperties(comment, reviewRequiredProperties)
    )
  })

  // Отзыв по id
  it('Review by id', () => {
    if (reviewById) {
      checkObjHaveProperties(reviewById, reviewRequiredProperties)
    }
  })
})
