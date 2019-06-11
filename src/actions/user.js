import Taro from "@tarojs/taro"
import { handleResponse } from "@/utils"
import { URLS } from "@/constants/urls"
import { UPDATE_USER_INFO } from "@/constants/user"

export const updateUserInfo = data => ({
  type: UPDATE_USER_INFO,
  data
})

export const fetchUserInfo = userInfo => async dispatch => {
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
  return workId
}

export const postUserInfo = data => async dispatch => {
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
}

export const applyTeacher = () => async dispatch => {
  const res = await Taro.request({
    url: URLS.APPLY_TEACHER,
    method: "GET",
    header: {
      token: Taro.getStorageSync("token")
    }
  })
  await handleResponse(res)
  dispatch(updateUserInfo({ type: 1 }))
}