/*
  * Форматирует значение в зависимости от условия

  * @param {T} value - значение, если условие не выполнено
  * @param {T} conditValue - значение, если условие выполнено
  * @param {(_value: T) => boolean} conditionCallback - условие
   
  * @returns T

*/

const formatValueCondition = <T>(
  value: T,
  conditValue: T,
  conditionCallback: (_value: T) => boolean
): T => {
  const check = conditionCallback(value)
  const result = check ? conditValue : value

  return result
}

export default formatValueCondition
