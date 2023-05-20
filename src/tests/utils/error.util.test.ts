import { displayErrorsClient, displayErrorsServer } from '@/utils/error.util'
import { toast } from 'react-toastify'

const testArrayErrors = ['error1', 'error2', 'error3']
const testOneError = 'error'

const consoleErrorSpy = jest.spyOn(console, 'error')
const toastErrorSpy = jest.spyOn(toast, 'error')

describe('displayErrors', () => {
  afterEach(() => {
    consoleErrorSpy.mockClear()
    toastErrorSpy.mockClear()
  })

  // Массив ошибок (displayErrorsServer)
  it('displayErrorsServer: Array of values', () => {
    displayErrorsServer(testArrayErrors)

    expect(consoleErrorSpy).toHaveBeenCalledTimes(testArrayErrors.length)
  })

  // Одна ошибка (displayErrorsServer)
  it('displayErrorsServer: One value', () => {
    displayErrorsServer(testOneError)

    expect(consoleErrorSpy).toHaveBeenCalledTimes(1)
  })

  // Массив ошибок (displayErrorsClient)
  it('displayErrorsClient: Array of values', () => {
    displayErrorsClient(testArrayErrors)

    expect(toastErrorSpy).toHaveBeenCalledTimes(testArrayErrors.length)
  })

  // Одна ошибка (displayErrorsClient)
  it('displayErrorsClient: One value', () => {
    displayErrorsClient(testOneError)

    expect(toastErrorSpy).toHaveBeenCalledTimes(1)
  })
})

describe('ERROR displayErrors', () => {
  afterEach(() => {
    consoleErrorSpy.mockClear()
    toastErrorSpy.mockClear()
  })

  // Некорректное значение (displayErrorsServer)
  it('displayErrorsServer: undefined', () => {
    displayErrorsServer(undefined)

    expect(consoleErrorSpy).toHaveBeenCalledWith('ERROR: Неизвестная ошибка')
  })

  // Некорректное значение (displayErrorsClient)
  it('displayErrorsClient: undefined', () => {
    displayErrorsClient(undefined)

    expect(toastErrorSpy).toHaveBeenCalledWith('ERROR: Неизвестная ошибка')
  })
})
