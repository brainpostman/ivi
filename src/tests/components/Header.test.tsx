import Header from '@/components/Header/Header'
import { createMockRouter } from '@/utils/test-utils/createMockRouter'
import { renderModif } from '@/utils/test-utils/renderModif'
import { screen } from '@testing-library/react'
import { RouterContext } from 'next/dist/shared/lib/router-context'
import { useTranslation } from 'next-i18next'
import { fireEvent, waitFor, act } from '@testing-library/react'

const router = jest.spyOn(require('next/router'), 'useRouter')

jest.mock('react-i18next', () => ({
  useTranslation: () => {
    return {
      t: (str: string) => str,
      i18n: {
        changeLanguage: () => new Promise(() => {}),
      },
    }
  },
}))

describe('<Header />', () => {
  beforeAll(() => {
    renderModif(
      <RouterContext.Provider value={createMockRouter({})}>
        <Header />
      </RouterContext.Provider>
    )
  })

  it('Click movies link', async () => {
    const { t } = useTranslation('header', { keyPrefix: 'left-side.titles' })

    router.mockImplementation(() => ({
      pathname: '/movies',
    }))

    const moviesTab = screen.getByText(t('movies'))

    fireEvent.click(moviesTab)

    expect(router).toHaveBeenCalledWith({ pathname: '/movies' })
  })
})
