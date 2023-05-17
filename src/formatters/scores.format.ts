export const formatScores = (rating: string) => {
  const splittedRating = rating.split('.')

  if (splittedRating.length === 1) {
    return [rating, ',0']
  }

  return [splittedRating[0], `,${splittedRating[1]}`]
}
