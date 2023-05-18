import { useRouter } from 'next/router'

/*
  * @param {string} query - параметр
  * @returns string - значение параметра из url

*/

export const useGetParam = (query: string): string => {
  const router = useRouter()
  const params = router.query
  const resultParam = params[query] as string

  return resultParam
}
