import { BiCameraMovie } from 'react-icons/bi'
import { BsCollectionPlay } from 'react-icons/bs'
import { FiMonitor } from 'react-icons/fi'
import { GiSteamLocomotive } from 'react-icons/gi'
import { IFilterGetResponse } from '@/types/api/filters.api.interface'
import { RiHome6Line, RiSearchLine } from 'react-icons/ri'
import { HiDotsHorizontal } from 'react-icons/hi'
import { HiOutlineFolderArrowDown } from 'react-icons/hi2'
import { TFunction } from 'i18next'

export const headerMobileIcons = [
  <RiHome6Line />,
  <HiOutlineFolderArrowDown />,
  <RiSearchLine />,
  <FiMonitor />,
  <HiDotsHorizontal />,
]

type ITranslate = TFunction<'header', undefined, 'header'>

interface IFilters {
  genres: IFilterGetResponse[]
  countries: IFilterGetResponse[]
  t: ITranslate
}

export const getHeaderMobileMiddleContent = ({
  genres,
  countries,
  t,
}: IFilters) => {
  return [
    {
      icon: <BiCameraMovie />,
      title: t('mobile.tabs', { returnObjects: true })[0].title || 'Фильмы',
      href: '/',
      listTitle:
        t('mobile.tabs', { returnObjects: true })[0]?.listTitle || 'Все фильмы',
      lists: [
        {
          query:
            t('mobile.tabs', { returnObjects: true })[0]?.lists[0]?.query ||
            'Жанры',
          specificList: genres,
        },
        {
          query:
            t('mobile.tabs', { returnObjects: true })[0]?.lists[1]?.query ||
            'Страны',
          specificList: countries,
        },
      ],
    },
    {
      icon: <BsCollectionPlay />,
      title: t('mobile.tabs', { returnObjects: true })[1]?.title || 'Сериалы',
      href: '/',
      listTitle:
        t('mobile.tabs', { returnObjects: true })[1]?.listTitle ||
        'Все сериалы',
      lists: [
        {
          query:
            t('mobile.tabs', { returnObjects: true })[1]?.lists[0]?.query ||
            'Жанры',
          specificList: genres,
        },
        {
          query:
            t('mobile.tabs', { returnObjects: true })[1]?.lists[1]?.query ||
            'Страны',
          specificList: countries.slice(3),
        },
      ],
    },
    {
      icon: <GiSteamLocomotive />,
      title:
        t('mobile.tabs', { returnObjects: true })[2]?.title || 'Мультфильмы',
      href: '/',
      listTitle:
        t('mobile.tabs', { returnObjects: true })[2]?.listTitle ||
        'Все мультфильмы',
      lists: [
        {
          query:
            t('mobile.tabs', { returnObjects: true })[2]?.lists[0]?.query ||
            'Жанры',
          specificList: genres,
        },
        {
          query:
            t('mobile.tabs', { returnObjects: true })[2]?.lists[1]?.query ||
            'Страны',
          specificList: countries.slice(3),
        },
      ],
    },
    {
      icon: <FiMonitor />,
      title: t('mobile.tabs', { returnObjects: true })[3]?.title || 'TV+',
      href: '/',
      listTitle:
        t('mobile.tabs', { returnObjects: true })[3]?.listTitle || 'TV Онлайн',
      lists: [
        {
          query:
            t('mobile.tabs', { returnObjects: true })[3]?.lists[0]?.query ||
            'Жанры',
          specificList: genres,
        },
        {
          query:
            t('mobile.tabs', { returnObjects: true })[3]?.lists[1]?.query ||
            'Страны',
          specificList: countries.slice(3),
        },
      ],
    },
  ]
}
