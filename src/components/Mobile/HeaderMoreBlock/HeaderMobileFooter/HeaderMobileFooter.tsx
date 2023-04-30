import FooterSocials from '@/components/Footer/FooterSocials/FooterSocials'
import BasicBtn from '@/components/UI/BasicBtn/BasicBtn'
import { useState } from 'react'
import { BiDevices, BiMessage } from 'react-icons/bi'
import { FaGoogle, FaTv } from 'react-icons/fa'
import { MdArrowBackIosNew, MdMonitor } from 'react-icons/md'
import { RxInfoCircled } from 'react-icons/rx'
import styleParent from '../HeaderMoreBlock.module.scss'
import style from './HeaderMobileFooter.module.scss'

const HeaderMobileFooter = () => {
  const [isSelectAbout, setIsSelectAbout] = useState(false)

  const onClickAbout = () => setIsSelectAbout(prev => !prev)

  return (
    <div className={style.wrapper}>
      <ul>
        <li onClick={onClickAbout}>
          <div className={style.about_us}>
            <RxInfoCircled />
            <p>О нас</p>
            <MdArrowBackIosNew
              className={`${styleParent.arrow} ${
                isSelectAbout ? styleParent.arrow_active : ''
              }`}
            />
          </div>

          {isSelectAbout && (
            <ul className={style.abouts_us_list}>
              <li>О компании</li>
              <li>Вакансии</li>
              <li>Программа бета-тестирования</li>
              <li>Размещение рекламы</li>
              <li>Пользовательское соглашение</li>
              <li>Политика конфиденциальности</li>
              <li>Комплаенс</li>
            </ul>
          )}
        </li>
        <li className={style.about_us}>
          <MdMonitor />
          <p>Вход по коду</p>
        </li>
      </ul>

      <div className={style.buttons}>
        <BasicBtn
          btnType='textPlusIcon'
          title='Smart TV'
          suptitle='Смотрите на'
        >
          <FaTv />
        </BasicBtn>
        <BasicBtn btnType='textPlusIcon' title='Все устройства'>
          <BiDevices />
        </BasicBtn>
      </div>

      <div className={style.support_button}>
        <BiMessage />
        <p>Служба поддержки</p>
        <MdArrowBackIosNew className={styleParent.arrow} />
      </div>

      <div className={style.socials}>
        <FooterSocials />
      </div>

      <div className={style.info}>
        <p>© 2023 ООО «Иви.ру»</p>
        <p>
          HBO ® and related service marks are the property of Home Box Office,
          Inc
        </p>
      </div>
    </div>
  )
}

export default HeaderMobileFooter
