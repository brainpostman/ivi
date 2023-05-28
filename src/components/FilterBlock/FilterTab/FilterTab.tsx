import { IFilterBlockEl } from '@/types/filterBlock.interface'
import { DetailedHTMLProps, FC, HTMLAttributes, RefObject } from 'react'
import { MdArrowBackIosNew } from 'react-icons/md'
import style from './FilterTab.module.scss'
import { useTranslation } from 'next-i18next'
import { normalizeKey } from '@/utils/normalize.utils'

interface IProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  selectFilter: () => void
  filter?: IFilterBlockEl
  paramValue?: string | string[]
  elementRef?: RefObject<HTMLElement>
}

const FilterTab: FC<IProps> = ({
  selectFilter,
  filter,
  paramValue,
  children,
  elementRef,
}) => {
  const viewParams = () => {
    if (!paramValue) return ''

    const paramsArray = Array.isArray(paramValue)
      ? paramValue.filter(param => !!param)
      : [paramValue]

    const result = paramsArray.reduce((accum, item, index) => {
      const commaOrEmpty = index % 2 ? ',' : ''
      return accum + commaOrEmpty + item
    }, '')

    return result
  }

  const titleClassName = `${style.title} ${
    filter?.isExpand ? style.title__active : ''
  }`

  const arrowClassName = `${style.arrow} ${
    filter?.isExpand ? style.arrow__active : ''
  }`

  const { t } = useTranslation('movies', { keyPrefix: 'filters' })

  return (
    <article className={style.wrapper} ref={elementRef}>
      <div className={titleClassName} onClick={selectFilter}>
        <div>
          <h1>{t(normalizeKey(filter?.title ?? 'Фильтр'))}</h1>
          {!!viewParams() && <p className={style.param}>{viewParams()}</p>}
        </div>
        <MdArrowBackIosNew className={arrowClassName} />
      </div>

      {children}
    </article>
  )
}

export default FilterTab
