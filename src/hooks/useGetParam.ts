import { useRouter } from 'next/router'

// @query - название параметра
export const useGetParam = (query: string) => {
  const router = useRouter()
  const params = router.query
  const resultParam = params[query] as string

  return resultParam
}
