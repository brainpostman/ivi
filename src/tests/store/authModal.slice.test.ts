import { useTypedSelector } from '@/hooks/ReduxHooks'
import { authModalSlice } from '@/store/slices/authModal.slice'

interface IState {
  showAuthModal: boolean
}

jest.mock('react-redux')

const { setAuthModal } = authModalSlice.actions

const state: IState = {
  showAuthModal: false,
}

const getAction = (payload: boolean = false) => ({
  type: setAuthModal.type,
  payload,
})

describe('STORE AUTH MODAL', () => {
  // Проверяем состояние слайса по умолчанию
  it("Check default slice's state", () => {
    const slice = authModalSlice.reducer(state, getAction())
    expect(slice.showAuthModal).toBe(false)
  })

  // Показываем модалку
  it('Check show showAuthModal', () => {
    const slice = authModalSlice.reducer(state, getAction(true))
    expect(slice.showAuthModal).toBe(true)
  })
})
