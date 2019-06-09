const baseURL = 'https://min.our16.top/api'

const api = {
  LOGIN: '/user/login',
  POST_USER_INFO: '/user/update',
  GET_CLASS_LIST: '/class/classList',
  GET_TEACHER_CLASS_LIST: '/class/teacherClassList',
  JOIN_CLASS: '/class/joinClass',
  CREATE_CLASS: '/class/createClass'
}

export const URLS =
  Object.entries(api)
  .map(([k, v]) => ({[k]: baseURL + v}))
  .reduce((p, n) => ({...p, ...n}))