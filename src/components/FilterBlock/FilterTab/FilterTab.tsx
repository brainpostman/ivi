import { IFilterListEl, IFilterTitle } from '@/types/filterBlock.interface'
import { DetailedHTMLProps, FC, HTMLAttributes } from 'react'
import { MdArrowBackIosNew } from 'react-icons/md'
import style from './FilterTab.module.scss'

interface IProps
	extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	title: IFilterTitle
	selectFilter: () => void
	filter?: IFilterListEl
}

const FilterTab: FC<IProps> = ({ title, selectFilter, filter, children }) => {
	const titleClassName = `${style.title} ${
		filter?.isExpand ? style.title__active : ''
	}`

	const arrowClassName = `${style.arrow} ${
		filter?.isExpand ? style.arrow__active : ''
	}`

	return (
		<article className={style.wrapper}>
			<div className={titleClassName} onClick={selectFilter}>
				<h1>{title}</h1>
				<MdArrowBackIosNew className={arrowClassName} />
			</div>

			{children}
		</article>
	)
}

export default FilterTab
