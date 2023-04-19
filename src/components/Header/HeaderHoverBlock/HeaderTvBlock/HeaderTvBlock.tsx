import BasicBtn from '@/components/UI/BasicBtn/BasicBtn'
import { listTV } from '@/data/headerTVBlock.data'
import HeaderChannels from '../HeaderChannels/HeaderChannels'
import HeaderPopularBroadCasts from '../HeaderPopularBroadcasts/HeaderPopularBroadcasts'
import style from './HeaderTvBlock.module.scss'

const HeaderTvBlock = () => {
	return (
		<div className={style.wrapper}>
			{/*LEFT SIDE*/}
			<div className={style.leftSide}>
				<ul className={style.list}>
					{listTV.map(el => (
						<li key={el} className='text'>
							{el}
						</li>
					))}
				</ul>

				<BasicBtn
					className={style.tvProgramBtn}
					href='https://www.ivi.ru/tvplus/tv-schedule-today'
				>
					Телепрограмма
				</BasicBtn>
			</div>

			{/*MIDDLE SIDE*/}
			<div className={style.middleSide}>
				<HeaderChannels />
				<HeaderPopularBroadCasts />
			</div>
		</div>
	)
}

export default HeaderTvBlock
