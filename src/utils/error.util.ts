import { toast } from 'react-toastify'

// === PROPS ===
// @param { * } message - ошибка / список ошибок

export const displayErrorsServer = (message: string | string[] | undefined) => {
  if (!message) {
    console.error('ERROR: Неизвестная ошибка')
  }

  if (Array.isArray(message)) {
    message.forEach(currentMessage => {
      console.error(`ERROR: ${currentMessage}`)
    })
    return
  }

  console.error(`ERROR: ${message}`)
}

// === PROPS ===
// @param { * } message - ошибка / список ошибок

export const displayErrorsClient = (message: string | string[] | undefined) => {
  if (!message) {
    toast.error('ERROR: Неизвестная ошибка')
  }

  if (Array.isArray(message)) {
    message.forEach(() => {
      toast.error(message)
    })
    return
  }

  toast.error(message)
}
