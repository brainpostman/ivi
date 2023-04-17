import { headerHoverBlockContent } from '@/data/headerHoverBlock.data'
import { IHeaderTab } from '@/types/header.interface'
import { FC } from 'react'
import style from './HeaderHoverBlock.module.scss'
import HeaderProfileBlock from './HeaderProfileBlock/HeaderProfileBlock'
import HeaderTvBlock from './HeaderTvBlock/HeaderTvBlock'
import HeaderMovieBlock from './HedaerMovieBlock/HedaerMovieBlock'
import HoverFilterBlock from './HoverFilterBlock/HoverFilterBlock'

interface IProps {
	tab: IHeaderTab
	hideHoverBlock: () => void
}

const HeaderHoverBlock: FC<IProps> = ({ hideHoverBlock, tab }) => {
	const tabList: IHeaderTab[] = ['films', 'series', 'cartoons']

	const tabsWithMovieBlock: IHeaderTab[] = [
		'films',
		'series',
		'cartoons',
		'TV+',
	]

	const currentBlock = headerHoverBlockContent.find(block => block.tab === tab)

	return (
		<article className={style.wrapper} onMouseLeave={hideHoverBlock}>
			{tabList.includes(tab) ? (
				<HoverFilterBlock currentBlock={currentBlock} />
			) : tab === 'TV+' ? (
				<HeaderTvBlock />
			) : tab === 'profile' ? (
				<HeaderProfileBlock />
			) : (
				<></>
			)}
			{tabsWithMovieBlock.includes(tab) && <HeaderMovieBlock />}
		</article>
	)
}

export default HeaderHoverBlock
