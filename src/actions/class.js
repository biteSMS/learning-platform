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

export const getTeacherClassList = () => async dispatch => {
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

export const joinClass = data => async dispatch => {
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
      message: "加入成功",
      type: "success"
    })
  } catch (err) {
    console.log(err)
    if (err === 0) {
      Taro.atMessage({
        message: "班级不存在",
        type: "error"
      })
    } else if (err === -1) {
      Taro.atMessage({
        message: "你已加入该班级",
        type: "error"
      })
    }
  }
}

export const createClass = data => async dispatch => {
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
      message: "创建成功",
      type: "success"
    })
  } catch (err) {
    console.log(err)
    if (err === 0) {
      Taro.atMessage({
        message: "创建失败",
        type: "error"
      })
    } else if (err === -3) {
      Taro.atMessage({
        message: "你还不是老师！",
        type: "error"
      })
    }
  }
}

export const exitClass = data => async dispatch => {
  try {
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
    wx.navigateBack({
      delta: 1
    })
  } catch (err) {
    console.log(err)
  }
}

export const dissolveClass = data => async dispatch => {
  try {
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
    wx.navigateBack({
      delta: 1
    })
  } catch (err) {
    console.log(err)
  }
}
