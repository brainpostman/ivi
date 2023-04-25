import { IFilterBlockEl, IFilterTitle } from '@/types/filterBlock.interface'
import { DetailedHTMLProps, FC, HTMLAttributes } from 'react'
import { MdArrowBackIosNew } from 'react-icons/md'
import style from './FilterTab.module.scss'

interface IProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  selectFilter: () => void
  filter?: IFilterBlockEl
  paramValue?: string
}

const FilterTab: FC<IProps> = ({
  selectFilter,
  filter,
  paramValue,
  children,
}) => {
  const titleClassName = `${style.title} ${
    filter?.isExpand ? style.title__active : ''
  }`

  const arrowClassName = `${style.arrow} ${
    filter?.isExpand ? style.arrow__active : ''
  }`

  return (
    <article className={style.wrapper}>
      <div className={titleClassName} onClick={selectFilter}>
        <div>
          <h1>{filter?.title}</h1>
          {!!paramValue && <p className={style.param}>{paramValue}</p>}
        </div>
        <MdArrowBackIosNew className={arrowClassName} />
      </div>

      {children}
    </article>
  )
}

export default FilterTab
