import { filterActorData } from '@/data/filterActor.data'
import {
  filterCountryData,
  filterCountryListData,
} from '@/data/filterCountry.data'
import { filterGenreData, filterGenreListData } from '@/data/filterGenre.data'
import { filterProducerData } from '@/data/filterProducer.data'
import { filterYearData } from '@/data/filterYear.data'
import { IFilterBlockEl, IFilterTitle } from '@/types/filterBlock.interface'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { IoCloseOutline } from 'react-icons/io5'
import FilterGenreCarouselContent from '../CarouselContents/FilterGenreCarouselContent/FilterGenreCarouselContent'
import VioletButton from '../UI/VioletButton/VioletButton'
import style from './FilterBlock.module.scss'
import FilterListBig from './FilterListBig/FilterListBig'
import FilterListSmall from './FilterListSmall/FilterListSmall'
import FilterSlider from './FilterSlider/FilterSlider'
import FilterSuggest from './FilterSuggest/FilterSuggest'

const filterList: IFilterBlockEl[] = [
  { title: 'Жанры' },
  { title: 'Страны' },
  { title: 'Годы' },
  { title: 'Рейтинг Иви' },
  { title: 'Режиссёр' },
  { title: 'Актёр' },
]

const getFilterFunc = (filters: IFilterBlockEl[]) => (title: IFilterTitle) => {
  const currentFilter = filters.find(filter => filter.title === title)

  if (!currentFilter) {
    console.error('Фильтр не найден')
    return
  }

  return currentFilter
}

const FilterBlock = () => {
  const router = useRouter()
  const [filters, setFilters] = useState(
    filterList.map(filter => ({ ...filter, isExpand: false }))
  )

  const closeModalByFilterTitle = (title: IFilterTitle) => () =>
    setFilters(prev =>
      prev.map(filter => ({
        ...filter,
        isExpand: filter.title === title ? false : filter.isExpand,
      }))
    )

  const getFilter = getFilterFunc(filters)

  const getSelectFilterFunc = (title: IFilterTitle) => () => {
    const copy = [...filters].map(filter => ({
      ...filter,
      isExpand: filter.title === title ? !filter.isExpand : false,
    }))

    setFilters(copy)
  }

  const clearFilters = () => {
    router.replace({ pathname: router.pathname, query: undefined }, undefined, {
      shallow: true,
    })
  }

  useEffect(() => {
    const copy = { ...router.query }
    const paramKeys = Object.keys(copy)

    if (!paramKeys.length) return

    const filteredParamKeys = paramKeys.filter(
      el => !['sort', 'direct'].includes(el)
    )

    if (!filteredParamKeys.length) {
      clearFilters()
    }
  }, [router.query])

  return (
    <section className={style.wrapper}>
      <FilterListBig
        title='Жанры'
        selectFilter={getSelectFilterFunc('Жанры')}
        filter={getFilter('Жанры')}
        carouselData={filterGenreData}
        carouselContent={FilterGenreCarouselContent}
        list={filterGenreListData}
        carouselElementsView={5}
        query='genre'
      />

      <FilterListBig
        title='Страны'
        selectFilter={getSelectFilterFunc('Страны')}
        filter={getFilter('Страны')}
        carouselData={filterCountryData}
        carouselContent={VioletButton}
        list={filterCountryListData}
        carouselElementsView={6}
        carouselElementsMove={1}
        query='country'
      />

      <FilterListSmall
        title='Годы'
        selectFilter={getSelectFilterFunc('Годы')}
        filter={getFilter('Годы')}
        list={filterYearData}
        query='year'
      />

      <FilterSuggest
        title='Режиссёр'
        selectFilter={getSelectFilterFunc('Режиссёр')}
        filter={getFilter('Режиссёр')}
        closeModal={closeModalByFilterTitle('Режиссёр')}
        suggestList={filterProducerData}
        placeholder='Введите имя режиссёра'
        query='producer'
      />

      <FilterSuggest
        title='Актёр'
        selectFilter={getSelectFilterFunc('Актёр')}
        filter={getFilter('Актёр')}
        closeModal={closeModalByFilterTitle('Актёр')}
        suggestList={filterActorData}
        placeholder='Введите имя актёра'
        query='actor'
      />

      <FilterSlider />

      <div className={style.clear_filters} onClick={clearFilters}>
        <IoCloseOutline />
        <p>Сбросить фильтры</p>
      </div>
    </section>
  )
}

export default FilterBlock
