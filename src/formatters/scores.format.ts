/*
  * @param {number} scores - оценка
  * @returns [string, string] - обработанная оценка

*/

export const formatScores = (scores: number): [string, string] => {
  const stringedScores = scores.toString()
  const splittedRating = stringedScores.split('.')

  if (splittedRating.length === 1) {
    return [stringedScores, ',0']
  }

  return [splittedRating[0], `,${splittedRating[1]}`]
}
