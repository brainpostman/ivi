import { IHeaderHoverBlockContent } from '@/types/hoverblock.interface'
import { getNumGridColumns } from '@/utils/grid.utils'
import { FC, useState } from 'react'
import styleParent from '../HeaderHoverBlock.module.scss'
import style from './HoverTabBlock.module.scss'
import Link from 'next/link'

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
            className={style.block_list}
            style={blockListStyles(block.rows.length)}
          >
            {block.rows.map(el => (
              <li
                key={el.id}
                onMouseEnter={() => hoverNovetly(block.title, el.name)}
              >
                <Link
                  href={el.href || `/movies?${block.filter}=${el.name}`}
                  className={
                    novetly === el.name ? `text ${style.hoverNovetly}` : 'text'
                  }
                >
                  {el.name}
                </Link>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  )
}

export default HoverFilterBlock
