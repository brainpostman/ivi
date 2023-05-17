import BasicBtn from '@/components/UI/BasicBtn/BasicBtn'
import { SlDiamond } from 'react-icons/sl'
import { TbCertificate } from 'react-icons/tb'
import HeaderMobileFooter from './HeaderMobileFooter/HeaderMobileFooter'
import HeaderMobileMiddle from './HeaderMobileMiddle/HeaderMobileMiddle'
import style from './HeaderMoreBlock.module.scss'

const HeaderMoreBlock = () => {
  return (
    <article className={style.wrapper}>
      <div className={style.container}>
        <div className={style.top_buttons}>
          <BasicBtn btnType='icon' title='Подключить подписку' circle>
            <SlDiamond />
          </BasicBtn>
          <BasicBtn btnType='icon' title='Активация сертификата'>
            <TbCertificate />
          </BasicBtn>
        </div>

        <HeaderMobileMiddle />

        <nav className={style.ivi}>
          <p>Иви.Рейтинг фильмы</p>
          <p>Иви.Рейтинг сериалы</p>
        </nav>

        <HeaderMobileFooter />
      </div>
    </article>
  )
}

export default HeaderMoreBlock
