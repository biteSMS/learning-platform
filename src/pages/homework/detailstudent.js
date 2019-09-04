import Taro, { Component } from "@tarojs/taro"
import {
  handleResponse,
  getDate,
  getSubmitStatus,
  getCheckHomeworkStatus
} from "@/utils"
import { URLS } from "@/constants/urls"
import { AtMessage } from "taro-ui"
import "./detailstudent.less"

export default class DetailStudent extends Component {
  config = {
    navigationBarTitleText: "作业详情"
  }

  constructor(props) {
    super(props)
    this.state = {
      submitId: null,
      detail: {
        submitTime: 1561126630458
      }
    }
  }

  componentWillMount() {
    this.setState(
      {
        submitId: this.$router.params.submitId
      },
      () => this.getDetails()
    )
  }

  getDetails = async () => {
    try {
      const res = await Taro.request({
        url: URLS.GET_HOMEWORK_DETAIL,
        method: "GET",
        data: {
          submitId: this.state.submitId
        },
        header: {
          token: Taro.getStorageSync("token")
        }
      })
      console.log(res)
      await handleResponse(res)
      this.setState({
        detail: res.data.data
      })
    } catch (err) {
      console.log(err)
    }
  }

  handleClickImg = () => {
    Taro.previewImage({
      urls: this.state.detail.images.map(e => e.url)
    })
  }

  handleChangeResult = e => {
    this.setState({
      result: e.detail.value
    })
  }

  handleClickButton = async () => {
    try {
      const res = await Taro.request({
        url: URLS.CHECK_HOMEWORK,
        method: "GET",
        data: {
          submitId: this.state.submitId,
          result: this.state.result
        },
        header: {
          token: Taro.getStorageSync("token")
        }
      })
      await handleResponse(res)
      this.getDetails()
      this.setState({
        result: ''
      })
      Taro.atMessage({
        message: '评价成功',
        type: 'success'
      })
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    const {
      content,
      submitTime,
      pastDue,
      checkStatus,
      images
    } = this.state.detail
    return (
      <View className="detail-teacher">
        <AtMessage />
        <View className="homework-info">
          <View className="content detail-content">
            作业内容：{content || "无"}
          </View>
          <View className="start">提交时间：{getDate(submitTime)}</View>
          <View className="start">提交状态：{getSubmitStatus(pastDue)}</View>
          <View className="start">
            批改状态：{getCheckHomeworkStatus(checkStatus)}
          </View>
          <View className="start">附件：{images.length === 0 ? '无' : ''}</View>
          <View className="file">
            {images.map(e => (
              <Image key={e.id} src={e.url} onClick={this.handleClickImg} />
            ))}
          </View>
          <View className="start">老师评价：{this.state.detail.result || "暂未评价"}</View>
        </View>
      </View>
    )
  }
}