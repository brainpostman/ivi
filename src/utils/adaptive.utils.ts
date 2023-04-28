export const adaptiveSize = (
  pcSize: number,
  mobSize: number,
  customSize = 320
) => {
  const addSize = pcSize - mobSize
  return (
    mobSize +
    addSize * ((window.screen.width - customSize) / (1920 - customSize))
  )
}
