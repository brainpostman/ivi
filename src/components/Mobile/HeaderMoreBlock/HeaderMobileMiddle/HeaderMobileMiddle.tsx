import BasicBtn from '@/components/UI/BasicBtn/BasicBtn'
import { headerMobileMiddleContent } from '@/data/headerMobile.data'
import {
  headerPopularBroadcastsData,
  headerTvBlockData,
} from '@/data/headerTVBlock.data'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { MdArrowBackIosNew } from 'react-icons/md'
import styleParent from '../HeaderMoreBlock.module.scss'
import style from './HeaderMobileMiddle.module.scss'

// FIXME: починить key prop

const HeaderMobileMiddle = () => {
  const [contentLists, setContentLists] = useState(
    headerMobileMiddleContent.map(el => ({
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
      <nav className={style.nav}>
        <p>
          <Link href='/'>Мой иви</Link>
        </p>
        <p>
          <a href='https://www.ivi.ru/new'>Что нового</a>
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
                      <li key={element.listTitle}>
                        <p className={style.inner_lists__title}>{list.query}</p>
                        <ul className={style.filter_list}>
                          {list.specificList.map(element => (
                            <li>{element.title}</li>
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
                    <li>ТВ-каналы</li>
                    <li>ТВ-развлекательное</li>
                    <li>Дети</li>
                    <li>Спортивное ТВ</li>
                    <li>Документальное</li>
                  </ul>

                  <BasicBtn className={style.tv_program_button}>
                    Телепрограмма
                  </BasicBtn>

                  <div>
                    <ul className={style.channel_list}>
                      {headerTvBlockData.map(data => (
                        <li key={data.title}>
                          <p>{data.title}</p>
                          <ul className={style.inner_channel_list}>
                            {data.channels.slice(0, 8).map(channel => (
                              <li key={channel.href}>
                                <Image
                                  src={channel.img}
                                  alt='channel'
                                  width={146}
                                  height={96}
                                />
                              </li>
                            ))}
                          </ul>
                        </li>
                      ))}
                    </ul>

                    <p>Популярные трансляции</p>
                    <ul className={style.broadcast_list}>
                      {headerPopularBroadcastsData
                        .slice(0, 12)
                        .map(broadcast => (
                          <li key={broadcast.title} className={style.broadcast}>
                            <Image
                              src={broadcast.img}
                              alt='broadcast'
                              width={58}
                              height={38}
                            />

                            <div>
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
      <p>Что посмотреть</p>
    </div>
  )
}

export default HeaderMobileMiddle
