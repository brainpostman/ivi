import { filmsAPI } from '@/api/queries/films.api'
import ModalFilmPoster from '@/components/Mobile/ModalFilmPoster/ModalFilmPoster'
import PageLayout from '@/layouts/PageLayout/PageLayout'
import { IMovieById } from '@/types/api/films.api.interface'
import { GetServerSidePropsContext } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import styles from './index.module.scss'
import { useRouter } from 'next/router'
import {
  buildDateString,
  trimComment,
  validateComment,
} from '@/utils/comment.utils'
import { useSession } from 'next-auth/react'
import CommentForm from '@/components/UI/CommentForm/CommentForm'
import { ChangeEvent, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import ReviewComment from '@/components/ReviewComment/ReviewComment'
import Loader from '@/components/UI/Loader/Loader'
import Link from 'next/link'
import ModalWindow from '@/components/ModalWindow/ModalWindow'
import { reviewsAPI } from '@/api/queries/reviews.api'
import { IReviewGetResponse } from '@/types/api/reviews.api.interface'

interface IReviewProps {
  film: IMovieById
  review: IReviewGetResponse
  comments: IReviewGetResponse[]
}

export const getServerSideProps = async ({
  locale,
  params,
}: GetServerSidePropsContext) => {
  if (!params || !parseInt(params.id as string)) {
    return {
      redirect: {
        destination: '/error',
        permanent: false,
      },
    }
  }

  const review = await reviewsAPI.getFilmReviewById(Number(params.review_id))

  const film = await filmsAPI.getFilmsById(locale ?? 'ru', Number(params.id))

  const comments = await reviewsAPI.getComments(
    Number(params.id),
    Number(params.review_id)
  )

  return {
    props: {
      film,
      review,
      comments,
      ...(await serverSideTranslations(locale ?? 'ru', [
        'header',
        'auth_modal',
        'common',
        'footer',
      ])),
    },
  }
}

const Review = ({ film, review, comments: propsComments }: IReviewProps) => {
  const { status, data } = useSession()
  const router = useRouter()
  const { locale } = router
  const date = new Date(review.createdAt)
  const dateStr = buildDateString(date, locale ?? 'ru')
  const locDate = date.toLocaleDateString()
  const locTime = date.toLocaleTimeString()
  const [comments, setComments] = useState([...propsComments])
  const [isLoading, setIsLoading] = useState(false)
  const [text, setText] = useState('')
  const [reviewText, setReviewText] = useState(review.text)
  const [showModal, setShowModal] = useState(false)

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value)
    toast.dismiss()
  }

  const handleClick = async () => {
    toast.dismiss()
    const str = trimComment(text)
    setText(str)
    if (!validateComment(5, 10000, str)) {
      toast.warn(
        'Комментарий должен иметь не менее 10 и не более 10000 символов.'
      )
      return
    }
    if (data) {
      const response = await reviewsAPI.postFilmReview(
        {
          text: text,
          user_id: data.user.id,
          film_id: film.id,
          parent: review.id,
        },
        data.accessToken
      )
      if (response) {
        setText('')
        setIsLoading(true)
      } else {
        toast.error(
          'При отправке комментария возникла проблема, пожалуйста повторите позже.'
        )
      }
    }
  }

  const handleEditChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setReviewText(e.target.value)
    toast.dismiss()
  }

  const handleEditClick = async () => {
    toast.dismiss()
    const str = trimComment(reviewText)
    setReviewText(str)
    if (!validateComment(100, 10000, str)) {
      toast.warn('Отзыв должен иметь не менее 100 и не более 10000 символов.')
      return
    }
    if (data) {
      const response = await reviewsAPI.putFilmReview(
        {
          id: review.id,
          text: reviewText,
        },
        data.accessToken
      )
      if (response) {
        setShowModal(false)
        toast.success('Отзыв успешно отредактирован')
        router.replace(router.asPath)
      } else {
        toast.error(
          'При редактировании возникла проблема, пожалуйста повторите позже.'
        )
      }
    }
  }

  useEffect(() => {
    setText('')
  }, [router.asPath])

  useEffect(() => {
    const getComments = async () => {
      const commentsReq = await reviewsAPI.getComments(film.id, review.id)
      if (commentsReq.length > 0) {
        setComments(commentsReq)
      }
    }
    if (isLoading) {
      getComments()
      setIsLoading(false)
    }
  }, [isLoading])

  return (
    <PageLayout title={'review'}>
      <div className={styles.wrapper}>
        <section className={styles.commentSection}>
          <h1 className={styles.title}>
            {review.parent ? 'Комментарий к ' : 'Отзыв к фильму '}
            <Link className={styles.link} href={`/watch/${film.id}`}>
              {locale === 'ru' ? film.name : film.name_en}
            </Link>
          </h1>
          <section className={styles.openingPost}>
            <article className={styles.comment}>
              <div className={styles.comment__info}>
                <p className={styles.comment__line} />
                <p className={styles.comment__title}>
                  <span className={styles.comment__from}>
                    {review.parent ? '' : 'Отзыв от '}
                    <span className={styles.comment__sender}>
                      {review.name || review.user_email}
                    </span>
                  </span>
                  <span>
                    {', отправлен '}
                    <span
                      className={styles.comment__date}
                      title={`${locDate}, ${locTime}`}
                    >
                      {dateStr}
                    </span>
                  </span>
                </p>
                <p className={styles.comment__line} />
              </div>
              <p className={styles.comment__content}>{review.text}</p>
              <div className={styles.comment__controls}>
                <p className={styles.comment__line} />
                {status === 'authenticated' &&
                data.user.id === review.user_id ? (
                  <div className={styles.comment__buttons}>
                    <span
                      onClick={() => {
                        setShowModal(true)
                      }}
                    >
                      Редактировать
                    </span>
                  </div>
                ) : (
                  <p className={styles.comment__line} />
                )}
                <p className={styles.comment__line} />
              </div>
            </article>
          </section>
          <div className={styles.commentForm}>
            <CommentForm
              textareaValue={text}
              textareaOnChangeFn={handleChange}
              sendButtonClickFn={handleClick}
              textareaPlaceholder='Оставьте комментарий к отзыву'
            />
          </div>
          <div className={styles.comments}>
            <div className={styles.comments__separator}>
              <p className={styles.comment__line} />
              <span className={styles.comments__title}>Комментарии</span>
              <p className={styles.comment__line} />
            </div>
            {isLoading ? (
              <Loader />
            ) : (
              <div className={styles.comments__list}>
                {comments.map(comment => {
                  return (
                    <ReviewComment
                      key={comment.id}
                      sessionStatus={status}
                      sessionData={data}
                      film={film}
                      comment={comment}
                    />
                  )
                })}
              </div>
            )}
          </div>
        </section>
        <Link href={`/watch/${film.id}`}>
          <ModalFilmPoster film={film} className={styles.poster} />
        </Link>
      </div>
      <ModalWindow
        isShow={showModal}
        closeFunc={() => {
          setShowModal(false)
          setReviewText(review.text)
        }}
      >
        <div className={styles.modal}>
          <h1 className={styles.title__reviews}>Оставить отзыв</h1>
          <div className={styles.commentForm}>
            <CommentForm
              textareaValue={reviewText}
              textareaPlaceholder='Напишите отзыв'
              textareaOnChangeFn={handleEditChange}
              sendButtonClickFn={handleEditClick}
            />
            <ModalFilmPoster film={film} />
          </div>
        </div>
      </ModalWindow>
    </PageLayout>
  )
}

export default Review
