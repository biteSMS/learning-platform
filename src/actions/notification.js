import Taro from "@tarojs/taro"
import { handleResponse } from "@/utils"
import { URLS } from "@/constants/urls"
import { UPDATE_NOTIFICATION } from '@/constants/notification'

const updateNotification = data => ({
  type: UPDATE_NOTIFICATION,
  data
})

export const getNotification = () => async dispatch => {
  const res = await Taro.request({
    url: URLS.GET_NOTIFICATION,
    method: "GET",
    header: {
      token: Taro.getStorageSync("token")
    }
  })
  await handleResponse(res)
  console.log(res)
  dispatch(updateNotification(res.data.data))
}