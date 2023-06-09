import { displayErrorsServer } from '@/utils/error.util'
import axios, { AxiosError } from 'axios'

export const customAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_PATH,
})

customAxios.interceptors.response.use(
  response => response,
  (error: AxiosError<{ message: string | string[] }>) => {
    const message = error.response?.data?.message
    displayErrorsServer(message)
    return message
  }
)
