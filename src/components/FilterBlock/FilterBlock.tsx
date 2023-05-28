import { useFilter } from '@/hooks/useFilter'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { FC, useEffect } from 'react'
import { IoCloseOutline } from 'react-icons/io5'
import FilterGenreCard from '../UI/Cards/FilterGenreCard/FilterGenreCard'
import VioletButton from '../UI/Buttons/VioletButton/VioletButton'
import style from './FilterBlock.module.scss'
import FilterListBig from './FilterListBig/FilterListBig'
import FilterSlider from './FilterSlider/FilterSlider'
import FilterSuggest from './FilterSuggest/FilterSuggest'
import { IStaffGetResponse } from '@/types/api/staffs.api.interface'
import { IFilterGetResponse } from '@/types/api/filters.api.interface'
import { useSetListParam } from '@/hooks/useSetListParam'
import { filterList } from '@/data/filters.data'
import getFilterClassName from '@/utils/filterClassName.utils'

interface IProps {
  genres: IFilterGetResponse[]
  countries: IFilterGetResponse[]
  directors: IStaffGetResponse[]
  actors: IStaffGetResponse[]
  className?: string
  clearSort?: boolean
  minYear: number
  maxYear: number
  minCountScore: number
  maxCountScore: number
  maxRating: number
}

const FilterBlock: FC<IProps> = ({
  genres,
  countries,
  directors,
  actors,
  className: propsClassName,
  clearSort = true,
  minYear,
  maxYear,
  minCountScore,
  maxCountScore,
  maxRating,
}) => {
  const router = useRouter()
  const { t } = useTranslation('movies')

  const { expandTabFilter, getFilterData } = useFilter(filterList)

  const genreFilterData = getFilterData('genres')
  const countryFilterData = getFilterData('countries')
  const producerFilterData = getFilterData('director')
  const actorFilterData = getFilterData('actor')

  const isAppliedFilters = Object.keys(router.query).length

  const { onClickListEl: onClickGenreCard } = useSetListParam(
    genres.slice(0, 10).map(genre => ({ ...genre, isSelect: false })),
    'genres'
  )

  const { onClickListEl: onClickCountry } = useSetListParam(
    countries.slice(0, 10).map(country => ({ ...country, isSelect: false })),
    'countries'
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

    if (!filteredParamKeys.length && clearSort) {
      clearFilters()
    }
  }, [router.query])

  return (
    <section className={`${style.wrapper} ${propsClassName}`}>
      <FilterListBig
        filterData={genreFilterData}
        list={genres}
        carouselElementsView={5}
        query='genres'
        enQuery='genres_en'
      >
        {genres.slice(0, 10).map(genre => (
          <FilterGenreCard
            key={genre.id}
            onClick={onClickGenreCard(genre.name)}
            className={getFilterClassName(
              genre.name,
              style.filter_card_active,
              [router.query.genres as string, router.query.genres_en as string]
            )}
          >
            {genre.name}
          </FilterGenreCard>
        ))}
      </FilterListBig>

      <FilterListBig
        filterData={countryFilterData}
        list={countries}
        carouselElementsView={6}
        carouselElementsMove={1}
        query='countries'
        enQuery='fk_countries'
      >
        {countries.slice(0, 10).map(country => (
          <VioletButton
            key={country.id}
            onClick={onClickCountry(country.name)}
            variant='secondary'
            className={getFilterClassName(
              country.name,
              style.filter_card_active,
              router.query.countries as string | undefined
            )}
          >
            {country.name}
          </VioletButton>
        ))}
      </FilterListBig>

      <FilterSuggest
        filterData={producerFilterData}
        closeModal={expandTabFilter('director')}
        suggestList={directors}
        placeholder={t('searches.director-placeholder')}
        query='directors'
      />

      <FilterSuggest
        filterData={actorFilterData}
        closeModal={expandTabFilter('actor')}
        suggestList={actors}
        placeholder={t('searches.actor-placeholder')}
        query='actors'
      />

      <FilterSlider
        query={{ min: 'yearStart', max: 'yearEnd' }}
        range={{ min: minYear, max: maxYear }}
        title={t('sliders.years')}
        step={1}
      />
      <FilterSlider
        query='minCountScore'
        title={t('sliders.scores')}
        range={{ min: minCountScore, max: maxCountScore }}
        step={1}
      />
      <FilterSlider
        query='ratingStart'
        range={{ max: Math.floor(maxRating) }}
        title={t('sliders.rating')}
        step={0.1}
      />

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
