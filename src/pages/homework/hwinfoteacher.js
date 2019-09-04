import Taro, { Component } from "@tarojs/taro"
import { handleResponse, getDate } from "@/utils"
import { URLS } from "@/constants/urls"
import { AtList, AtListItem, AtMessage } from "taro-ui"
import "./hwinfoteacher.less"

export default class HomeworkInfoTeacher extends Component {
  config = {
    navigationBarTitleText: "作业详情",
    enablePullDownRefresh: true
  }

  constructor(props) {
    super(props)
    this.state = {
      homeworkId: null,
      homework: {
        startTime: 1561126630458,
        deadline: 1561126630458
      },
      submitRecord: []
    }
  }

  async onPullDownRefresh() {
    await Promise.all[this.getDetails(), this.getSubmitRecord()]
    Taro.stopPullDownRefresh()
    Taro.atMessage({
      message: '更新成功',
      type: 'success'
    })
  }

  componentWillMount() {
    this.setState(
      {
        homeworkId: this.$router.params.homeworkId
      },
      () => {
        this.getDetails(), this.getSubmitRecord()
      }
    )
  }

  getDetails = async () => {
    try {
      const res = await Taro.request({
        url: URLS.GET_HOMEWORK_ALL_DETAILS,
        method: "GET",
        data: {
          homeworkId: this.state.homeworkId
        },
        header: {
          token: Taro.getStorageSync("token")
        }
      })
      await handleResponse(res)
      this.setState({
        homework: res.data.data
      })
    } catch (err) {
      console.log(err)
    }
  }

  getSubmitRecord = async () => {
    try {
      const res = await Taro.request({
        url: URLS.GET_SUBMIT_RECORD,
        method: "GET",
        data: {
          homeworkId: this.state.homeworkId
        },
        header: {
          token: Taro.getStorageSync("token")
        }
      })
      await handleResponse(res)
      console.log(res)
      this.setState({
        submitRecord: res.data.data
      })
    } catch (err) {
      console.log(err)
    }
  }

  handleClickImg = () => {
    Taro.previewImage({
      urls: this.state.homework.files.map(e => e.url)
    })
  }

  handleClickItem = submitId => {
    Taro.navigateTo({
      url: `/pages/homework/detailteacher?submitId=${submitId}`
    })
  }

  render() {
    const { title, content, startTime, deadline, files } = this.state.homework

    return (
      <View className="homework-info-teacher">
        <AtMessage />
        <View className="homework-info">
          <View className="title">{title}</View>
          <View className="content">{content}</View>
          <View className="start">开始时间：{getDate(startTime)}</View>
          <View className="start">截止时间：{getDate(deadline)}</View>
          <View className="start">附件：{files.length === 0 ? '无' : ''}</View>
          <View className="file">
            {files.map(e => (
              <Image key={e.id} src={e.url} onClick={this.handleClickImg} />
            ))}
          </View>
        </View>
        <View className="l-title">学生作业列表</View>
        <AtList>
          {this.state.submitRecord.map(e => (
            <AtListItem
              key={e.workId}
              title={e.name}
              note={e.workId}
              arrow="right"
              onClick={() => this.handleClickItem(e.data.id)}
            />
          ))}
        </AtList>
      </View>
    )
  }
}
