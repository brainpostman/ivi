import { IHeaderHoverBlockContent } from '@/types/hoverblock.interface'
import { getNumGridColumns } from '@/utils/grid.utils'
import { FC, useState } from 'react'
import styleParent from '../HeaderHoverBlock.module.scss'
import style from './HoverFilterBlock.module.scss'

// Количество строк в сетке фильтра
const gridColumnLines = 11

interface IProps {
	currentBlock: IHeaderHoverBlockContent | undefined
}

const HoverFilterBlock: FC<IProps> = ({ currentBlock }) => {
	const [novetly, setNovetly] = useState<string | undefined>(undefined)

	// Стиль для количества колонок
	const blockListStyles = (rowsLength: number) => ({
		gridTemplateColumns: `repeat(${getNumGridColumns(
			rowsLength,
			gridColumnLines
		)}, auto)`,
	})

	const hoverNovetly = (title?: string, novetly?: string) => {
		if (title) return
		setNovetly(novetly)
	}

	const classNameCurrentBlock = (blockTitle: string | undefined) =>
		!blockTitle ? style.novetly : ''

	return (
		<ul className={style.filterList}>
			{currentBlock?.columns.map(block => (
				<li key={block.title} className={classNameCurrentBlock(block.title)}>
					{block.title && <p className={styleParent.title}>{block.title}</p>}
					<ul
						className={style.blockList}
						style={blockListStyles(block.rows.length)}
					>
						{block.rows.map(el => (
							<li
								key={el}
								className={
									novetly === el ? `text ${style.hoverNovetly}` : 'text'
								}
								onMouseEnter={() => hoverNovetly(block.title, el)}
							>
								{el}
							</li>
						))}
					</ul>
				</li>
			))}
		</ul>
	)
}

export default HoverFilterBlock
