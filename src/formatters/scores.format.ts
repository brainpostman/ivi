export const formatScores = (scores: number) => {
  const stringedScores = scores.toString()
  const splittedRating = stringedScores.split('.')

  if (splittedRating.length === 1) {
    return [stringedScores, ',0']
  }

  return [splittedRating[0], `,${splittedRating[1]}`]
}
