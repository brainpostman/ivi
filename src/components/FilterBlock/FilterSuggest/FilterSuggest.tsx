import ModalWindow from '@/components/ModalWindow/ModalWindow'
import Input from '@/components/UI/Input/Input'
import { useSetStringParam } from '@/hooks/useSetStringParam'
import { IFilterBlockEl, IFilterTitle } from '@/types/filterBlock.interface'
import { useRouter } from 'next/router'
import {
  ChangeEvent,
  FC,
  KeyboardEvent,
  useEffect,
  useMemo,
  useState,
} from 'react'
import FilterTab from '../FilterTab/FilterTab'
import style from './FilterSuggest.module.scss'

interface IProps {
  title: IFilterTitle
  filter?: IFilterBlockEl
  selectFilter: () => void
  closeModal: () => void
  suggestList: string[]
  placeholder?: string
  query: string
}

const FilterSuggest: FC<IProps> = ({
  title,
  filter,
  selectFilter,
  closeModal,
  suggestList: suggsetData,
  placeholder,
  query,
}) => {
  const router = useRouter()
  const { param, setUrl, value: valueFromParams } = useSetStringParam(query)
  const [value, setValue] = useState(valueFromParams)

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }

  const onKeyDownEnter = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      setUrl(value)
      closeModal()
    }
  }

  const suggestList = useMemo(() => {
    if (!value) return suggsetData.slice(0, 4)

    return suggsetData.filter(producer =>
      producer.toLowerCase().includes(value.toString().toLowerCase())
    )
  }, [value])

  const onClickListEl = (_param: string) => () => {
    setValue(_param)
  }

  return (
    <FilterTab
      title={title}
      selectFilter={selectFilter}
      filter={filter}
      paramValue={param}
    >
      <ModalWindow isShow={filter?.isExpand} closeFunc={closeModal}>
        <div className={style.wrapper}>
          <h1 className={style.title}>{title}</h1>
          <Input
            type='text'
            placeholder={placeholder}
            value={value}
            onChange={event => onChange(event)}
            onKeyDown={event => onKeyDownEnter(event)}
            autoFocus
          />
          <ul className={style.list}>
            {suggestList.map(suggest => (
              <li key={suggest} onClick={onClickListEl(suggest)}>
                {suggest}
              </li>
            ))}
          </ul>
        </div>
      </ModalWindow>
    </FilterTab>
  )
}

export default FilterSuggest
