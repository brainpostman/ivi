import ModalWindow from '@/components/ModalWindow/ModalWindow'
import Input from '@/components/UI/Input/Input'
import { useSetStringParam } from '@/hooks/useSetStringParam'
import { IFilterData } from '@/types/filterBlock.interface'
import {
  ChangeEvent,
  FC,
  KeyboardEvent,
  useEffect,
  useMemo,
  useState,
} from 'react'
import FilterTab from '../FilterTab/FilterTab'
import { useTranslation } from 'next-i18next'
import { normalizeKey } from '@/utils/normalize.utils'
import style from './FilterSuggest.module.scss'
import { staffsAPI } from '@/api/queries/staffs.api'
import { IQuerySuggest } from '@/types/staffs.interface'
import { IFilterGetResponse } from '@/types/filters.interface'
import { useDebounce } from '@/hooks/useDebounce'

interface IProps {
  filterData: IFilterData
  closeModal: () => void
  suggestList: IFilterGetResponse[]
  placeholder?: string
  query: IQuerySuggest
}

const FilterSuggest: FC<IProps> = ({
  filterData,
  closeModal,
  suggestList: suggsetDataIncoming,
  placeholder,
  query,
}) => {
  const { t } = useTranslation('movies', { keyPrefix: 'filters' })
  const { param, setUrl, value: valueFromParams } = useSetStringParam(query)
  const [value, setValue] = useState(valueFromParams?.toString())

  const [suggestData, setSuggestData] = useState(suggsetDataIncoming)

  const onChange = async (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }

  const onKeyDownEnter = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      setUrl(value)
      closeModal()
    }
  }

  const onClickListEl = (_param: string) => () => {
    setValue(_param)
  }

  const { filter, selectFilter } = filterData

  const setterSuggestList = async () => {
    const staffs = await staffsAPI.getStaffByParams({
      search: value,
      type: query,
    })
    setSuggestData(staffs)
  }

  // Делаем запрос при изменении текста в инпуте
  useDebounce(setterSuggestList, [value])

  return (
    <FilterTab selectFilter={selectFilter} filter={filter} paramValue={param}>
      <ModalWindow isShow={!!filter?.isExpand} closeFunc={closeModal}>
        <div className={style.wrapper}>
          <h1 className={style.title}>
            {t(normalizeKey(filter?.title ?? ''))}
          </h1>
          <Input
            type='text'
            placeholder={placeholder}
            value={value}
            onChange={event => onChange(event)}
            onKeyDown={event => onKeyDownEnter(event)}
            autoFocus
          />
          <ul className={style.list}>
            {suggestData?.map(suggest => (
              <li key={suggest.id} onClick={onClickListEl(suggest.name)}>
                {suggest.name}
              </li>
            ))}
          </ul>
        </div>
      </ModalWindow>
    </FilterTab>
  )
}

export default FilterSuggest
