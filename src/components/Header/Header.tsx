import { IHeaderBlock, IHeaderTab } from '@/types/header.interface'
import { useState } from 'react'
import style from './Header.module.scss'
import HeaderHoverBlock from './HeaderHoverBlock/HeaderHoverBlock'
import HeaderLeftSide from './HeaderLeftSide/HeaderLeftSide'
import HeaderRightSide from './HeaderRightSide/HeaderRightSide'

const Header = () => {
	const [hoverTabs, setHoverTabs] = useState<IHeaderBlock>({
		isShow: false,
		tab: undefined,
	})

	const classNameContainer =
		hoverTabs.isShow && hoverTabs.tab
			? `${style.container} ${style.effect}`
			: style.container

	const showHoverBlock = (filter: IHeaderTab) => {
		setHoverTabs({ isShow: true, tab: filter })
	}

	const hideHoverBlock = () => {
		setHoverTabs(prev => ({ ...prev, isShow: false }))
	}

	return (
		<header className={style.wrapper}>
			<section className={classNameContainer} onMouseLeave={hideHoverBlock}>
				<HeaderLeftSide
					showHoverBlock={showHoverBlock}
					hideHoverBlock={hideHoverBlock}
				/>
				<HeaderRightSide showHoverBlock={showHoverBlock} />
				{hoverTabs.isShow && hoverTabs.tab && (
					<HeaderHoverBlock
						hideHoverBlock={hideHoverBlock}
						tab={hoverTabs.tab}
					/>
				)}
			</section>
		</header>
	)
}

export default Header
