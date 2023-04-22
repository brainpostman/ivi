import ModalWindow from '@/components/ModalWindow/ModalWindow'
import Input from '@/components/UI/Input/Input'
import { IFilterListEl, IFilterTitle } from '@/types/filterBlock.interface'
import { ChangeEvent, FC, useMemo, useState } from 'react'
import FilterTab from '../FilterTab/FilterTab'
import style from './FilterSuggest.module.scss'

interface IProps {
	title: IFilterTitle
	filter?: IFilterListEl
	selectFilter: () => void
	closeModal: () => void
	suggestList: string[]
	placeholder?: string
}

const FilterSuggest: FC<IProps> = ({
	title,
	filter,
	selectFilter,
	closeModal,
	suggestList: suggsetData,
	placeholder,
}) => {
	const [value, setValue] = useState('')

	const onChange = (event: ChangeEvent<HTMLInputElement>) => {
		setValue(event.target.value)
	}

	const suggestList = useMemo(() => {
		if (!value) return suggsetData.slice(0, 4)

		return suggsetData.filter(producer =>
			producer.toLowerCase().includes(value.toLowerCase())
		)
	}, [value])

	return (
		<FilterTab title={title} selectFilter={selectFilter} filter={filter}>
			<ModalWindow isShow={filter?.isExpand} closeFunc={closeModal}>
				<div className={style.wrapper}>
					<h1 className={style.title}>{title}</h1>
					<Input
						placeholder={placeholder}
						value={value}
						onChange={event => onChange(event)}
					/>
					<ul className={style.list}>
						{suggestList.map(suggest => (
							<li key={suggest}>{suggest}</li>
						))}
					</ul>
				</div>
			</ModalWindow>
		</FilterTab>
	)
}

export default FilterSuggest
