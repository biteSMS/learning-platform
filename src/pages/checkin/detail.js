import Taro, { Component } from "@tarojs/taro"
import { handleResponse, getDate, getCheckInStatus } from "@/utils"
import { URLS } from "@/constants/urls"
import { AtList, AtListItem, AtButton, AtMessage, AtModal } from "taro-ui"
import { Picker } from '@tarojs/components'
import "./detail.less"

export default class Detail extends Component {
  config = {
    navigationBarTitleText: "签到详情",
    enablePullDownRefresh: true
  }

  constructor(props) {
    super(props)
    this.state = {
      siginId: null,
      classId: null,
      checkInDetail: {
        start: 1560365168405,
        deadline: 1560365168405,
        code: "123456"
      },
      checkInList: [],
      showModal: false,
      showStop: false
    }
  }

  componentWillMount() {
    this.setState(
      {
        siginId: this.$router.params.siginId,
        classId: this.$router.params.classId
      },
      () => this.getCheckInDetail()
    )
  }

  async onPullDownRefresh() {
    await this.getCheckInDetail()
    Taro.stopPullDownRefresh()
    Taro.atMessage({
      message: '更新成功',
      type: 'success'
    })
  }

  getCheckInDetail = async () => {
    try {
      const res = await Taro.request({
        url: URLS.GET_CHECK_IN_DETAIL,
        method: "GET",
        data: {
          siginId: this.state.siginId,
          type: 0
        },
        header: {
          token: Taro.getStorageSync("token")
        }
      })
      await handleResponse(res)
      this.setState({
        checkInDetail: {
          start: res.data.data.start,
          deadline: res.data.data.deadline,
          code: res.data.data.code
        },
        checkInList: res.data.data.siginDetail,
        showStop: +new Date() < +new Date(res.data.data.deadline)
      })
    } catch (err) {
      console.log(err)
    }
  }

  handleCloseModal = () => {
    this.setState({
      showModal: false
    })
  }

  handleCancelModal = () => {
    this.setState({
      showModal: false
    })
  }

  handleConfirmModal = async () => {
    try {
      const res = await Taro.request({
        url: URLS.STOP_CHECK_IN,
        method: "GET",
        data: {
          siginId: this.state.siginId,
          classId: this.state.classId,
          type: 1
        },
        header: {
          token: Taro.getStorageSync("token")
        }
      })
      await handleResponse(res)
      await this.getCheckInDetail()
      this.setState({
        showModal: false,
        showStop: false
      })
      Taro.atMessage({
        message: '提前结束签到成功',
        type: 'success'
      })
    } catch (err) {
      console.log(err)
    }
  }

  handleChange = async (uid, e) => {
    try {
      const status = +e.detail.value
      const res = await Taro.request({
        url: URLS.POST_CHECK_IN_STATUS,
        method: "GET",
        data: {
          uid,
          status,
          siginDetailId: this.state.siginId
        },
        header: {
          token: Taro.getStorageSync("token")
        }
      })
      await handleResponse(res)
      this.getCheckInDetail()
      Taro.atMessage({
        message: '修改成功',
        type: 'success'
      })
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    const selector = ['出勤', '迟到', '缺勤', '请假']
    return (
      <View className="check-in-detail">
        <AtMessage />
        <View className="card">
          <View className="code">签到码：{this.state.checkInDetail.code}</View>
          <View className="start">
            开始时间：{getDate(this.state.checkInDetail.start)}
          </View>
          <View className="end">
            截止时间：{getDate(this.state.checkInDetail.deadline)}
          </View>
          {this.state.showStop && (
            <AtButton className="stop-button" type="primary" onClick={() => this.setState({showModal: true})}>
              提前结束签到
            </AtButton>
          )}
        </View>
        <View className="title">学生签到状态 (点击修改、下拉刷新)</View>
        {this.state.checkInList.length === 0 && (
          <View className="none">还未有签到的学生</View>
        )}
        <AtList>
          {this.state.checkInList.map(e => (
            <Picker
              key={e.id}
              onChange={ev => this.handleChange(e.id ,ev)}
              range={selector}
            >
              <AtListItem title={e.name} note={e.workId} extraText={getCheckInStatus(e.status)} />
            </Picker>
          ))}
        </AtList>
        <AtModal
          isOpened={this.state.showModal}
          content="确认要提前结束签到吗？"
          cancelText='取消'
          confirmText='确认'
          onClose={ this.handleCloseModal }
          onCancel={ this.handleCancelModal }
          onConfirm={ this.handleConfirmModal }
        />
      </View>
    )
  }
}
