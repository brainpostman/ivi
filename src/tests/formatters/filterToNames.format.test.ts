import formatFilterToNames from '@/formatters/filterToNames.format'
import { IFilterGetResponse } from '@/types/filters.interface'

const testValidFilter = [
  { name: 'Австралия' },
  { name: 'Беларусь' },
  { name: 'Великобритания' },
  { name: 'Гонконг' },
  { name: 'Ирландия' },
  { name: 'Казахстан' },
  { name: 'Колумбия' },
].map((country, index) => ({ id: index + 1, name: country.name }))

const testInvalidFilter = [
  { name: 'Австралия' },
  { name: 'Беларусь' },
  { name: 'Великобритания' },
  { smth: 'smth' },
  { name: 'Ирландия' },
  { smth: 'smth2' },
  { name: 'Колумбия' },
].map((country, index) => ({ id: index + 1, name: country.name }))

const expectedInvalidFilter =
  'Австралия,Беларусь,Великобритания,Ирландия,Колумбия'

const expectedValidvalue =
  'Австралия,Беларусь,Великобритания,Гонконг,Ирландия,Казахстан,Колумбия'

describe('FORMAT formatFilterToNames', () => {
  // Валидный фильтр
  it('Valid filter', () => {
    const formattedValue = formatFilterToNames(testValidFilter)
    expect(formattedValue).toBe(expectedValidvalue)
  })
})

describe('FORMAT ERROR formatFilterToNames', () => {
  // Undefined
  it('Undefined', () => {
    const formattedValue = formatFilterToNames(undefined)
    expect(formattedValue).toBe('')
  })

  // Некорректный фильтр
  it('Invalid filter', () => {
    const formattedValue = formatFilterToNames(
      testInvalidFilter as IFilterGetResponse[]
    )
    expect(formattedValue).toBe(expectedInvalidFilter)
  })
})
