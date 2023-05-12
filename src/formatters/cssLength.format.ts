// === PROPS ===
// @param length - длина в пикселях или процентах

const formatCssLength = (length: string | number) => {
  const stringedLen = length.toString()

  const lastElem = stringedLen.at(-1)
  if (lastElem === '%') {
    return length.toString()
  }

  if (stringedLen.length > 2) {
    const twoLastElems = stringedLen.at(-2)! + stringedLen.at(-1)!
    if (twoLastElems === 'px') {
      return length.toString()
    }
  }

  if (+length) {
    return `${length}px`
  }

  return `0px`
}

export default formatCssLength
