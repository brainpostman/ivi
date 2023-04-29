import { filterActorData } from '@/data/filterActor.data';
import { filterCountryData, filterCountryListData } from '@/data/filterCountry.data';
import { filterGenreData, filterGenreListData } from '@/data/filterGenre.data';
import { filterProducerData } from '@/data/filterProducer.data';
import { filterYearData } from '@/data/filterYear.data';
import { useFilter } from '@/hooks/useFilter';
import { IFilterBlockEl } from '@/types/filterBlock.interface';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { IoCloseOutline } from 'react-icons/io5';
import FilterGenreCard from '../FilterGenreCard/FilterGenreCard';
import VioletButton from '../UI/VioletButton/VioletButton';
import style from './FilterBlock.module.scss';
import FilterListBig from './FilterListBig/FilterListBig';
import FilterListSmall from './FilterListSmall/FilterListSmall';
import FilterSlider from './FilterSlider/FilterSlider';
import FilterSuggest from './FilterSuggest/FilterSuggest';
import { useTranslation } from 'next-i18next';

const filterList: Omit<IFilterBlockEl, 'isExpand'>[] = [
    { title: 'genre' },
    { title: 'country' },
    { title: 'year' },
    { title: 'rating' },
    { title: 'director' },
    { title: 'actor' },
];

const FilterBlock = () => {
    const router = useRouter();
    const { t } = useTranslation('movies');

    const { expandTabFilter, getFilterData } = useFilter(filterList);

    const genreFilterData = getFilterData('genre');
    const countryFilterData = getFilterData('country');
    const yearFilterData = getFilterData('year');
    const producerFilterData = getFilterData('director');
    const actorFilterData = getFilterData('actor');

    const clearFilters = () => {
        router.replace({ pathname: router.pathname, query: undefined }, undefined, {
            shallow: true,
        });
    };

    useEffect(() => {
        const copy = { ...router.query };
        const paramKeys = Object.keys(copy);

        if (!paramKeys.length) return;

        const filteredParamKeys = paramKeys.filter((el) => !['sort', 'direct'].includes(el));

        if (!filteredParamKeys.length) {
            clearFilters();
        }
    }, [router.query]);

    return (
        <section className={style.wrapper}>
            <FilterListBig
                filterData={genreFilterData}
                list={filterGenreListData}
                carouselElementsView={5}
                query='genre'>
                {filterGenreData.map((genre) => (
                    <FilterGenreCard key={genre.title} icon={genre.icon} title={genre.title} />
                ))}
            </FilterListBig>

            <FilterListBig
                filterData={countryFilterData}
                list={filterCountryListData}
                carouselElementsView={6}
                carouselElementsMove={1}
                query='country'>
                {filterCountryData.map((country) => (
                    <VioletButton key={country.variant} variant={country.variant}>
                        {country.children}
                    </VioletButton>
                ))}
            </FilterListBig>

            <FilterListSmall filterData={yearFilterData} list={filterYearData} query='year' />

            <FilterSuggest
                filterData={producerFilterData}
                closeModal={expandTabFilter('director')}
                suggestList={filterProducerData}
                placeholder={t('searches.producer-placeholder')}
                query='producer'
            />

            <FilterSuggest
                filterData={actorFilterData}
                closeModal={expandTabFilter('actor')}
                suggestList={filterActorData}
                placeholder={t('searches.actor-placeholder')}
                query='actor'
            />

            <FilterSlider maxValue={200} minValue={0} query='rating' title={t('sliders.rating')} />

            <FilterSlider maxValue={200} minValue={0} query='scores' title={t('sliders.scores')} />

            <div className={style.clear_filters} onClick={clearFilters}>
                <IoCloseOutline />
                <p>{t('reset-filters')}</p>
            </div>
        </section>
    );
};

export default FilterBlock;

//carouselData = { filterGenreData }
//carouselContent = { FilterGenreCarouselContent }
