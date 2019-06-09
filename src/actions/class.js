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

export const getClassList = () => {
  return async dispatch => {
    try {
      const res = await Taro.request({
        url: URLS.GET_CLASS_LIST,
        method: "GET",
        header: {
          token: Taro.getStorageSync("token")
        }
      })
      await handleResponse(res)
      dispatch(updateClassList(res.data.data.classes))
    } catch (err) {
      console.log(err)
    }
  }
}

export const getTeacherClassList = () => {
  return async dispatch => {
    try {
      const res = await Taro.request({
        url: URLS.GET_TEACHER_CLASS_LIST,
        method: "GET",
        header: {
          token: Taro.getStorageSync("token")
        }
      })
      await handleResponse(res)
      dispatch(updateTeacherClassList(res.data.data.classes))
    } catch (err) {
      console.log(err)
    }
  }
}

export const joinClass = data => {
  return async dispatch => {
    try {
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
      Taro.atMessage({
        'message': '加入成功',
        'type': 'success',
      })
    } catch (err) {
      console.log(err)
      if (err === 0) {
        Taro.atMessage({
          'message': '班级不存在',
          'type': 'error',
        })
      } else if (err === -1) {
        Taro.atMessage({
          'message': '你已加入该班级',
          'type': 'error',
        })
      }
    }
  }
}

export const createClass = data => {
  return async dispatch => {
    try {
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
      Taro.atMessage({
        'message': '创建成功',
        'type': 'success',
      })
      return 'ok'
    } catch (err) {
      console.log(err)
      if (err === 0) {
        Taro.atMessage({
          'message': '创建失败',
          'type': 'error',
        })
      }
    }
  }
}