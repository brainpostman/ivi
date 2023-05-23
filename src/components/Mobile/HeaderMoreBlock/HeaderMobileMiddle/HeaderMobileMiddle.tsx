import BasicBtn from '@/components/UI/BasicBtn/BasicBtn'
import { getHeaderMobileMiddleContent } from '@/data/headerMobile.data'
import Image from 'next/image'
import Link from 'next/link'
import { useContext, useState } from 'react'
import { MdArrowBackIosNew } from 'react-icons/md'
import styleParent from '../HeaderMoreBlock.module.scss'
import style from './HeaderMobileMiddle.module.scss'
import { FiltersContext } from '@/contexts/filters.context'
import LanguageChanger from '@/components/LanguageSwitcher/LanguageSwitcher'
import { useTranslation } from 'react-i18next'
import { formatSplitArray } from '@/formatters/splitArray.format'

const HeaderMobileMiddle = () => {
  const { countries, genres } = useContext(FiltersContext)

  const { t } = useTranslation('header')

  const [contentLists, setContentLists] = useState(
    getHeaderMobileMiddleContent({ genres, countries, t }).map(el => ({
      ...el,
      isSelect: false,
    }))
  )

  const onClickContentListEl = (title: string) => () => {
    const copy = [...contentLists]
    const currentElement = copy.find(el => el.title === title)
    if (!currentElement) return
    currentElement.isSelect = !currentElement.isSelect

    setContentLists(copy)
  }

  return (
    <div className={style.wrapper}>
      <LanguageChanger className={style.language_changer} />
      <nav className={style.nav}>
        <p>
          <Link href='/'>{t('mobile.middle.my-ivi')}</Link>
        </p>
        <p>
          <Link href='https://www.ivi.ru/new'>
            {t('mobile.middle.whats-new')}
          </Link>
        </p>
      </nav>

      <ul className={style.list}>
        {contentLists.map(element => (
          <li key={element.title}>
            <div
              className={style.tab}
              onClick={onClickContentListEl(element.title)}
            >
              {element.icon}
              <p>{element.title}</p>
              <MdArrowBackIosNew
                className={`${styleParent.arrow} ${
                  element.isSelect ? styleParent.arrow_active : ''
                }`}
              />
            </div>

            {element.isSelect &&
              (element.title !== 'TV+' ? (
                <div className={style.lists}>
                  <p className={style.lists__title}>{element.listTitle}</p>
                  <ul className={style.inner_lists}>
                    {element.lists.map(list => (
                      <li key={list.query}>
                        {list.query && (
                          <p className={style.inner_lists__title}>
                            {list.query}
                          </p>
                        )}
                        <ul className={style.filter_list}>
                          {formatSplitArray(list.specificList, 2, {
                            evenly: true,
                          }).map((list, index) => (
                            <li key={index}>
                              <ul className={style.filter_list_inner}>
                                {list.map(el => (
                                  <li key={el.id}>{el.name}</li>
                                ))}
                              </ul>
                            </li>
                          ))}
                        </ul>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div>
                  <p>{element.listTitle}</p>
                  <ul className={style.tv_list}>
                    {t('left-side.tv-block.list-tv', {
                      returnObjects: true,
                    }).map((tv, index) => (
                      <li key={index}>{tv.title}</li>
                    ))}
                  </ul>

                  <BasicBtn className={style.tv_program_button}>
                    {t('mobile.middle.tv-program')}
                  </BasicBtn>

                  <div>
                    <ul className={style.channel_list}>
                      {t('left-side.tv-block.carousels', {
                        returnObjects: true,
                      }).map(data => (
                        <li key={data.title}>
                          <p>{data.title}</p>
                          <ul className={style.inner_channel_list}>
                            {data.channels.slice(0, 8).map(channel => (
                              <li key={channel.href}>
                                <Image src={channel.img} alt='channel' fill />
                              </li>
                            ))}
                          </ul>
                        </li>
                      ))}
                    </ul>

                    <p>{t('left-side.tv-block.popular-broadcasts-title')}</p>
                    <ul className={style.broadcast_list}>
                      {t('left-side.tv-block.popular-broadcasts', {
                        returnObjects: true,
                      })
                        .slice(0, 12)
                        .map(broadcast => (
                          <li key={broadcast.title} className={style.broadcast}>
                            <Image
                              src={broadcast.img}
                              alt='broadcast'
                              width={58}
                              height={38}
                            />

                            <div className={style.broadcast__info}>
                              <p>{broadcast.title}</p>
                              <p className={style.broadcast__subtitle}>
                                <span>{broadcast.date}</span> •{' '}
                                <span>{broadcast.category}</span>
                              </p>
                            </div>
                          </li>
                        ))}
                    </ul>
                  </div>
                </div>
              ))}
          </li>
        ))}
      </ul>
      <p>{t('mobile.what-to-see')}</p>
    </div>
  )
}

export default HeaderMobileMiddle
