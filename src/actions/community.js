import Taro from "@tarojs/taro"
import { handleResponse } from "@/utils"
import { URLS } from "@/constants/urls"
import { UPDATE_TOPICS } from '@/constants/community'

const updateTopics = data => ({
  type: UPDATE_TOPICS,
  data
})

export const getTopics = () => async dispatch => {
  const res = await Taro.request({
    url: URLS.GET_TOPICS,
    method: "GET",
    header: {
      token: Taro.getStorageSync("token")
    }
  })
  await handleResponse(res)
  dispatch(updateTopics(res.data.data))
}