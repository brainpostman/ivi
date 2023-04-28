import formatCssLength from '@/formatters/cssLength.format'
import { FC, useState } from 'react'
import style from './ExpandBlock.module.scss'

// @param { * } children - элемент, который мы разворачиваем
// @param className - класс для обёртки блока
// @param title - загловок блока
// @param visibleBlock - видимый элемент (до сворачивания)
// Если задаём строку, то можем указать количество видимых строк
// @param lineClamp - количество видимых строк (если visibleBlock - строка)
// @param width - ширина блока (в процентах или пикселях)
// @param expandWord - текст для кнопки "Развернуть"

interface IProps {
  children: React.ReactNode
  title?: string
  visibleBlock?: string | React.ReactNode
  width?: string | number
  lineClamp?: number
  expandWord?: string
  className?: string
}

const ExpandBlock: FC<IProps> = ({
  children,
  title,
  visibleBlock,
  className,
  width = '75%',
  lineClamp = 2,
  expandWord,
  ...props
}) => {
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

      <p className={style.toggle} onClick={onClickToggle}>
        {isExpand ? 'Свернуть' : expandWord || 'Развернуть'}
      </p>
    </article>
  )
}

export default ExpandBlock
