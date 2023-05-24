export interface IRange {
  min: number
  max: number
}

export interface IQueryRange {
  min: string
  max: string
}

export type IFilterSliderType = 'single' | 'paired' | undefined
export type IRangeWithPartial = Omit<IRange, 'min'> & { min?: number }
