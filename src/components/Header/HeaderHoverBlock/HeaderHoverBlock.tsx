import { headerHoverBlockContent } from '@/data/headerHoverBlock.data'
import { IHeaderTab } from '@/types/header.interface'
import { DetailedHTMLProps, FC, HTMLAttributes } from 'react'
import style from './HeaderHoverBlock.module.scss'
import HeaderProfileBlock from './HeaderProfileBlock/HeaderProfileBlock'
import HeaderTvBlock from './HeaderTvBlock/HeaderTvBlock'
import HeaderWatchBlock from './HeaderWatchBlock/HeaderWatchBlock'
import HeaderMovieBlock from './HedaerMovieBlock/HeaderMovieBlock'
import HoverTabBlock from './HoverFilterBlock/HoverTabBlock'

interface IProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {
  tab: IHeaderTab
}

const HeaderHoverBlock: FC<IProps> = ({ tab, ...props }) => {
  const tabList: IHeaderTab[] = ['movies', 'series', 'cartoons']

  const tabsWithMovieBlock: IHeaderTab[] = [
    'movies',
    'series',
    'cartoons',
    'TV+',
  ]

  const currentBlock = headerHoverBlockContent.find(block => block.tab === tab)

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
