import { useSetListParam } from '@/hooks/useSetListParam';
import { IFilterListSmallProps } from '@/types/filterBlock.interface';
import { FC } from 'react';
import FilterTab from '../FilterTab/FilterTab';
import style from './FilterListSmall.module.scss';

const FilterListSmall: FC<IFilterListSmallProps> = ({ filterData, list: listData, query }) => {
    const { onClickListEl, param, list } = useSetListParam(
        listData.map((el, index) => ({ ...el, isSelect: !index })),
        query,
        { filterType: 'radio', extraValues: ['all'] }
    );
    const { filter, selectFilter } = filterData;

    return (
        <FilterTab selectFilter={selectFilter} filter={filter} paramValue={param}>
            {filter?.isExpand && (
                <div className={style.wrapper}>
                    <ul className={style.list}>
                        {list.map((item) => (
                            <li key={item.id} onClick={onClickListEl(item.name)}>
                                <p className={item.isSelect ? style.title__active : ''}>
                                    {item.view}
                                </p>
                                <div
                                    className={`${style.circle} ${
                                        item.isSelect && style.circle__active
                                    }`}></div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </FilterTab>
    );
};

export default FilterListSmall;
