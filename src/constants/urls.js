const baseURL = 'https://min.our16.top/api'

const api = {
  LOGIN: '/user/login',
  POST_USER_INFO: '/user/update',
  APPLY_TEACHER: '/user/apply',
  GET_CLASS_LIST: '/class/classList',
  GET_TEACHER_CLASS_LIST: '/class/teacherClassList',
  JOIN_CLASS: '/class/joinClass',
  CREATE_CLASS: '/class/createClass',
  EXIT_CLASS: '/class/outClass',
  DISSOLVE_CLASS: '/class/dissolve',
  KICK_OUT_STUDENT: '/class/letOut',
  GET_CLASS_INFO: '/class/classInfo',
  UPDATE_CLASS_INFO: '/class/updateClassInfo',
  GET_CLASS_MEMBER: '/class/classMember',
  GET_EXCEL: '/excel/getCount',
  POST_CHECK_IN: '/sigin/publishSigin',
  GET_CHECK_IN_LIST: '/sigin/classSiginList',
  GET_CHECK_IN_DETAIL: '/sigin/siginDetail',
  CHECK_IN: '/sigin/sigin',
  GET_CHECK_IN_RECORD: '/sigin/siginRecord',
  GET_CHECK_IN_STATUS: '/sigin/siginNum',
  POST_CHECK_IN_STATUS: '/sigin/changeStatus',
  STOP_CHECK_IN: '/sigin/stopBefore',
  POST_HOMEWORK: '/homework/publishHomework',
  GET_HOMEWORK_LIST: '/homework/homeworkList',
  SUBMIT_HOMEWORK: '/homework/submit',
  GET_SUBMIT_RECORD: '/homework/submitRecord',
  GET_STU_SUBMIT_RECORD: '/homework/submitStuRecord',
  GET_HOMEWORK_DETAIL: '/homework/homeworkDetail',
  GET_HOMEWORK_ALL_DETAILS: '/homework/detail',
  CHECK_HOMEWORK: '/homework/check',
  UPLOAD_FILE: '/file/upload',
  POST_TOPIC: '/topic/publish',
  GET_TOPICS: '/topic/topics',
  DELETE_TOPIC: '/topic/delete',
  GET_TOPIC_DETAIL: '/topic/topicDetail',
  POST_COMMENT: '/comment/publish',
  DELETE_COMMENT: '/comment/delete',
  GET_NOTIFICATION: '/message/unReadMessage'
}

export const URLS =
  Object.entries(api)
  .map(([k, v]) => ({[k]: baseURL + v}))
  .reduce((p, n) => ({...p, ...n}))
