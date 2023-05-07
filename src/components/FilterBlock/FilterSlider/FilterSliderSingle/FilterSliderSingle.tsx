import ReactSlider from 'react-slider'
import { ChangeEvent, FC, useState } from 'react'
import { useSetStringParam } from '@/hooks/useSetStringParam'
import Input from '@/components/UI/Input/Input'
import style from './FilterSlideSingle.module.scss'
import styleParent from '../FilterSlider.module.scss'

interface IProps {
  query: string
  title: string
  maxValue: number
}

const FilterSliderSingle: FC<IProps> = ({ query, title, maxValue }) => {
  const [value, setValue] = useState(0)

  const onChangeValue = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(+event.target.value)
  }

  const { setUrl } = useSetStringParam(query, '0', {
    isNumber: true,
    extraValues: ['0'],
  })

  return (
    <div>
      <div className={style.wrapper_input}>
        <Input
          type='number'
          placeholder='0'
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
        defaultValue={0}
        max={maxValue}
        className={styleParent.slider}
        thumbClassName={styleParent.thumb}
        trackClassName={styleParent.track}
        onAfterChange={value => setUrl(value)}
        pearling
      />
    </div>
  )
}

export default FilterSliderSingle
