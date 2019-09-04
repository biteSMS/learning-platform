import Taro, { Component } from '@tarojs/taro'
import { handleResponse, getDate } from "@/utils"
import { URLS } from "@/constants/urls"
import { AtButton } from 'taro-ui'
import './hwinfostudent.less'

export default class HomeworkInfoStudent extends Component {
  config = {
    navigationBarTitleText: "作业详情"
  }

  constructor(props) {
    super(props)
    this.state = {
      homeworkId: null,
      homework: {
        startTime: 1561126630458,
        deadline: 1561126630458
      }
    }
  }

  componentWillMount() {
    this.setState({
      homeworkId: this.$router.params.homeworkId
    }, () => this.getDetails())
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
      console.log(res)
    } catch (err) {
      console.log(err)
    }
  }

  handleClickImg = () => {
    Taro.previewImage({
      urls: this.state.homework.files.map(e => e.url)
    })
  }

  handleClickButton = () => {
    Taro.navigateTo({url: `/pages/homework/submit?homeworkId=${this.state.homeworkId}`})
  }

  render() {
    const {
      title,
      content,
      startTime,
      deadline,
      files
    } = this.state.homework
    
    return (
      <View className="homework-info-student">
        <View className="homework-info">
          <View className="title">{title}</View>
          <View className="content">{content}</View>
          <View className="start">开始时间：{getDate(startTime)}</View>
          <View className="start">截止时间：{getDate(deadline)}</View>
          <View className="start">附件：{files.length === 0 ? '无' : ''}</View>
          <View className="file">
            {files.map(e => (<Image key={e.id} src={e.url} onClick={this.handleClickImg} />))}
          </View>
        </View>
        <AtButton
          className="button"
          type="primary"
          onClick={this.handleClickButton}
        >提交作业</AtButton>
      </View>
    )
  }
}