import { AiOutlineStar } from 'react-icons/ai'
import { BsBookmark, BsMagic } from 'react-icons/bs'
import { TiCancel } from 'react-icons/ti'
import style from './MovieCarouselControls.module.scss'

const MovieCarouselControls = () => {
	return (
		<ul className={style.wrapper}>
			<li>
				<BsBookmark />
				<p>Смотреть позже</p>
			</li>
			<li>
				<BsMagic />
				<p>Похожее</p>
			</li>
			<li>
				<AiOutlineStar />
				<p>Уже смотрел, оценить</p>
			</li>
			<li>
				<TiCancel />
				<p>Не нравится такое</p>
			</li>
		</ul>
	)
}

export default MovieCarouselControls
