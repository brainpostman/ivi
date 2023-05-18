import { store } from '@/store'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'

// @param {ReactNode} component - компонент

export const renderModif = (component: React.ReactNode) => {
  return render(<Provider store={store}>{component}</Provider>)
}
