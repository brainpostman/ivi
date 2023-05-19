/*
  * Форматирует оценку: домножает на множитель и отсекается лишние знакие после 
    запятой

  * @param {number | undefined} scoreAVG - оценка
  * @returns number - отформартированная оценка

*/

const multiple = 100
const digitsAfterComma = 1

const formatScoreAVG = (scoreAVG: number | undefined): number => {
  if (!scoreAVG) {
    console.error('Wrong scoreAVG value {undefined}')
    return 0
  }

  const isNumber = !!Number(scoreAVG)

  if (!isNumber) {
    console.error('Wrong scoreAVG value {not number}')
    return 0
  }

  const multipliedScore = scoreAVG * multiple
  const result = Number(multipliedScore.toFixed(digitsAfterComma))

  return result
}

export default formatScoreAVG
