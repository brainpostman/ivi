import { BiCameraMovie } from 'react-icons/bi'
import { BsCollectionPlay } from 'react-icons/bs'
import { FiMonitor } from 'react-icons/fi'
import { GiSteamLocomotive } from 'react-icons/gi'
import { HiDotsHorizontal } from 'react-icons/hi'
import { HiOutlineFolderArrowDown } from 'react-icons/hi2'
import { RiHome6Line, RiSearchLine } from 'react-icons/ri'
import {
  countryFilterData,
  genreFilterData,
  novetlyFilterData,
  yearsFilterData,
} from './filters.data'

export const headerMobileTabs = [
  { icon: <RiHome6Line />, title: 'Мой иви', href: '/', isSelect: false },
  {
    icon: <HiOutlineFolderArrowDown />,
    title: 'Каталог',
    href: '/movies',
  },
  {
    icon: <RiSearchLine />,
    title: 'Поиск',
    href: 'https://www.ivi.ru/tvplus?ivi_search',
  },
  {
    icon: <FiMonitor />,
    title: 'TV+',
    href: 'https://www.ivi.ru/tvplus',
  },
  {
    icon: <HiDotsHorizontal />,
    title: 'Ещё',
    href: '/more',
  },
]

export const headerMobileMiddleContent = [
  {
    icon: <BiCameraMovie />,
    title: 'Фильмы',
    href: '/',
    listTitle: 'Все фильмы',
    lists: [
      {
        query: 'Жанры',
        specificList: genreFilterData,
      },
      {
        query: 'Страны',
        specificList: countryFilterData,
      },
      {
        query: 'Годы',
        specificList: yearsFilterData,
      },
      {
        specificList: novetlyFilterData,
      },
    ],
  },
  {
    icon: <BsCollectionPlay />,
    title: 'Сериалы',
    href: '/',
    listTitle: 'Все сериалы',
    lists: [
      {
        query: 'Жанры',
        specificList: genreFilterData,
      },
      {
        query: 'Страны',
        specificList: countryFilterData.slice(3),
      },
      {
        query: 'Годы',
        specificList: yearsFilterData,
      },
      {
        specificList: novetlyFilterData,
      },
    ],
  },
  {
    icon: <GiSteamLocomotive />,
    title: 'Мультфильмы',
    href: '/',
    listTitle: 'Все мультфильмы',
    lists: [
      {
        query: 'Жанры',
        specificList: genreFilterData,
      },
      {
        query: 'Страны',
        specificList: countryFilterData.slice(3),
      },
      {
        query: 'Годы',
        specificList: yearsFilterData,
      },
      {
        specificList: novetlyFilterData,
      },
    ],
  },
  {
    icon: <FiMonitor />,
    title: 'TV+',
    href: '/',
    listTitle: 'ТВ онлайн',
    lists: [
      {
        query: 'Жанры',
        specificList: genreFilterData,
      },
      {
        query: 'Страны',
        specificList: countryFilterData.slice(3),
      },
      {
        query: 'Годы',
        specificList: yearsFilterData,
      },
      {
        specificList: novetlyFilterData,
      },
    ],
  },
]
