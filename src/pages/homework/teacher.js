import Taro, { Component } from "@tarojs/taro"
import { handleResponse } from "@/utils"
import { URLS } from "@/constants/urls"
import { AtButton, AtList, AtListItem, AtMessage } from "taro-ui"
import "./teacher.less"

export default class Teacher extends Component {
  config = {
    navigationBarTitleText: "作业",
    enablePullDownRefresh: true
  }

  constructor(props) {
    super(props)
    this.state = {
      classId: null,
      homeworkList: []
    }
  }

  async onPullDownRefresh() {
    await this.getHomeworkList()
    Taro.stopPullDownRefresh()
    Taro.atMessage({
      message: '更新成功',
      type: 'success'
    })
  }

  componentWillMount() {
    this.setState(
      {
        classId: this.$router.params.classId
      },
      () => this.getHomeworkList()
    )
  }

  getHomeworkList = async () => {
    try {
      const res = await Taro.request({
        url: URLS.GET_HOMEWORK_LIST,
        method: "GET",
        data: {
          classId: this.state.classId
        },
        header: {
          token: Taro.getStorageSync("token")
        }
      })
      await handleResponse(res)
      this.setState({
        homeworkList: res.data.data
      })
    } catch (err) {
      console.log(err)
    }
  }

  handleClickButton = () => {
    Taro.navigateTo({
      url: `/pages/homework/post?classId=${this.state.classId}`
    })
  }

  handleClickItem = homeworkId => {
    Taro.navigateTo({
      url: `/pages/homework/hwinfoteacher?homeworkId=${homeworkId}`
    })
  }

  render() {
    return (
      <View className="homework-teacher">
        <AtMessage />
        <AtButton
          className="post-button"
          type="primary"
          onClick={this.handleClickButton}
        >
          发布作业
        </AtButton>
        <View className="title">作业发布记录 (点击查看详细)</View>
        {this.state.homeworkList.length === 0 && (
          <View className="none">暂无作业发布记录</View>
        )}
        <AtList>
          {this.state.homeworkList.map(e => (
            <AtListItem
              key={e.id}
              title={e.title}
              arrow="right"
              note={e.content}
              onClick={() => this.handleClickItem(e.id)}
            />
          ))}
        </AtList>
      </View>
    )
  }
}
