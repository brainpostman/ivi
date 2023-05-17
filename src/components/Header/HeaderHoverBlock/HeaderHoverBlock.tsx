import { DetailedHTMLProps, FC, HTMLAttributes } from 'react'
import { IHeaderTab } from '@/types/header.interface'
import style from './HeaderHoverBlock.module.scss'
import HeaderProfileBlock from './HeaderProfileBlock/HeaderProfileBlock'
import HeaderTvBlock from './HeaderTvBlock/HeaderTvBlock'
import HeaderWatchBlock from './HeaderWatchBlock/HeaderWatchBlock'
import HeaderMovieBlock from './HeaderMovieBlock/HeaderMovieBlock'
import HoverTabBlock from './HoverFilterBlock/HoverTabBlock'
import { useTranslation } from 'next-i18next'
import { IHeaderHoverBlockContent } from '@/types/hoverblock.interface'
import { novetlyFilterData } from '@/data/filters.data'
import { IFilterGetResponse } from '@/types/filters.interface'

interface IProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {
  tab: IHeaderTab
  hideHoverBlock: () => void
  genres: IFilterGetResponse[]
  countries: IFilterGetResponse[]
}

const HeaderHoverBlock: FC<IProps> = ({
  tab,
  hideHoverBlock,
  genres,
  countries,
  ...props
}) => {
  const { t } = useTranslation('header', { keyPrefix: 'left-side' })

  const tabList: IHeaderTab[] = ['movies', 'series', 'cartoons']

  const tabsWithMovieBlock: IHeaderTab[] = [
    'movies',
    'series',
    'cartoons',
    'TV+',
  ]

  const currentBlock: IHeaderHoverBlockContent = {
    tab,
    columns: [
      { title: 'Жанры', filter: 'genres', rows: genres.slice(0, 22) },
      {
        title: 'Страны',
        filter: 'countries',
        rows: countries.slice(0, 22),
      },
      { rows: novetlyFilterData },
    ],
  }

  return (
    <article className={style.wrapper} {...props}>
      {tabList.includes(tab) ? (
        <HoverTabBlock currentBlock={currentBlock} />
      ) : tab === 'TV+' ? (
        <HeaderTvBlock />
      ) : tab === 'profile' ? (
        <HeaderProfileBlock />
      ) : tab === 'watch' ? (
        <HeaderWatchBlock />
      ) : (
        <></>
      )}
      {tabsWithMovieBlock.includes(tab) && <HeaderMovieBlock />}
    </article>
  )
}

export default HeaderHoverBlock
