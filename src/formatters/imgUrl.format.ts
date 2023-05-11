// === PROPS ===
// @param { * } url - ссылка на изображение

export const formatImgUrl = (url: string) => {
  if (!url.startsWith('http')) {
    return `http:${url}`
  }
  return url
}
