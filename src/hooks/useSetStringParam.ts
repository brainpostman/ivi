import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useGetParam } from './useGetParam'

interface IOptions {
  isNumber?: boolean
  extraValues?: string[]
}

export const useSetStringParam = (
  query: string,
  defaultValue: string | number = '',
  options?: IOptions
) => {
  const [value, setValue] = useState(defaultValue)

  const param = useGetParam(query)
  const router = useRouter()

  const setUrl = (currentValue: string | number) => {
    let resultValue = currentValue
    if (options?.extraValues?.includes(currentValue.toString())) {
      resultValue = ''
    }

    if (!resultValue) {
      delete router.query[query]
      router.push({ query: router.query }, undefined, { shallow: true })
    } else {
      router.push(
        { query: { ...router.query, [query]: resultValue } },
        undefined,
        { shallow: true }
      )
    }
  }

  useEffect(() => {
    if (options?.isNumber) {
      setValue(parseInt(param))
    }
    setValue(param)
  }, [param])

  return { setUrl, param, value }
}
