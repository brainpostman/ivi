import { IHeaderFilter } from '@/types/header.interface'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import style from './HeaderLeftSide.module.scss'

const logoSrc =
	'https://solea-parent.dfs.ivi.ru/picture/ea003d,ffffff/reposition_iviLogoPlateRounded.svg'

interface IProps {
	showHoverBlock: (filter: IHeaderFilter) => void
}

const HeaderLeftSide: FC<IProps> = ({ showHoverBlock }) => {
	return (
		<article className={style.wrapper}>
			<Link href='/' className={style.logo}>
				<Image src={logoSrc} alt='logo' width={66} height={72} />
			</Link>

			<nav className={style.nav}>
				<Link href='/'>Мой Иви</Link>
				<Link href='/' onMouseEnter={() => showHoverBlock(undefined)}>
					Что нового
				</Link>
				<Link href='/' onMouseEnter={() => showHoverBlock('films')}>
					Фильмы
				</Link>
				<Link href='/' onMouseEnter={() => showHoverBlock('series')}>
					Сериалы
				</Link>
				<Link href='/' onMouseEnter={() => showHoverBlock('cartoons')}>
					Мультфильмы
				</Link>
				<Link href='/' onMouseEnter={() => showHoverBlock('TV+')}>
					TV+
				</Link>
			</nav>
		</article>
	)
}

export default HeaderLeftSide
