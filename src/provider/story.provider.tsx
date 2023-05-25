import { store } from '@/store'
import { SessionProvider } from 'next-auth/react'
import { FC, PropsWithChildren } from 'react'
import { Provider } from 'react-redux'

const StoryProvider: FC<PropsWithChildren<unknown>> = ({ children }) => {
  return (
    <SessionProvider>
      <Provider store={store}>{children}</Provider>
    </SessionProvider>
  )
}

export default StoryProvider
