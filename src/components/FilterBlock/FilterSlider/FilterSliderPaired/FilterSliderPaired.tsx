import Input from '@/components/UI/Input/Input'
import { formatPairSliderQuery } from '@/formatters/pairSliderQuery.format'
import { useSetStringParam } from '@/hooks/useSetStringParam'
import { ChangeEvent, FC, useState } from 'react'
import ReactSlider from 'react-slider'
import styleParent from '../FilterSlider.module.scss'

interface IProps {
  min: number
  max: number
  query: string
  title: string
}

const FilterSliderPaired: FC<IProps> = ({
  min: minValueDefault,
  max: maxValueDefault,
  query,
  title,
}) => {
  const [minValue, setMinValue] = useState(minValueDefault)
  const [maxValue, setMaxValue] = useState(maxValueDefault)

  const { minValueStr, maxValueStr } = formatPairSliderQuery(query)

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
      <div className={styleParent.inputs}>
        <Input
          type='number'
          placeholder={minValueDefault.toString()}
          value={minValue}
          onChange={event => onChangeMin(event)}
        />
        <span className={styleParent.dash}>{title}</span>
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
        className={styleParent.slider}
        thumbClassName={styleParent.thumb}
        trackClassName={styleParent.track}
        onAfterChange={(value, index) => {
          if (index === 0) setUrlMin(value[0])
          else setUrlMax(value[1])
        }}
        pearling
      />
    </div>
  )
}

export default FilterSliderPaired
