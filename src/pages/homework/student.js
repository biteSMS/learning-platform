import Taro, { Component } from "@tarojs/taro"
import { handleResponse, getDate } from "@/utils"
import { URLS } from "@/constants/urls"
import { AtList, AtListItem, AtMessage } from "taro-ui"
import "./student.less"

export default class Student extends Component {
  config = {
    navigationBarTitleText: "作业",
    enablePullDownRefresh: true
  }

  constructor(props) {
    super(props)
    this.state = {
      classId: null,
      homeworkList: [],
      submitRecord: []
    }
  }

  async onPullDownRefresh() {
    await Promise.all([this.getHomeworkList(), this.getSubmitRecord()])
    Taro.stopPullDownRefresh()
    Taro.atMessage({
      message: "更新成功",
      type: "success"
    })
  }

  componentWillMount() {
    this.setState(
      {
        classId: this.$router.params.classId
      },
      () => {
        this.getHomeworkList()
        this.getSubmitRecord()
      }
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

  getSubmitRecord = async () => {
    try {
      const res = await Taro.request({
        url: URLS.GET_STU_SUBMIT_RECORD,
        method: "GET",
        data: {
          classId: this.state.classId
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

  handleClickHomework = homeworkId => {
    Taro.navigateTo({
      url: `/pages/homework/hwinfostudent?homeworkId=${homeworkId}`
    })
  }

  handleClickItem = submitId => {
    Taro.navigateTo({
      url: `/pages/homework/detailstudent?submitId=${submitId}`
    })
  }

  render() {
    return (
      <View className="homework-student">
        <AtMessage />
        <View className="title">作业发布记录</View>
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
              onClick={() => this.handleClickHomework(e.id)}
            />
          ))}
        </AtList>
        <View className="title" style={{ marginTop: "30px" }}>
          作业提交记录
        </View>
        <AtList>
          {this.state.submitRecord.map(e => (
            <AtListItem
            key={e.submitId}
            title={e.title}
            arrow="right"
            note={getDate(e.submitTime)}
            onClick={() => this.handleClickItem(e.submitId)}
          />
          ))}
        </AtList>
      </View>
    )
  }
}
