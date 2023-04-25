import { filterActorData } from '@/data/filterActor.data'
import {
  filterCountryData,
  filterCountryListData,
} from '@/data/filterCountry.data'
import { filterGenreData, filterGenreListData } from '@/data/filterGenre.data'
import { filterProducerData } from '@/data/filterProducer.data'
import { filterYearData } from '@/data/filterYear.data'
import { useFilter } from '@/hooks/useFilter'
import { IFilterBlockEl, IFilterTitle } from '@/types/filterBlock.interface'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { IoCloseOutline } from 'react-icons/io5'
import FilterGenreCarouselContent from '../CarouselContents/FilterGenreCarouselContent/FilterGenreCarouselContent'
import VioletButton from '../UI/VioletButton/VioletButton'
import style from './FilterBlock.module.scss'
import FilterListBig from './FilterListBig/FilterListBig'
import FilterListSmall from './FilterListSmall/FilterListSmall'
import FilterSlider from './FilterSlider/FilterSlider'
import FilterSuggest from './FilterSuggest/FilterSuggest'

const filterList: Omit<IFilterBlockEl, 'isExpand'>[] = [
  { title: 'Жанры' },
  { title: 'Страны' },
  { title: 'Годы' },
  { title: 'Рейтинг Иви' },
  { title: 'Режиссёр' },
  { title: 'Актёр' },
]

const FilterBlock = () => {
  const router = useRouter()
  const { expandTabFilter, getFilterData } = useFilter(filterList)

  const genreFilterData = getFilterData('Жанры')
  const countryFilterData = getFilterData('Страны')
  const yearFilterData = getFilterData('Годы')
  const producerFilterData = getFilterData('Режиссёр')
  const actorFilterData = getFilterData('Актёр')

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
        filterData={genreFilterData}
        carouselData={filterGenreData}
        carouselContent={FilterGenreCarouselContent}
        list={filterGenreListData}
        carouselElementsView={5}
        query='genre'
      />

      <FilterListBig
        filterData={countryFilterData}
        carouselData={filterCountryData}
        carouselContent={VioletButton}
        list={filterCountryListData}
        carouselElementsView={6}
        carouselElementsMove={1}
        query='country'
      />

      <FilterListSmall
        filterData={yearFilterData}
        list={filterYearData}
        query='year'
      />

      <FilterSuggest
        filterData={producerFilterData}
        closeModal={expandTabFilter('Режиссёр')}
        suggestList={filterProducerData}
        placeholder='Введите имя режиссёра'
        query='producer'
      />

      <FilterSuggest
        filterData={actorFilterData}
        closeModal={expandTabFilter('Актёр')}
        suggestList={filterActorData}
        placeholder='Введите имя актёра'
        query='actor'
      />

      <FilterSlider
        maxValue={200}
        minValue={0}
        query='rating'
        title='Рейтинг'
      />

      <div className={style.clear_filters} onClick={clearFilters}>
        <IoCloseOutline />
        <p>Сбросить фильтры</p>
      </div>
    </section>
  )
}

export default FilterBlock
