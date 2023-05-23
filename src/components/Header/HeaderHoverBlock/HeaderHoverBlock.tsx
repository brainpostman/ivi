import { DetailedHTMLProps, FC, HTMLAttributes } from 'react'
import { IHeaderTab } from '@/types/header.interface'
import style from './HeaderHoverBlock.module.scss'
import HeaderProfileBlock from './HeaderProfileBlock/HeaderProfileBlock'
import HeaderTvBlock from './HeaderTvBlock/HeaderTvBlock'
import HeaderWatchBlock from './HeaderWatchBlock/HeaderWatchBlock'
import HeaderMovieBlock from './HeaderMovieBlock/HeaderMovieBlock'
import HoverTabBlock from './HoverFilterBlock/HoverTabBlock'
import { IHeaderHoverBlockContent } from '@/types/hoverblock.interface'
import { IFilterGetResponse } from '@/types/filters.interface'
import { IMovie } from '@/types/films.api.interface'
import { useTranslation } from 'next-i18next'

interface IProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {
  tab: IHeaderTab
  hideHoverBlock: () => void
  genres: IFilterGetResponse[]
  countries: IFilterGetResponse[]
  films: IMovie[]
}

const HeaderHoverBlock: FC<IProps> = ({
  tab,
  hideHoverBlock,
  genres,
  countries,
  films,
  ...props
}) => {
  const { t } = useTranslation('header')

  const tabList: IHeaderTab[] = ['movies', 'series', 'cartoons']

  const tabsWithMovieBlock: IHeaderTab[] = [
    'movies',
    'series',
    'cartoons',
    'TV+',
  ]

  console.log(t('left-side.novetly', { returnObjects: true }))

  const currentBlock: IHeaderHoverBlockContent = {
    tab,
    columns: [
      { title: t('genres'), filter: 'genres', rows: genres.slice(0, 22) },
      {
        title: t('countries'),
        filter: 'countries',
        rows: countries.slice(0, 22),
      },
      {
        rows: t('left-side.novetly', { returnObjects: true }).map(
          (novetly, index) => ({
            ...novetly,
            id: index + 1,
          })
        ),
      },
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
      {tabsWithMovieBlock.includes(tab) && <HeaderMovieBlock films={films} />}
    </article>
  )
}

export default HeaderHoverBlock
