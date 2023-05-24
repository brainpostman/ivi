/*
  * @param {string} url - ссылка на изображение
  * @returns string - валидная ссылка

*/
export const formatImgUrl = (url: string): string => {
  if (!url.startsWith('http')) {
    return `http:${url}`
  }
  return url
}
