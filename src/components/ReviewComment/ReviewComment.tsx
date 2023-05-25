import { IMovieById } from '@/types/api/films.api.interface'
import styles from './ReviewComment.module.scss'
import {
  buildDateString,
  trimComment,
  validateComment,
} from '@/utils/comment.utils'
import { ChangeEvent, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { Session } from 'next-auth'
import CommentForm from '../UI/CommentForm/CommentForm'
import { useRouter } from 'next/router'
import Loader from '@/components/UI/Loader/Loader'
import ModalWindow from '@/components/ModalWindow/ModalWindow'
import ModalFilmPoster from '@/components/Mobile/ModalFilmPoster/ModalFilmPoster'
import { reviewsAPI } from '@/api/queries/reviews.api'
import { IReviewGetResponse } from '@/types/api/reviews.api.interface'

interface ICommentProps {
  sessionStatus: 'authenticated' | 'loading' | 'unauthenticated'
  sessionData: Session | null
  film: IMovieById
  comment: IReviewGetResponse
  className?: string
}

const ReviewComment = ({
  sessionStatus: status,
  sessionData: data,
  film,
  comment,
  className: propsClassName = '',
}: ICommentProps) => {
  const router = useRouter()
  const { locale } = router
  const date = new Date(comment.createdAt)
  const dateStr = buildDateString(date, locale ?? 'ru')
  const locDate = date.toLocaleDateString()
  const locTime = date.toLocaleTimeString()
  const [showForm, setShowForm] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [comments, setChildComments] = useState<IReviewGetResponse[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [text, setText] = useState('')
  const [commentText, setCommentText] = useState(comment.text)
  const [editText, setEditText] = useState(comment.text)

  useEffect(() => {
    setIsLoading(true)
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
      toast.warn(
        'Комментарий должен иметь не менее 10 и не более 10000 символов.'
      )
      return
    }
    if (data) {
      const response = await reviewsAPI.postFilmReview(
        {
          text: str,
          user_id: data.user.id,
          film_id: film.id,
          parent: comment.id,
        },
        data.accessToken
      )
      if (response) {
        setText('')
        setShowForm(false)
        setIsLoading(true)
      } else {
        toast.error(
          'При отправке комментария возникла проблема, пожалуйста повторите позже.'
        )
      }
    }
  }

  const handleEditChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setEditText(e.target.value)
    toast.dismiss()
  }

  const handleEditClick = async () => {
    toast.dismiss()
    const str = trimComment(editText)
    setEditText(str)
    if (!validateComment(5, 10000, str)) {
      toast.warn(
        'Комментарий должен иметь не менее 5 и не более 10000 символов.'
      )
      return
    }
    if (data) {
      const response = await reviewsAPI.putFilmReview(
        {
          id: comment.id,
          text: str,
        },
        data.accessToken
      )
      if (response) {
        setCommentText(editText)
        setShowModal(false)
        toast.success('Комментарий успешно отредактирован')
      } else {
        toast.error(
          'При редактировании возникла проблема, пожалуйста повторите позже.'
        )
      }
    }
  }

  const handleReplyClick = () => {
    if (status === 'authenticated') {
      setShowForm(true)
    } else {
      router.push('/auth/signin')
    }
  }

  useEffect(() => {
    const getChildComments = async () => {
      const commentsReq = await reviewsAPI.getComments(film.id, comment.id)
      if (commentsReq.length > 0) {
        setChildComments(commentsReq)
      }
    }
    if (isLoading) {
      getChildComments()
      setIsLoading(false)
    }
  }, [isLoading])

  return (
    <article className={`${styles.openingPost} ${propsClassName}`}>
      <div className={styles.comment}>
        <div className={styles.comment__info}>
          <p className={styles.comment__line} />
          <p className={styles.comment__title}>
            <span className={styles.comment__from}>
              <span className={styles.comment__sender}>
                {comment.name || comment.user_email}
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
        <p className={styles.comment__content}>{commentText}</p>
        <div className={styles.comment__controls}>
          <p className={styles.comment__line} />
          <div className={styles.comment__buttons}>
            <span onClick={handleReplyClick}>Ответить</span>
            {data && data.user.id === comment.user_id && (
              <span
                onClick={() => {
                  setShowModal(true)
                }}
              >
                Редактировать
              </span>
            )}
          </div>
          <p className={styles.comment__line} />
        </div>
        {showForm && (
          <div className={styles.commentForm}>
            <CommentForm
              textareaValue={text}
              textareaOnChangeFn={handleChange}
              sendButtonClickFn={handleClick}
              textareaPlaceholder='Оставьте комментарий'
              cancelButtonCallback={() => {
                setShowForm(false)
              }}
            />
          </div>
        )}
        {isLoading ? (
          <Loader />
        ) : comments.length > 0 ? (
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
        ) : (
          <></>
        )}
      </div>
      <ModalWindow
        isShow={showModal}
        closeFunc={() => {
          setShowModal(false)
          setEditText(comment.text)
        }}
      >
        <div className={styles.modal}>
          <h1 className={styles.title__reviews}>Оставить комментарий</h1>
          <div className={styles.commentForm}>
            <CommentForm
              textareaValue={editText}
              textareaPlaceholder='Напишите комментарий'
              textareaOnChangeFn={handleEditChange}
              sendButtonClickFn={handleEditClick}
            />
            <ModalFilmPoster film={film} />
          </div>
        </div>
      </ModalWindow>
    </article>
  )
}

export default ReviewComment
