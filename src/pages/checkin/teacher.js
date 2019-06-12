import Taro, { Component } from "@tarojs/taro"
import { handleResponse, getDate } from "@/utils"
import { URLS } from "@/constants/urls"
import { getLocation } from "./getLocation"
import { AtButton, AtList, AtListItem, AtFloatLayout, AtMessage } from "taro-ui"
import { Picker } from "@tarojs/components"

import "./teacher.less"

export default class Teacher extends Component {
  config = {
    navigationBarTitleText: "签到"
  }

  constructor(props) {
    super(props)
    this.state = {
      classId: null,
      checkInList: [],
      timeChecked: [0, 0, 0],
      showOpenSetting: false,
      showFloat: false
    }
  }

  componentWillMount() {
    this.setState(
      {
        classId: this.$router.params.classId
      },
      () => this.getCheckInList()
    )
  }

  getCheckInList = async () => {
    try {
      const res = await Taro.request({
        url: URLS.GET_CHECK_IN_LIST,
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
        checkInList: res.data.data
      })
    } catch (err) {
      console.log(err)
    }
  }

  onChange = e => {
    this.setState({
      timeChecked: e.detail.value
    })
  }

  postCheckIn = async ({ longitude, latitude }) => {
    try {
      const time = this.state.timeChecked
      const res = await Taro.request({
        url: URLS.POST_CHECK_IN,
        method: "GET",
        data: {
          longitude,
          latitude,
          classId: this.state.classId,
          deadLine: time[0] * 3600 + time[1] * 60 + time[2]
        },
        header: {
          token: Taro.getStorageSync("token")
        }
      })
      await handleResponse(res)
      this.getCheckInList()
      Taro.atMessage({
        message: "发布成功",
        type: "success"
      })
      this.setState({
        showFloat: false
      })
    } catch (err) {
      console.log(err)
      if (err === 0) {
        Taro.atMessage({
          message: "请选择正确的签到时长范围",
          type: "error"
        })
      }
    }
  }

  handleClickPost = async () => {
    try {
      const { longitude, latitude } = await getLocation()
      this.postCheckIn({ longitude, latitude })
    } catch (err) {
      this.setState({
        showOpenSetting: true
      })
      Taro.atMessage({
        message: "请授权使用位置权限",
        type: "error"
      })
      console.log(err)
    }
  }

  handleClickDetail = siginId => {
    Taro.navigateTo({url: `/pages/checkin/detail?siginId=${siginId}&classId=${this.state.classId}`})
  }

  render() {
    const hours = [0, 1, 2]
    const ms = [...new Array(60)].map((e, i) => i)
    const range = [hours, ms, ms]
    return (
      <View className="check-in-teacher">
        <AtMessage />
        <AtButton
          className="post-button"
          type="primary"
          onClick={() => this.setState({ showFloat: true })}
        >
          发布签到
        </AtButton>
        <View className="title">签到发布记录 (点击查看详细)</View>
        <AtList>
          {this.state.checkInList.map((checkin, i) => {
            const { siginId, startTime, total } = checkin
            const { sigin, late, absence, vacate } = total
            const date = getDate(startTime)
            return (
              <AtListItem
                key={i}
                title={date}
                arrow="right"
                onClick={() => this.handleClickDetail(siginId)}
                note={`出勤: ${sigin} 缺勤: ${absence} 迟到: ${late} 请假: ${vacate}`}
              />
            )
          })}
        </AtList>
        {this.state.checkInList.length === 0 && (
          <View className="empty-record">无发布签到记录</View>
        )}
        <AtFloatLayout
          title="发布签到"
          isOpened={this.state.showFloat}
          onClose={() => this.setState({ showFloat: false })}
        >
          <View className="post">
            <Picker mode="multiSelector" range={range} onChange={this.onChange}>
              <AtList>
                <AtListItem
                  title="请选择签到时长"
                  extraText={`${this.state.timeChecked[0]}时${
                    this.state.timeChecked[1]
                  }分${this.state.timeChecked[2]}秒`}
                />
              </AtList>
            </Picker>
            <View className="tips">签到时间范围为30秒到2小时</View>
            <AtButton
              className="post-button"
              type="primary"
              onClick={this.handleClickPost}
            >
              发 布
            </AtButton>
            {this.state.showOpenSetting && (
              <Button
                className="open-button"
                type="primary"
                openType="openSetting"
              >
                授 权
              </Button>
            )}
          </View>
        </AtFloatLayout>
      </View>
    )
  }
}
