import formatValueCondition from '@/formatters/valueCondition.format'
import checkEnLang from '../utils/checkEnLang.utils'

const genreCondition = (locale: string) => (query: string) => {
  const check = checkEnLang(query)
  const isEng = locale === 'en'
  return check && isEng
}

const formatQueryLocale =
  (value: string, enValue: string, locale: string) => () =>
    formatValueCondition(value, enValue, genreCondition(locale))

export default formatQueryLocale
