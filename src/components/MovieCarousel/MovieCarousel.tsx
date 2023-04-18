import { IMovieCarouselElem } from '@/types/moviecarousel.interface'
import { getCarouselFunctions } from '@/utils/carousel.util'
import Image from 'next/image'
import { FC, useState } from 'react'
import { MdArrowBackIosNew } from 'react-icons/md'
import style from './MovieCarousel.module.scss'
import MovieCarouselControls from './MovieCarouselControls/MovieCarouselControls'
import MovieCarouselInfo from './MovieCarouselInfo/MovieCarouselInfo'

// @elementsView - Количество элементов, которые отображаются в карусели (указываем на 1 элемент меньше)
// @elemntsMove - Количество элементов, на которое мы двигаем карусель
// @elementLen - полная длина элемента, включая отступ
// @blockList - данные для элементов карусели

const elementsView = 6
const elementsMove = 6
const elementLen = 153 + 24

interface IProps {
	title: string
	movieList: IMovieCarouselElem[]
}

const MovieCarousel: FC<IProps> = ({ title, movieList }) => {
	const [move, setMove] = useState(0)

	const translate = `translate3d(-${move}px, 0, 0)`

	const { onClickRightArrow, onClickLeftArrow, viewArrow } =
		getCarouselFunctions(
			move,
			setMove,
			elementLen,
			elementsMove,
			elementsView,
			[...movieList, { title: 'viewAllBlock' }]
		)

	return (
		<article>
			<div className={style.wrapperTitle}>
				<h1>{title}</h1>
				<MdArrowBackIosNew />
			</div>

			<div className={style.wrapperCarousel}>
				<div className={style.container}>
					<ul className={style.list} style={{ transform: translate }}>
						{movieList.map(block => (
							<li key={block.id}>
								<div className={style.wrapperImg}>
									<Image
										src={block.img}
										alt='movie'
										className={style.img}
										width={153}
										height={235}
									/>
								</div>
								<div className={style.hoverBlock}>
									<MovieCarouselControls />
									<MovieCarouselInfo block={block} />
								</div>
								<div>
									<p className={style.infoTitle}>{block.title}</p>
									<p
										className={
											block.isFree
												? style.infoSubtitle
												: `${style.infoSubtitle} ${style.notFree}`
										}
									>
										{block.isFree ? 'Бесплатно' : 'Подписка'}
									</p>
								</div>
							</li>
						))}
						<li className={style.viewAll}>Посмотреть всё</li>
					</ul>
					<div className={style.arrows}>
						<div onClick={onClickLeftArrow} className={viewArrow('left')}>
							<MdArrowBackIosNew />
						</div>
						<div onClick={onClickRightArrow} className={viewArrow('right')}>
							<MdArrowBackIosNew />
						</div>
					</div>
				</div>
			</div>
		</article>
	)
}

export default MovieCarousel
