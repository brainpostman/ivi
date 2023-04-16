import { IHeaderBlock, IHeaderFilter } from '@/types/header.interface'
import { useState } from 'react'
import style from './Header.module.scss'
import HeaderHoverBlock from './HeaderHoverBlock/HeaderHoverBlock'
import HeaderLeftSide from './HeaderLeftSide/HeaderLeftSide'
import HeaderRightSide from './HeaderRightSide/HeaderRightSide'

const Header = () => {
	const [headerBlock, setHeaderBlock] = useState<IHeaderBlock>({
		isShow: false,
		filter: undefined,
	})

	const classNameContainer =
		headerBlock.isShow && headerBlock.filter
			? `${style.container} ${style.effect}`
			: style.container

	const showHoverBlock = (filter: IHeaderFilter) => {
		setHeaderBlock({ isShow: true, filter: filter })
	}

	const hideHoverBlock = () => {
		setHeaderBlock({ filter: undefined, isShow: false })
	}

	return (
		<header className={style.wrapper}>
			<section className={classNameContainer} onMouseLeave={hideHoverBlock}>
				<HeaderLeftSide showHoverBlock={showHoverBlock} />
				<HeaderRightSide />
				{headerBlock.isShow && headerBlock.filter && (
					<HeaderHoverBlock
						hideHoverBlock={hideHoverBlock}
						filter={headerBlock.filter}
					/>
				)}
			</section>
		</header>
	)
}

export default Header
