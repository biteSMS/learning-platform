import Taro from "@tarojs/taro"
import { handleResponse } from "@/utils"
import { URLS } from "@/constants/urls"
import { UPDATE_CLASS_LIST, UPDATE_TEACHER_CLASS_LIST } from "@/constants/class"

const updateClassList = data => ({
  type: UPDATE_CLASS_LIST,
  data
})

const updateTeacherClassList = data => ({
  type: UPDATE_TEACHER_CLASS_LIST,
  data
})

export const getClassList = () => async dispatch => {
  const res = await Taro.request({
    url: URLS.GET_CLASS_LIST,
    method: "GET",
    header: {
      token: Taro.getStorageSync("token")
    }
  })
  await handleResponse(res)
  dispatch(updateClassList(res.data.data.classes))
}

export const getTeacherClassList = () => async dispatch => {
  const res = await Taro.request({
    url: URLS.GET_TEACHER_CLASS_LIST,
    method: "GET",
    header: {
      token: Taro.getStorageSync("token")
    }
  })
  await handleResponse(res)
  dispatch(updateTeacherClassList(res.data.data.classes))
}

export const joinClass = data => async dispatch => {
  const res = await Taro.request({
    url: URLS.JOIN_CLASS,
    method: "GET",
    data,
    header: {
      token: Taro.getStorageSync("token")
    }
  })
  await handleResponse(res)
  dispatch(getClassList())
}

export const createClass = data => async dispatch => {
  const res = await Taro.request({
    url: URLS.CREATE_CLASS,
    method: "GET",
    data,
    header: {
      token: Taro.getStorageSync("token")
    }
  })
  await handleResponse(res)
  dispatch(getTeacherClassList())
}

export const exitClass = data => async dispatch => {
  const res = await Taro.request({
    url: URLS.EXIT_CLASS,
    method: "GET",
    data,
    header: {
      token: Taro.getStorageSync("token")
    }
  })
  await handleResponse(res)
  dispatch(getClassList())
}

export const dissolveClass = data => async dispatch => {
  const res = await Taro.request({
    url: URLS.DISSOLVE_CLASS,
    method: "GET",
    data,
    header: {
      token: Taro.getStorageSync("token")
    }
  })
  await handleResponse(res)
  dispatch(getTeacherClassList())
}

export const updateClassInfo = data => async dispatch => {
  const res = await Taro.request({
    url: URLS.UPDATE_CLASS_INFO,
    method: "GET",
    data,
    header: {
      token: Taro.getStorageSync("token")
    }
  })
  await handleResponse(res)
  dispatch(getTeacherClassList())
}
