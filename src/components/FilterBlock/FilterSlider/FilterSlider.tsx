import Input from '@/components/UI/Input/Input'
import { formatSliderQuery } from '@/formatters/sliderQuery.format'
import { useSetStringParam } from '@/hooks/useSetStringParam'
import { IFilterSliderProps } from '@/types/filterBlock.interface'
import { ChangeEvent, FC, useState } from 'react'
import ReactSlider from 'react-slider'
import style from './FilterSlider.module.scss'

const FilterSlider: FC<IFilterSliderProps> = ({
  query,
  title,
  minValue: minValueDefault,
  maxValue: maxValueDefault,
}) => {
  const [minValue, setMinValue] = useState(minValueDefault)
  const [maxValue, setMaxValue] = useState(maxValueDefault)

  const { minValueStr, maxValueStr } = formatSliderQuery(query)

  const { setUrl: setUrlMin } = useSetStringParam(
    minValueStr,
    minValueDefault,
    {
      isNumber: true,
      extraValues: [minValueDefault.toString()],
    }
  )

  const { setUrl: setUrlMax } = useSetStringParam(
    maxValueStr,
    maxValueDefault,
    {
      isNumber: true,
      extraValues: [maxValueDefault.toString()],
    }
  )

  const onChangeMin = (event: ChangeEvent<HTMLInputElement>) => {
    setMinValue(+event.target.value)
  }

  const onChangeMax = (event: ChangeEvent<HTMLInputElement>) => {
    setMaxValue(+event.target.value)
  }

  return (
    <div>
      <div className={style.inputs}>
        <Input
          type='number'
          placeholder={minValueDefault.toString()}
          value={minValue}
          onChange={event => onChangeMin(event)}
        />
        <span className={style.dash}>{title}</span>
        <Input
          type='number'
          placeholder={maxValueDefault.toString()}
          value={maxValue}
          onChange={event => onChangeMax(event)}
        />
      </div>
      <ReactSlider
        value={[minValue, maxValue]}
        onChange={(value, index) => {
          if (index === 0) setMinValue(value[0])
          else setMaxValue(value[1])
        }}
        min={minValueDefault}
        max={maxValueDefault}
        ariaLabel={['Leftmost thumb', 'Rightmost thumb']}
        className={style.slider}
        thumbClassName={style.thumb}
        trackClassName={style.track}
        onAfterChange={(value, index) => {
          if (index === 0) setUrlMin(value[0])
          else setUrlMax(value[1])
        }}
        pearling
      />
    </div>
  )
}

export default FilterSlider
