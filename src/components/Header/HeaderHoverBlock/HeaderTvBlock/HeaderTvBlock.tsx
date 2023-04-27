import BasicBtn from '@/components/UI/BasicBtn/BasicBtn'
import { listTV } from '@/data/headerTVBlock.data'
import HeaderChannels from '../HeaderChannels/HeaderChannels'
import HeaderPopularBroadCasts from '../HeaderPopularBroadcasts/HeaderPopularBroadcasts'
import style from './HeaderTvBlock.module.scss'

const HeaderTvBlock = () => {
  return (
    <div className={style.wrapper}>
      {/*LEFT SIDE*/}
      <div className={style.left_side}>
        <ul className={style.list}>
          {listTV.map(el => (
            <li key={el} className='text'>
              {el}
            </li>
          ))}
        </ul>

        <BasicBtn
          className={style.tv_program_btn}
          href='https://www.ivi.ru/tvplus/tv-schedule-today'
        >
          Телепрограмма
        </BasicBtn>
      </div>

      {/*MIDDLE SIDE*/}
      <div className={style.middle_side}>
        <HeaderChannels />
        <HeaderPopularBroadCasts />
      </div>
    </div>
  )
}

export default HeaderTvBlock
