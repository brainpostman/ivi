import HeaderIconButton from '@/components/UI/HeaderIconButton/HeaderIconButton'
import SubscribeButton from '@/components/UI/SubscribeButton/SubscribeButton'
import { IHeaderTab } from '@/types/header.interface'
import { FC } from 'react'
import { IoPersonOutline } from 'react-icons/io5'
import { MdOutlineNotifications } from 'react-icons/md'
import { RiSearchLine } from 'react-icons/ri'
import style from './HeaderRightSide.module.scss'

interface IProps {
	showHoverBlock: (tab: IHeaderTab) => void
}

const HeaderRightSide: FC<IProps> = ({ showHoverBlock }) => {
	const classNamePersonIcon = `text ${style.personIcon}`

	return (
		<article className={style.wrapper}>
			<SubscribeButton>Оплатить подписку</SubscribeButton>
			<HeaderIconButton icon={<RiSearchLine />}>Поиск</HeaderIconButton>
			<HeaderIconButton
				icon={<MdOutlineNotifications className={style.notifIcon} />}
			/>
			<IoPersonOutline
				className={classNamePersonIcon}
				onMouseEnter={() => showHoverBlock('profile')}
			/>
		</article>
	)
}

export default HeaderRightSide
