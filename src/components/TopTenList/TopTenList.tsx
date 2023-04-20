import { topTenListData } from '@/data/topTenList.data'
import { getCarouselFunctions } from '@/utils/carousel.util'
import Image from 'next/image'
import React, { useState } from 'react'
import { MdArrowBackIosNew } from 'react-icons/md'
import style from './TopTenList.module.scss'

const imgNumbers = [
	'https://solea-parent.dfs.ivi.ru/picture/bypass/number1.svg',
	'https://solea-parent.dfs.ivi.ru/picture/bypass/number2.svg',
	'https://solea-parent.dfs.ivi.ru/picture/bypass/number3.svg',
	'https://solea-parent.dfs.ivi.ru/picture/bypass/number4.svg',
	'https://solea-parent.dfs.ivi.ru/picture/bypass/number5.svg',
	'https://solea-parent.dfs.ivi.ru/picture/bypass/number6.svg',
	'https://solea-parent.dfs.ivi.ru/picture/bypass/number7.svg',
	'https://solea-parent.dfs.ivi.ru/picture/bypass/number8.svg',
	'https://solea-parent.dfs.ivi.ru/picture/bypass/number9.svg',
	'https://solea-parent.dfs.ivi.ru/picture/bypass/number10.svg',
]

const TopTenList: React.FC = () => {
	const [move, setMove] = useState(0)

	const translate = `translate3d(-${move}px, 0, 0)`

	const { onClickLeftArrow, onClickRightArrow, viewArrow } =
		getCarouselFunctions(move, setMove, 224 + 24, 5, 5, topTenListData)

	return (
		<div className={style.wrapper}>
			<div className={style.title}>
				<Image
					src='https://solea-parent.dfs.ivi.ru/picture/bypass/top10.svg'
					alt='top10'
					width={116}
					height={28}
				/>
				<span>за неделю</span>
			</div>

			<div className={style.container}>
				<ul className={style.list} style={{ transform: translate }}>
					{topTenListData.map((movie, index) => (
						<li key={movie.title}>
							<Image
								src={movie.img}
								alt={movie.title}
								width={224}
								height={457}
							/>

							<Image
								src={imgNumbers[index]}
								alt='number'
								className={style.number}
								width={48}
								height={66}
							/>

							<div className={style.shadow}></div>
						</li>
					))}
				</ul>
			</div>
			<div className={style.arrows}>
				<div onClick={onClickLeftArrow} className={viewArrow('left')}>
					<MdArrowBackIosNew />
				</div>
				<div onClick={onClickRightArrow} className={viewArrow('right')}>
					<MdArrowBackIosNew />
				</div>
			</div>
		</div>
	)
}
export default TopTenList
