/*
  * @param {number} ms - задержка (в мс)
  * @returns Promise<unknown>

*/
export const delay = (ms: number): Promise<unknown> =>
  new Promise(resolve => setTimeout(resolve, ms))
