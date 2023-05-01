import { toastContainerConfig } from '@/configs/toast.config'
import { store } from '@/store'
import '@/styles/globals.scss'
import { SessionProvider } from 'next-auth/react'
import { appWithTranslation } from 'next-i18next'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'

function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <Provider store={store}>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
      <ToastContainer {...toastContainerConfig} />
    </Provider>
  )
}

export default appWithTranslation(App)
