export const adaptiveSize = (
  pcSize: number,
  mobSize: number,
  customSize = 320,
  fullSize = 1920
) => {
  const addSize = pcSize - mobSize
  return (
    mobSize +
    addSize * ((window.screen.width - customSize) / (fullSize - customSize))
  )
}
