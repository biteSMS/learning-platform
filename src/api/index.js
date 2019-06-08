import Taro from "@tarojs/taro"
import { URLS } from "@/constants/urls"

export const login = async userInfo => {
  const { code } = await Taro.login()
  const res = await Taro.request({
    url: URLS.LOGIN,
    method: "POST",
    data: {
      code,
      ...userInfo
    }
  })
  return res.data.data
}
