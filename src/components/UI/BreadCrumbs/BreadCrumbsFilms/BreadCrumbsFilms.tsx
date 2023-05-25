import { FC } from 'react'
import style from './BreadCrumbsFilms.module.scss'
import Link from 'next/link'

interface IProps {
  genres?: string
}

const BreadCrumbsFilms: FC<IProps> = ({ genres }) => {
  const FilmsNav = () =>
    genres ? <Link href='/movies'>Фильмы</Link> : <p>Фильмы</p>

  return (
    <nav className={style.list}>
      <Link href='/'>Мой иви</Link>
      <FilmsNav />
      {genres && <p>{genres}</p>}
    </nav>
  )
}

export default BreadCrumbsFilms
