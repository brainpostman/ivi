import checkEnLang from '../utils/checkEnLang.utils'

/*
  * Форматируем параметр в зависимости от языка

  * @param {string} query - параметр для русского языка
  * @param {string} enQuery - параметр для английского языка
  * @param {string} locale - локаль
   
  * @returns () => string

*/

const formatQueryLocale = (query: string, enQuery: string, locale: string) => {
  return (param: string) => {
    const isEng = checkEnLang(param)
    return isEng && locale === 'en' ? enQuery : query
  }
}

export default formatQueryLocale
