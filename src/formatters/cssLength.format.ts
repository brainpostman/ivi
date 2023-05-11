// === PROPS ===
// @param length - длина в пикселях или процентах

const formatCssLength = (length: string | number) => {
  const stringedLen = length.toString()

  if (length.toString().length < 2) {
    console.error('UNCORRECT CSS LENGTH')
    return `0px`
  }

  const lastElem = stringedLen.at(-1)
  if (lastElem === '%') {
    return length
  }

  const twoLastElems = stringedLen.at(-2)
  if (twoLastElems === 'px') {
    return length
  }

  if (+length) {
    return `${length}px`
  }
}

export default formatCssLength
