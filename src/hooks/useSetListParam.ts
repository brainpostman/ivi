import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useGetParam } from './useGetParam'
import { IFilterGetResponse } from '@/types/api/filters.api.interface'

type IFilterType = 'radio'

type IList = (IFilterGetResponse & { isSelect: boolean; view?: string })[]

/*
  * @param {(_param: string) => () => void} onClickListEl - функция для клика по элементу
  * @param {string} param - название параметра
  * @param {IList} list - список параметров

*/

interface IUseSetListParam {
  onClickListEl: (_param: string) => () => void
  param: string
  list: IList
}

/*
  * @param {number} id - идентификатор
  * @param {string} name - название
  * @param {boolean} isSelect - выбран ли параметр
  * @param {string} view - отображаемое название

*/
type IDefaultValue = {
  id: number
  name: string
  isSelect: boolean
  view?: string
}[]

/*
  * @param {IFilterType} filterType - тип фильтра
  * @param {string[]} extraValues - экстра значения, при которых фильтр удаляет 
    из url
  * @param {(filter?: string) => string} queryFormatter - форматтер параметра

*/
interface IOptions {
  filterType?: IFilterType
  extraValues?: string[]
}

/*
  * @param {IDefaultValue} defaultValue - список по умолчанию
  * @param {string} query - параметр
  * @param {IOptions} options - опции
  
  * @returns IUseSetListParam

*/
export const useSetListParam = (
  defaultValue: IDefaultValue,
  query: string,
  options?: IOptions
): IUseSetListParam => {
  const param = useGetParam(query)

  const router = useRouter()

  const [list, setList] = useState<IList>(defaultValue)

  const onClickListEl = (_param: string) => () => {
    let resultParams: string | undefined = ''
    const splittedParams = param ? param.split(',') : []

    if (options?.extraValues?.includes(_param)) {
      resultParams === undefined
    } else {
      if (options?.filterType === 'radio') {
        resultParams = _param
      } else {
        if (splittedParams.includes(_param)) {
          resultParams = splittedParams.filter(el => el !== _param).join(',')
        } else {
          splittedParams.push(_param)
          resultParams = splittedParams.join(',')
        }
      }
    }

    const fullQueries = {
      [query]: resultParams,
    }

    if (!router.query.orderBy) {
      fullQueries.orderBy = 'year'
    }

    if (!router.query.order) {
      fullQueries.order = 'ASC'
    }

    if (resultParams) {
      router.push({ query: { ...router.query, ...fullQueries } }, undefined, {
        shallow: true,
      })
    } else {
      // Если @param resultParams пустой, то удаляем соответствующий параметр query
      delete router.query[query]
      router.push({ query: router.query }, undefined, {
        shallow: true,
      })
    }
  }

  useEffect(() => {
    setList(prev => {
      const splittedParams = param ? param.split(',') : []

      const copy = [...prev]
      const modifiedList = copy.map(el => ({
        ...el,
        isSelect: splittedParams.includes(el.name),
      }))

      return modifiedList
    })
  }, [param])

  return { onClickListEl, param, list }
}
