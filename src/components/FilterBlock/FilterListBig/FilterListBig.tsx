import CustomCarousel from '@/components/CustomCarousel/CustomCarousel';
import { useSetListParam } from '@/hooks/useSetListParam';
import { IFilterListBigProps } from '@/types/filterBlock.interface';
import { FC } from 'react';
import { BsCheckLg } from 'react-icons/bs';
import FilterTab from '../FilterTab/FilterTab';
import style from './FilterListBig.module.scss';

const FilterListBig: FC<IFilterListBigProps> = ({
    filterData,
    list: listData,
    carouselElementsView = 5,
    carouselElementsMove = 2,
    query,
    children,
}) => {
    const { list, onClickListEl, param } = useSetListParam(
        listData.map((data) => ({ ...data, isSelect: false })),
        query
    );

    const { filter, selectFilter } = filterData;

    return (
        <FilterTab selectFilter={selectFilter} filter={filter} paramValue={param}>
            {filter?.isExpand && (
                <div className={style.container}>
                    {children && (
                        <CustomCarousel
                            elementsMove={carouselElementsMove}
                            elementsView={carouselElementsView}
                            arrowSize={18}
                            space={[12, 12]}
                            classNameWrapper={style.carousel_wrapper}
                            width='fit'>
                            {children}
                        </CustomCarousel>
                    )}

                    <ul className={style.list}>
                        {list.map((el) => (
                            <li
                                key={el.title}
                                onClick={onClickListEl(el.param)}
                                className={el.isSelect ? style.active : ''}>
                                <p>{el.title}</p>
                                <BsCheckLg />
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </FilterTab>
    );
};

export default FilterListBig;
