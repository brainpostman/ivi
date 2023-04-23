import Input from '@/components/UI/Input/Input'
import { useSetStringParam } from '@/hooks/useSetStringParam'
import { ChangeEvent, useState } from 'react'
import ReactSlider from 'react-slider'
import style from './FilterSlider.module.scss'

const FilterSlider = () => {
  const [minValue, setMinValue] = useState(0)
  const [maxValue, setMaxValue] = useState(200)

  const { setUrl: setUrlMin } = useSetStringParam('minRating', 0, {
    isNumber: true,
    extraValues: ['0'],
  })

  const { setUrl: setUrlMax } = useSetStringParam('maxRating', 200, {
    isNumber: true,
    extraValues: ['200'],
  })

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
          placeholder='0'
          value={minValue}
          onChange={event => onChangeMin(event)}
        />
        <span className={style.dash}>Рейтинг</span>
        <Input
          type='number'
          placeholder='200'
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
        min={0}
        max={200}
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
