import Link from 'next/link'
import style from './BreadCrumbsSpecificFilm.module.scss'
import { FC } from 'react'
import { formatCapitalize } from '@/formatters/capitalize.format'
import { useRouter } from 'next/router'

interface IProps {
  genre: string
}

const BreadCrumbsSpecificFilm: FC<IProps> = ({ genre }) => {
  const router = useRouter()

  const onClickGenre = () =>
    router.push({ pathname: '/movies', query: { genres: genre } }, undefined, {
      shallow: true,
    })

  return (
    <nav className={style.list}>
      <Link href='/movies'>Фильмы</Link>
      <p onClick={onClickGenre}>{formatCapitalize(genre)}</p>
    </nav>
  )
}

export default BreadCrumbsSpecificFilm
