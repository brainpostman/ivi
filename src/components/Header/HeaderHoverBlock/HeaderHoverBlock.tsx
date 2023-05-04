import { IHeaderTab } from '@/types/header.interface'
import { DetailedHTMLProps, FC, HTMLAttributes } from 'react'
import style from './HeaderHoverBlock.module.scss'
import HeaderProfileBlock from './HeaderProfileBlock/HeaderProfileBlock'
import HeaderTvBlock from './HeaderTvBlock/HeaderTvBlock'
import HeaderWatchBlock from './HeaderWatchBlock/HeaderWatchBlock'
import HeaderMovieBlock from './HeaderMovieBlock/HeaderMovieBlock'
import HoverTabBlock from './HoverFilterBlock/HoverTabBlock'
import { useTranslation } from 'next-i18next'

interface IProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {
  tab: IHeaderTab
  hideHoverBlock: () => void
}

const HeaderHoverBlock: FC<IProps> = ({ tab, hideHoverBlock, ...props }) => {
  const { t } = useTranslation('header', { keyPrefix: 'left-side' })

  const tabList: IHeaderTab[] = ['movies', 'series', 'cartoons']

  const tabsWithMovieBlock: IHeaderTab[] = [
    'movies',
    'series',
    'cartoons',
    'TV+',
  ]

  const currentBlock = t('lists', { returnObjects: true }).find(
    block => (block.tab as IHeaderTab) === tab
  )

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
