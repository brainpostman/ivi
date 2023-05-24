import { headerMobileIcons } from '@/data/headerMobile.data'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { IoCloseOutline } from 'react-icons/io5'
import HeaderMoreBlock from '../HeaderMoreBlock/HeaderMoreBlock'
import style from './HeaderMobile.module.scss'
import { useState } from 'react'
import { useTranslation } from 'next-i18next'

const HeaderMobile = () => {
  const router = useRouter()

  const { t } = useTranslation('header', { keyPrefix: 'mobile' })

  const [isSelectMore, setIsSelectMore] = useState(false)

  const onClickMore = () => setIsSelectMore(prev => !prev)

  return (
    <section className={style.wrapper}>
      <article className={style.container}>
        <ul className={style.nav}>
          {t('nav', { returnObjects: true })
            .slice(0, -1)
            .map((tab, index) => (
              <li key={tab.title}>
                <Link
                  href={tab.href}
                  className={
                    tab.href === router.pathname && !isSelectMore
                      ? style.active
                      : ''
                  }
                >
                  {headerMobileIcons[index]}
                  <p>{tab.title}</p>
                </Link>
              </li>
            ))}
          <li>
            <div
              onClick={onClickMore}
              className={isSelectMore ? style.active : ''}
            >
              {isSelectMore ? <IoCloseOutline /> : headerMobileIcons.at(-1)}
              <p>{t('nav', { returnObjects: true }).at(-1)?.title}</p>
            </div>
          </li>
        </ul>
      </article>
      {isSelectMore && <HeaderMoreBlock />}
    </section>
  )
}

export default HeaderMobile
