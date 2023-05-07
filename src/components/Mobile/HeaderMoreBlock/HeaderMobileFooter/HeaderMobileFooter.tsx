import FooterSocials from '@/components/Footer/FooterSocials/FooterSocials'
import BasicBtn from '@/components/UI/BasicBtn/BasicBtn'
import { useState } from 'react'
import { BiDevices, BiMessage } from 'react-icons/bi'
import { FaTv } from 'react-icons/fa'
import { GoMail } from 'react-icons/go'
import { FiPhone } from 'react-icons/fi'
import { MdArrowBackIosNew, MdMonitor } from 'react-icons/md'
import { RxInfoCircled } from 'react-icons/rx'
import styleParent from '../HeaderMoreBlock.module.scss'
import style from './HeaderMobileFooter.module.scss'

const HeaderMobileFooter = () => {
  const [isExpandAbout, setIsExpandAbout] = useState(false)
  const [isExpandSupport, setIsExpandSupport] = useState(false)

  const onClickAbout = () => setIsExpandAbout(prev => !prev)
  const onClickSupport = () => setIsExpandSupport(prev => !prev)

  return (
    <div className={style.wrapper}>
      <ul>
        <li onClick={onClickAbout}>
          <div className={style.about_us}>
            <RxInfoCircled />
            <p>О нас</p>
            <MdArrowBackIosNew
              className={`${styleParent.arrow} ${
                isExpandAbout ? styleParent.arrow_active : ''
              }`}
            />
          </div>

          {isExpandAbout && (
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

      <div className={style.support_block} onClick={onClickSupport}>
        <div className={style.support_block__button}>
          <BiMessage />
          <p>Служба поддержки</p>
          <MdArrowBackIosNew
            className={`${styleParent.arrow} ${
              isExpandSupport ? styleParent.arrow_active : ''
            }`}
          />
        </div>

        {isExpandSupport && (
          <div className={style.support_block__bottom}>
            <div className={style.support_block__info}>
              <p>Мы всегда готовы вам помочь</p>
              <p>Наши операторы онлайн 24/7</p>
            </div>

            <div className={style.support_block__buttons}>
              <BasicBtn className={style.write_button}>
                Написать в чате
              </BasicBtn>

              <div className={style.support_block__buttons_icon}>
                <BasicBtn btnType='icon'>
                  <GoMail />
                </BasicBtn>
                <BasicBtn btnType='icon'>
                  <FiPhone />
                </BasicBtn>
              </div>
            </div>

            <p className={style.ask}>ask.ivi.ru</p>
            <p className={style.gray}>Ответы на вопросы</p>
          </div>
        )}
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
