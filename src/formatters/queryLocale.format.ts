import formatValueCondition from '@/formatters/valueCondition.format'
import checkEnLang from '../utils/checkEnLang.utils'

/*
  * Проверяем язык параметра

  * @param {string} locale - локаль

  * @returns () => boolean

*/

const conditionCallback =
  (locale: string) =>
  (query: string): boolean => {
    const check = checkEnLang(query)
    const isEng = locale === 'en'
    return check && isEng
  }

/*
  * Форматируем параметр в зависимости от языка

  * @param {string} query - параметр для русского языка
  * @param {string} enQuery - параметр для английского языка
  * @param {string} locale - локаль
   
  * @returns () => string

*/

const formatQueryLocale =
  (query: string, enQuery: string, locale: string) => (): string =>
    formatValueCondition(query, enQuery, conditionCallback(locale))

export default formatQueryLocale
