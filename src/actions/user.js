import Taro from "@tarojs/taro"
import { handleResponse } from "@/utils"
import { URLS } from "@/constants/urls"
import { UPDATE_USER_INFO } from "@/constants/user"

export const updateUserInfo = data => ({
  type: UPDATE_USER_INFO,
  data
})

export const fetchUserInfo = userInfo => async dispatch => {
  try {
    const { code } = await Taro.login()
    const res = await Taro.request({
      url: URLS.LOGIN,
      method: "POST",
      data: {
        code,
        ...userInfo
      }
    })
    const { sex } = userInfo
    const { token, user, type } = res.data.data
    Taro.setStorage({ key: "token", data: token })
    dispatch(
      updateUserInfo({
        sex,
        type,
        ...user
      })
    )
    const { workId } = user
    if (!workId) {
      Taro.redirectTo({ url: "/pages/auth/fillin" })
    } else {
      Taro.switchTab({ url: "/pages/class/index" })
    }
  } catch (err) {
    console.log(err)
  }
}

export const postUserInfo = data => async dispatch => {
  try {
    const res = await Taro.request({
      url: URLS.POST_USER_INFO,
      method: "POST",
      data,
      header: {
        token: Taro.getStorageSync("token")
      }
    })
    await handleResponse(res)
    dispatch(updateUserInfo(data))
    Taro.switchTab({ url: "/pages/class/index" })
  } catch (err) {
    console.log(err)
  }
}

export const modifyUserInfo = data => async dispatch => {
  try {
    const res = await Taro.request({
      url: URLS.POST_USER_INFO,
      method: "POST",
      data,
      header: {
        token: Taro.getStorageSync("token")
      }
    })
    await handleResponse(res)
    dispatch(updateUserInfo(data))
    Taro.atMessage({
      message: "修改成功",
      type: "success"
    })
  } catch (err) {
    console.log(err)
  }
}

export const applyTeacher = () => async dispatch => {
  try {
    const res = await Taro.request({
      url: URLS.APPLY_TEACHER,
      method: "GET",
      header: {
        token: Taro.getStorageSync("token")
      }
    })
    console.log(res)
    await handleResponse(res)
    dispatch(updateUserInfo({ type: 1 }))
    Taro.atMessage({
      message: "申请成功",
      type: "success"
    })
  } catch (err) {
    console.log(err)
  }
}