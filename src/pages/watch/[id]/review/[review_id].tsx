import { filmsAPI } from '@/api/queries/films.api'
import ModalFilmPoster from '@/components/Watch/ModalFilmPoster/ModalFilmPoster'
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
import ReviewComment from '@/components/Watch/ReviewComment/ReviewComment'
import Loader from '@/components/UI/Loader/Loader'
import Link from 'next/link'
import { reviewsAPI } from '@/api/queries/reviews.api'
import { IReviewGetResponse } from '@/types/api/reviews.api.interface'
import { useTranslation } from 'next-i18next'
import { MdArrowBackIosNew } from 'react-icons/md'
import ModalCommentForm from '@/components/Watch/ReviewComment/ModalCommentForm/ModalCommentForm'

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
      notFound: true,
    }
  }

  const review = await reviewsAPI.getFilmReviewById(Number(params.review_id))

  const film = await filmsAPI.getFilmsById(locale ?? 'ru', Number(params.id))

  const comments = await reviewsAPI.getComments(
    Number(params.id),
    Number(params.review_id)
  )

  if (!film) {
    return {
      notFound: true,
    }
  }

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
        'review',
      ])),
    },
  }
}

const Review = ({ film, review, comments: propsComments }: IReviewProps) => {
  const { t } = useTranslation('review')
  const { status, data } = useSession()
  const router = useRouter()
  const { locale } = router
  const date = new Date(review.createdAt)
  const dateStr = buildDateString(date, locale ?? 'ru')
  const locDate = date.toLocaleDateString()
  const locTime = date.toLocaleTimeString()
  const [startingDepth, setStartingDepth] = useState(1)
  const [comments, setComments] = useState([...propsComments])
  const [isLoading, setIsLoading] = useState(false)
  const [text, setText] = useState('')
  const [reviewText, setReviewText] = useState(review.text)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showMobileInput, setShowMobileInput] = useState(false)

  useEffect(() => {
    const mediaQueryList = window.matchMedia('(max-width: 585px)')
    handleWindowResize()
    function handleWindowResize() {
      if (mediaQueryList.matches) {
        setStartingDepth(4)
      } else {
        setStartingDepth(1)
      }
    }
    mediaQueryList.addEventListener('change', handleWindowResize)
    return () => {
      mediaQueryList.removeEventListener('change', handleWindowResize)
    }
  }, [])

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value)
    toast.dismiss()
  }

  const handleClick = async () => {
    toast.dismiss()
    const str = trimComment(text)
    setText(str)
    if (!validateComment(5, 10000, str)) {
      toast.warn(t('review-comment.messages.warn'))
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
        setShowMobileInput(false)
        setIsLoading(true)
      } else {
        toast.error(t('review-comment.messages.error'))
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
      toast.warn(t('review-messages.warn'))
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
        setShowEditModal(false)
        toast.success(t('review-messages.success'))
        router.replace(router.asPath)
      } else {
        toast.error(t('review-messages.error'))
      }
    }
  }

  useEffect(() => {
    setComments([...propsComments])
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
    <PageLayout
      title={
        (review.parent ? t('title-comment') : t('title-review')) +
        (locale === 'ru' ? film.name : film.name_en)
      }
    >
      <div className={styles.wrapper}>
        <section className={styles.commentSection}>
          <div className={styles.back_button} onClick={() => router.back()}>
            <MdArrowBackIosNew />
            <p>{t('back')}</p>
          </div>
          <h1 className={styles.title}>
            {review.parent ? t('title-comment') : t('title-review')}
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
                    {review.parent ? '' : t('review-by')}
                    <span className={styles.comment__sender}>
                      {review.user_name || review.user_email}
                    </span>
                  </span>
                  <span>
                    {t('sent-date')}
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
                <div
                  className={`${styles.mobile__leaveComment} ${styles.comment__buttons}`}
                  onClick={() => {
                    setShowMobileInput(true)
                  }}
                >
                  {t('review-comment.reply')}
                </div>
                {status === 'authenticated' &&
                data.user.id === review.user_id ? (
                  <div className={styles.comment__buttons}>
                    <span
                      onClick={() => {
                        setShowEditModal(true)
                      }}
                    >
                      {t('edit')}
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
              value={text}
              onChange={handleChange}
              onClickSubmit={handleClick}
              placeholder={t('comment-placeholder')}
              className={styles.commentForm__textarea}
            />
            {/* MOBILE COMMENT INPUT */}
          </div>
          <div className={styles.comments}>
            <div className={styles.comments__separator}>
              <p className={styles.comment__line} />
              <span className={styles.comments__title}>{t('comments')}</span>
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
                      depth={startingDepth}
                    />
                  )
                })}
              </div>
            )}
          </div>
        </section>
        <Link href={`/watch/${film.id}`} className={styles.poster}>
          <ModalFilmPoster film={film} />
        </Link>
      </div>
      {showEditModal && (
        <ModalCommentForm
          isShow={showEditModal}
          closeFunc={() => {
            setShowEditModal(false)
            setReviewText(review.text)
          }}
          title={t('leave-review')}
          value={reviewText}
          placeholder={t('review-placeholder')}
          onChange={handleEditChange}
          onClickSubmit={handleEditClick}
          film={film}
        />
      )}
      {showMobileInput && (
        <ModalCommentForm
          isShow={showMobileInput}
          closeFunc={() => {
            setShowMobileInput(false)
            setText('')
          }}
          title={t('review-comment.edit-comment')}
          value={text}
          placeholder={t('review-comment.edit-placeholder')}
          onChange={handleChange}
          onClickSubmit={handleClick}
          film={film}
        />
      )}
    </PageLayout>
  )
}

export default Review
