import { headerMobileTabs } from '@/data/headerMobile.data'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { IoCloseOutline } from 'react-icons/io5'
import HeaderMoreBlock from '../HeaderMoreBlock/HeaderMoreBlock'
import style from './HeaderMobile.module.scss'

const HeaderMobile = () => {
  const router = useRouter()

  const onClickMore = () => {
    router.push({ query: { navigation: '' } }, undefined, { shallow: true })
  }

  const isSelectMore = Object.keys(router.query).some(
    query => query === 'navigation'
  )

  return (
    <section className={style.wrapper}>
      <article className={style.container}>
        <ul className={style.nav}>
          {headerMobileTabs.slice(0, -1).map(tab => (
            <li key={tab.title}>
              <Link
                href={tab.href}
                className={
                  tab.href === router.pathname && !isSelectMore
                    ? style.active
                    : ''
                }
              >
                {tab.icon}
                <p>{tab.title}</p>
              </Link>
            </li>
          ))}
          <li>
            <div
              onClick={onClickMore}
              className={isSelectMore ? style.active : ''}
            >
              {isSelectMore ? (
                <IoCloseOutline />
              ) : (
                headerMobileTabs.at(-1)?.icon
              )}
              <p>{headerMobileTabs.at(-1)?.title}</p>
            </div>
          </li>
        </ul>
      </article>
      {isSelectMore && <HeaderMoreBlock />}
    </section>
  )
}

export default HeaderMobile
