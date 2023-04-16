import { headerHoverBlockContent } from '@/data/headerHoverBlock.data'
import { IHeaderFilter } from '@/types/header.interface'
import { FC } from 'react'
import style from './HeaderHoverBlock.module.scss'
import HeaderTvBlock from './HeaderTvBlock/HeaderTvBlock'
import HoverFilterBlock from './HoverFilterBlock/HoverFilterBlock'

interface IProps {
	filter: IHeaderFilter
	hideHoverBlock: () => void
}

const HeaderHoverBlock: FC<IProps> = ({ hideHoverBlock, filter }) => {
	const filterList: IHeaderFilter[] = ['films', 'series', 'cartoons']

	const currentBlock = headerHoverBlockContent.find(
		block => block.filter === filter
	)

	// TODO: сделать контент для TV+
	return (
		<article className={style.wrapper} onMouseLeave={hideHoverBlock}>
			{filterList.includes(filter) ? (
				<HoverFilterBlock currentBlock={currentBlock} />
			) : (
				<HeaderTvBlock />
			)}
			<div className={style.movieBlock}></div>
		</article>
	)
}

export default HeaderHoverBlock
