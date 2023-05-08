export const formatImgUrl = (url: string) => {
  if (!url.startsWith('http')) {
    return `http:${url}`
  }
  return url
}
