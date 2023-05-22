import { ICRUDDetailedMovie, ICRUDMovie } from '@/types/ICrudMovie'
import Image from 'next/image'
import { escapeHtmlNbsp } from '@/utils/escapeHtml'
import styles from './AdminMovie.module.scss'
import ModalWindow from '../ModalWindow/ModalWindow'
import { useState } from 'react'
import { customAxios } from '@/api/queries/customAxios'
import { toast } from 'react-toastify'
import AdminDetailedMovie from './AdminDetailedMovie/AdminDetailedMovie'
import Loader from '../Loader/Loader'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

interface IAdminMovieProps {
  movie: ICRUDMovie
  className?: string
}

const AdminMovie = ({ movie, className: propsClassName }: IAdminMovieProps) => {
  const createdAt = new Date(movie.createdAt)
  const updatedAt = new Date(movie.updatedAt)
  const { t } = useTranslation('admin', { keyPrefix: 'admin-movie' })
  const { locale } = useRouter()
  const [showModal, setShowModal] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [detailedMovie, setDetailedMovie] = useState<ICRUDDetailedMovie | null>(
    null
  )

  const handleShowDetails = async () => {
    setIsLoading(true)
    try {
      const response = await customAxios.get<ICRUDDetailedMovie>(
        `/films/${movie.id}`
      )
      const film = response.data
      setIsLoading(false)
      setDetailedMovie(film)
      setShowModal(true)
    } catch (error: any) {
      setIsLoading(false)
      toast.error(error)
    }
  }

  return (
    <fieldset className={`${styles.wrapper} ${propsClassName}`}>
      <legend className={styles.legend}>
        <span>
          ID: <span className={styles.info__item__value}>{movie.id}</span>
        </span>
        <span>
          {t('created-at')}:{' '}
          <span className={styles.info__item__value}>
            {`${createdAt?.toLocaleDateString()}, ${createdAt?.toLocaleTimeString()}`}
          </span>
        </span>
        <span>
          {t('updated-at')}:{' '}
          <span className={styles.info__item__value}>
            {`${updatedAt?.toLocaleDateString()}, ${updatedAt?.toLocaleTimeString()}`}
          </span>
        </span>
      </legend>
      <div className={styles.left}>
        <div className={styles.image__wrapper}>
          <Image
            src={`http:${movie.mainImg}` || ''}
            alt='Poster'
            height={100}
            width={130}
            className={styles.image}
          />
        </div>
        {isLoading ? (
          <Loader />
        ) : (
          <div
            className={styles.details}
            onClick={() => {
              handleShowDetails()
            }}
          >
            {t('show-more')}
          </div>
        )}
      </div>
      <div className={styles.info}>
        <div className={`${styles.info__row} ${styles.info__row_1}`}>
          <p className={styles.info__item}>
            {t('title')}:{' '}
            <span className={styles.info__item__value}>
              {movie.name || '-'}
            </span>
          </p>
          <p className={styles.info__item}>
            {t('title-eng')}:{' '}
            <span className={styles.info__item__value}>
              {' '}
              {movie.name_en || '-'}
            </span>
          </p>
        </div>
        <div className={`${styles.info__row} ${styles.info__row_2}`}>
          <p className={styles.info__item}>
            {t('year')}:{' '}
            <span className={styles.info__item__value}>
              {movie.year || '-'}
            </span>
          </p>
          <p className={styles.info__item}>
            {t('type')}:{' '}
            <span className={styles.info__item__value}>
              {movie.type || '-'}
            </span>
          </p>
          <p className={styles.info__item}>
            {t('countries')}:{' '}
            <span className={styles.info__item__value}>
              {movie.countries
                .map(country => {
                  return country.name
                })
                .join(', ') || '-'}
            </span>
          </p>
          <p className={styles.info__item}>
            {t('genres')}:{' '}
            <span className={styles.info__item__value}>
              {movie.genres
                .map(genre => {
                  return locale === 'ru' ? genre.name : genre.name_en
                })
                .filter(str => {
                  return str
                })
                .join(', ') || '-'}
            </span>
          </p>
        </div>
        <div className={`${styles.info__row} ${styles.info__row_3}`}>
          <p className={styles.info__item}>
            {t('score')}:{' '}
            <span className={styles.info__item__value}>
              {movie.scoreAVG || '-'}
            </span>
          </p>
          <p className={styles.info__item}>
            {t('budget')}:{' '}
            <span className={styles.info__item__value}>
              {escapeHtmlNbsp(movie.budget || '-')}
            </span>
          </p>
          <p className={styles.info__item}>
            {t('premiere')}:{' '}
            <span className={styles.info__item__value}>
              {movie.premiere || '-'}
            </span>
          </p>
          <p className={styles.info__item}>
            {t('premiere-ru')}:{' '}
            <span className={styles.info__item__value}>
              {movie.premiereRU || '-'}
            </span>
          </p>
        </div>
        <div className={`${styles.info__row} ${styles.info__row_4}`}>
          <p className={styles.info__item}>
            {t('fees-ru')}:{' '}
            <span className={styles.info__item__value}>
              {escapeHtmlNbsp(movie.feesRU || '-')}
            </span>
          </p>
          <p className={styles.info__item}>
            {t('fees-usa')}:{' '}
            <span className={styles.info__item__value}>
              {escapeHtmlNbsp(movie.feesUS || '-')}
            </span>
          </p>
          <p className={styles.info__item}>
            {t('fees-world')}:{' '}
            <span className={styles.info__item__value}>
              {escapeHtmlNbsp(movie.fees || '-')}
            </span>
          </p>
        </div>

        <div className={`${styles.info__row} ${styles.info__row_5}`}>
          <p className={styles.info__item}>
            {t('age')}:{' '}
            <span className={styles.info__item__value}>{movie.age || '-'}</span>
          </p>
          <p className={styles.info__item}>
            {t('mpaa')}:{' '}
            <span className={styles.info__item__value}>
              {movie.ratingMPAA || '-'}
            </span>
          </p>
          <p className={styles.info__item}>
            {t('runtime')}:{' '}
            <span className={styles.info__item__value}>
              {movie.time || '-'}
            </span>
          </p>
        </div>
        <div className={`${styles.info__row} ${styles.info__row_6}`}>
          <p className={styles.info__item}>
            {t('tagline')}:{' '}
            <span className={styles.info__item__value}>
              {movie.tagline || '-'}
            </span>
          </p>
        </div>

        <div className={`${styles.info__row} ${styles.info__row_7}`}>
          <p className={styles.info__item}>
            {t('description')}:{' '}
            <span className={styles.info__item__value}>
              {movie.description || '-'}
            </span>
          </p>
        </div>
        <div className={`${styles.info__row} ${styles.info__row_8}`}>
          <p className={styles.info__item}>
            {t('release-dvd')}:{' '}
            <span className={styles.info__item__value}>
              {movie.releaseDVD || '-'}
            </span>
          </p>
          <p className={styles.info__item}>
            {t('release-bluray')}:{' '}
            <span className={styles.info__item__value}>
              {movie.releaseBluRay || '-'}
            </span>
          </p>
        </div>
      </div>
      <ModalWindow
        isShow={showModal}
        closeFunc={() => {
          setShowModal(false)
        }}
      >
        {detailedMovie && (
          <AdminDetailedMovie
            movie={detailedMovie}
            className={styles.detailedmodal}
          />
        )}
      </ModalWindow>
    </fieldset>
  )
}

export default AdminMovie
