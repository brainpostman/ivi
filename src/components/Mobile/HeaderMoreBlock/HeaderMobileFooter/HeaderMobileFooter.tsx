import FooterSocials from '@/components/LayoutElements/Footer/FooterSocials/FooterSocials'
import BasicBtn from '@/components/UI/Buttons/BasicBtn/BasicBtn'
import { useState } from 'react'
import { BiDevices, BiMessage } from 'react-icons/bi'
import { FaTv } from 'react-icons/fa'
import { GoMail } from 'react-icons/go'
import { FiPhone } from 'react-icons/fi'
import { MdArrowBackIosNew, MdMonitor } from 'react-icons/md'
import { RxInfoCircled } from 'react-icons/rx'
import styleParent from '../HeaderMoreBlock.module.scss'
import style from './HeaderMobileFooter.module.scss'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'

const HeaderMobileFooter = () => {
  const { t } = useTranslation()

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
            <p>{t('footer:about-us.heading')}</p>
            <MdArrowBackIosNew
              className={`${styleParent.arrow} ${
                isExpandAbout ? styleParent.arrow_active : ''
              }`}
            />
          </div>

          {isExpandAbout && (
            <ul className={style.abouts_us_list}>
              {t('footer:about-us.links', { returnObjects: true }).map(link => (
                <li key={link.text}>
                  <Link href={link.url}>{link.text}</Link>
                </li>
              ))}
            </ul>
          )}
        </li>
        <li className={style.about_us}>
          <MdMonitor />
          <p>{t('header:right-side.profile-block.sign-in-by-code')}</p>
        </li>
      </ul>

      <div className={style.buttons}>
        <BasicBtn
          btnType='icon'
          title={t('footer:devices.smart-tv.title')}
          suptitle={t('footer:devices.smart-tv.subtitle')}
        >
          <FaTv />
        </BasicBtn>
        <BasicBtn btnType='icon' title={t('footer:devices.all-devices')}>
          <BiDevices />
        </BasicBtn>
      </div>

      <div className={style.support_block} onClick={onClickSupport}>
        <div className={style.support_block__button}>
          <BiMessage />
          <p>{t('footer:support.support-service')}</p>
          <MdArrowBackIosNew
            className={`${styleParent.arrow} ${
              isExpandSupport ? styleParent.arrow_active : ''
            }`}
          />
        </div>

        {isExpandSupport && (
          <div className={style.support_block__bottom}>
            <div className={style.support_block__info}>
              <p>{t('footer:support.we-ready')}</p>
              <p>{t('footer:support.online-24-7')}</p>
            </div>

            <div className={style.support_block__buttons}>
              <BasicBtn className={style.write_button}>
                {t('footer:support.chat')}
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
            <p className={style.gray}>{t('footer:support.qna')}</p>
          </div>
        )}
      </div>

      <div className={style.socials}>
        <FooterSocials />
      </div>

      <div className={style.info}>
        <p>{t('footer:copyright-ivi')}</p>
        <p>{t('footer:copyright-hbo')}</p>
      </div>
    </div>
  )
}

export default HeaderMobileFooter
