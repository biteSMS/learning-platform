import Taro from "@tarojs/taro"
import { handleResponse } from "@/utils"
import { URLS } from "@/constants/urls"
import { MODIFY_USER_INFO } from "@/constants/user"

export const modifyUserInfo = data => ({
  type: MODIFY_USER_INFO,
  data
})

export const fetchUserInfo = userInfo => {
  return async dispatch => {
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
        modifyUserInfo({
          sex,
          type,
          ...user
        })
      )
      const { username, workId } = user
      if (!workId) {
        Taro.redirectTo({ url: "/pages/auth/fillin" })
      } else {
        Taro.switchTab({ url: "/pages/class/index" })
      }
    } catch (err) {
      console.log(err)
    }
  }
}

export const postUserInfo = data => {
  return async dispatch => {
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
      dispatch(modifyUserInfo(data))
      Taro.switchTab({ url: "/pages/class/index" })
    } catch (err) {
      console.log(err)
    }
  }
}

export const updateUserInfo = data => {
  return async dispatch => {
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
      dispatch(modifyUserInfo(data))
      Taro.navigateBack({ delta: 1 })
      Taro.showToast({
        title: "修改成功！",
        duration: 2000
      })
    } catch (err) {
      console.log(err)
    }
  }
}
