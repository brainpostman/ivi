import { filterCountryData } from '@/data/filterCountry.data'
import { filterGenreData } from '@/data/filterGenre.data'
import { filterYearData } from '@/data/filterYear.data'
import { useFilter } from '@/hooks/useFilter'
import { IFilterBlockEl } from '@/types/filterBlock.interface'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { FC, useEffect } from 'react'
import { IoCloseOutline } from 'react-icons/io5'
import FilterGenreCard from '../FilterGenreCard/FilterGenreCard'
import VioletButton from '../UI/VioletButton/VioletButton'
import style from './FilterBlock.module.scss'
import FilterListBig from './FilterListBig/FilterListBig'
import FilterListSmall from './FilterListSmall/FilterListSmall'
import FilterSlider from './FilterSlider/FilterSlider'
import FilterSuggest from './FilterSuggest/FilterSuggest'
import { IFilterGetResponse } from '@/types/filters.api.interface'
import { useSetListParam } from '@/hooks/useSetListParam'

const filterList: Omit<IFilterBlockEl, 'isExpand'>[] = [
  { title: 'genres' },
  { title: 'country' },
  { title: 'year' },
  { title: 'rating' },
  { title: 'director' },
  { title: 'actor' },
]

interface IProps {
  genres: IFilterGetResponse[]
  countries: IFilterGetResponse[]
  directors: IFilterGetResponse[]
  actors: IFilterGetResponse[]
  className?: string
}

const FilterBlock: FC<IProps> = ({
  genres,
  countries,
  directors,
  actors,
  className: propsClassName,
}) => {
  const router = useRouter()
  const { t } = useTranslation('movies')

  const { expandTabFilter, getFilterData } = useFilter(filterList)

  const genreFilterData = getFilterData('genres')
  const countryFilterData = getFilterData('country')
  const yearFilterData = getFilterData('year')
  const producerFilterData = getFilterData('director')
  const actorFilterData = getFilterData('actor')

  const isAppliedFilters = Object.keys(router.query).length
  console.log(!!isAppliedFilters)

  const { onClickListEl: onClickGenreCard } = useSetListParam(
    genres.slice(0, 10).map(genre => ({ ...genre, isSelect: false })),
    'genres'
  )

  const { onClickListEl: onClickCountry } = useSetListParam(
    countries.slice(0, 10).map(genre => ({ ...genre, isSelect: false })),
    'country'
  )

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
      el => !['orderBy', 'order'].includes(el)
    )

    if (!filteredParamKeys.length) {
      clearFilters()
    }
  }, [router.query])

  return (
    <section className={style.wrapper}>
      <FilterListBig
        filterData={genreFilterData}
        list={genres}
        carouselElementsView={5}
        query='genres'
      >
        {genres.slice(0, 10).map(genre => (
          <FilterGenreCard
            key={genre.id}
            onClick={onClickGenreCard(genre.name)}
            title={genre.name}
          />
        ))}
      </FilterListBig>

      <FilterListBig
        filterData={countryFilterData}
        list={countries}
        carouselElementsView={6}
        carouselElementsMove={1}
        query='country'
      >
        {countries.slice(0, 10).map(country => (
          <VioletButton
            key={country.id}
            onClick={onClickCountry(country.name)}
            variant='secondary'
          >
            {country.name}
          </VioletButton>
        ))}
      </FilterListBig>

      <FilterListSmall
        filterData={yearFilterData}
        list={filterYearData}
        query='year'
      />

      <FilterSuggest
        filterData={producerFilterData}
        closeModal={expandTabFilter('director')}
        suggestList={directors}
        placeholder={t('searches.director-placeholder')}
        query='director'
      />

      <FilterSuggest
        filterData={actorFilterData}
        closeModal={expandTabFilter('actor')}
        suggestList={actors}
        placeholder={t('searches.actor-placeholder')}
        query='actor'
      />

      <FilterSlider query='rating' title={t('sliders.rating')} />

      <FilterSlider query='scoreAVG' title={t('sliders.scores')} />

      <div
        className={`${
          !isAppliedFilters
            ? style.clear_filters__deactive
            : style.clear_filters
        }`}
        onClick={isAppliedFilters ? clearFilters : () => {}}
      >
        <IoCloseOutline />
        <p>{t('reset-filters')}</p>
      </div>
    </section>
  )
}

export default FilterBlock
