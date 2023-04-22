import { IFilterListEl, IFilterTitle } from '@/types/filterBlock.interface'
import { FC, useState } from 'react'
import FilterTab from '../FilterTab/FilterTab'
import style from './FilterListSmall.module.scss'

interface IProps {
	title: IFilterTitle
	selectFilter: () => void
	filter?: IFilterListEl
	list: string[]
}

const FilterListSmall: FC<IProps> = ({ title, selectFilter, filter, list }) => {
	const [items, setItem] = useState(
		list.map((el, index) => ({ title: el, isSelect: !index }))
	)

	const selectItem = (title: string) => () => {
		setItem(prev =>
			prev.map(el => ({
				...el,
				isSelect: el.title === title ? !el.isSelect : false,
			}))
		)
	}

	return (
		<FilterTab title={title} selectFilter={selectFilter} filter={filter}>
			{filter?.isExpand && (
				<div className={style.wrapper}>
					<ul className={style.list}>
						{items.map(item => (
							<li key={item.title} onClick={selectItem(item.title)}>
								<p className={item.isSelect ? style.title__active : ''}>
									{item.title}
								</p>
								<div
									className={`${style.circle} ${
										item.isSelect && style.circle__active
									}`}
								></div>
							</li>
						))}
					</ul>
				</div>
			)}
		</FilterTab>
	)
}

export default FilterListSmall
