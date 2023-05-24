import formatCssLength from '@/formatters/cssLength.format'
import { FC, useState } from 'react'
import style from './ExpandBlock.module.scss'
import { useTranslation } from 'next-i18next'
/*
  * @param {ReactNode} children - элемент, который мы разворачиваем
  * @param {string} className - класс для обёртки блока
  * @param {string} title - загловок блока
  * @param {ReactNode} visibleBlock - видимый элемент (до сворачивания)
    Если задаём строку, то можем указать количество видимых строк
  * @param {number} lineClamp - количество видимых строк (если visibleBlock -
    строка)
  * @param {string | number} width - ширина блока (в процентах или пикселях)
  * @param {string} expandWord - текст для кнопки "Развернуть"
  * @param {boolean} expandWordGray - серый стиль кнопки "Развернуть"

*/

interface IProps {
  children: React.ReactNode
  title?: string
  visibleBlock?: string | React.ReactNode
  width?: string | number
  lineClamp?: number
  expandWord?: string
  className?: string
  expandWordGray?: boolean
}

const ExpandBlock: FC<IProps> = ({
  children,
  title,
  visibleBlock,
  className,
  width = '75%',
  lineClamp = 2,
  expandWord,
  expandWordGray: isExpandWordGray = false,
  ...props
}) => {
  const { t } = useTranslation('common')

  const [isExpand, setIsExpand] = useState(false)

  const onClickToggle = () => setIsExpand(prev => !prev)

  const formattedWidth = formatCssLength(width)

  return (
    <article
      className={`${style.info} ${className}`}
      style={{ width: formattedWidth }}
      {...props}
    >
      {title && <h1 className={style.info__title}>{title}</h1>}

      {visibleBlock && typeof visibleBlock === 'string' ? (
        <p
          className={`${style.info__body__top} ${
            isExpand ? style.visible : ''
          }`}
          style={{ lineClamp, WebkitLineClamp: lineClamp }}
        >
          {visibleBlock}
        </p>
      ) : (
        visibleBlock
      )}

      {isExpand && children}

      <p
        className={`${style.toggle} ${
          isExpandWordGray ? style.toggle_gray : ''
        }`}
        onClick={onClickToggle}
      >
        {isExpand
          ? t('expand-block.collapse')
          : expandWord || t('expand-block.expand')}
      </p>
    </article>
  )
}

export default ExpandBlock
