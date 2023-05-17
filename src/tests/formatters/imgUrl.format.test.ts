import { formatImgUrl } from '@/formatters/imgUrl.format'

const dataWithHttp = 'http://example.com'
const dataWithoutHttp = '//exameple.com'

describe('FORMAT imgUrl', () => {
  it('Url with http', () => {
    const resultUrl = formatImgUrl(dataWithHttp)

    expect(resultUrl.startsWith('http')).toBeTruthy()
  })

  it('Url without http', () => {
    const resultUrl = formatImgUrl(dataWithoutHttp)

    expect(resultUrl.startsWith('http')).toBeTruthy()
  })
})
