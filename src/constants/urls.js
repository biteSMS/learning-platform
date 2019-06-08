const baseURL = 'https://min.our16.top/api'

const api = {
  LOGIN: '/user/login'
}

export const URLS =
  Object.entries(api)
  .map(([k, v]) => ({[k]: baseURL + v}))
  .reduce((p, n) => ({...p, ...n}))