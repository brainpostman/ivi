import ReactSlider from 'react-slider'
import { ChangeEvent, FC, useState } from 'react'
import { useSetStringParam } from '@/hooks/useSetStringParam'
import Input from '@/components/UI/InputFields/Input/Input'
import style from './FilterSlideSingle.module.scss'
import styleParent from '../FilterSlider.module.scss'

interface IProps {
  query: string
  title: string
  min?: number
  max: number
}

const FilterSliderSingle: FC<IProps> = ({ query, title, max, min }) => {
  const [value, setValue] = useState(min || 0)

  const onChangeValue = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(Math.round(+event.target.value))
  }

  const { setUrl } = useSetStringParam(query, (min || 0).toString(), {
    isNumber: true,
    extraValues: [(min || 0).toString()],
  })

  return (
    <div>
      <div className={style.wrapper_input}>
        <Input
          type='number'
          placeholder={(min || 0).toString()}
          value={value}
          onChange={event => onChangeValue(event)}
        />
        <p>{title}</p>
      </div>
      <ReactSlider
        value={value}
        onChange={value => {
          setValue(value)
        }}
        min={min || 0}
        max={max}
        step={max * 0.01}
        className={styleParent.slider}
        thumbClassName={styleParent.thumb}
        trackClassName={styleParent.track}
        onAfterChange={value => setUrl(Math.round(value))}
        pearling
      />
    </div>
  )
}

export default FilterSliderSingle
