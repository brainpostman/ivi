import { formatImgUrl } from '@/formatters/imgUrl.format'

const dataWithHttp = 'http://example.com'
const dataWithoutHttp = '//exameple.com'

describe('imgUrl formatter', () => {
  it('Check url with http', () => {
    const resultUrl = formatImgUrl(dataWithHttp)

    expect(resultUrl.startsWith('http')).toBeTruthy()
  })

  it('Check url without http', () => {
    const resultUrl = formatImgUrl(dataWithoutHttp)

    expect(resultUrl.startsWith('http')).toBeTruthy()
  })
})
