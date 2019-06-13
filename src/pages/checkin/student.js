import Taro, { Component } from "@tarojs/taro"
import { getLocation } from "./getLocation"
import { handleResponse, getDate, getCheckInStatus } from "@/utils"
import { URLS } from "@/constants/urls"
import {
  AtInput,
  AtForm,
  AtList,
  AtListItem,
  AtMessage,
  AtButton
} from "taro-ui"
import "./student.less"

export default class Student extends Component {
  config = {
    navigationBarTitleText: "签到",
    enablePullDownRefresh: true
  }

  constructor(props) {
    super(props)
    this.state = {
      classId: null,
      siginCode: "",
      checkInRecord: [],
      showOpenSetting: false
    }
  }

  async onPullDownRefresh() {
    await this.getCheckInRecord()
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
      () => this.getCheckInRecord()
    )
  }

  getCheckInRecord = async () => {
    try {
      const res = await Taro.request({
        url: URLS.GET_CHECK_IN_RECORD,
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
        checkInRecord: res.data.data
      })
    } catch (err) {
      console.log(err)
    }
  }

  postCheckIn = async ({ longitude, latitude }) => {
    try {
      const res = await Taro.request({
        url: URLS.CHECK_IN,
        method: "GET",
        data: {
          latitude,
          longitude,
          classId: this.state.classId,
          siginCode: this.state.siginCode
        },
        header: {
          token: Taro.getStorageSync("token")
        }
      })
      await handleResponse(res)
      this.getCheckInRecord()
      Taro.atMessage({
        message: "签到成功",
        type: "success"
      })
    } catch (err) {
      console.log(err)
      if (err === -1) {
        Taro.atMessage({
          message: "未在老师范围内签到",
          type: "error"
        })
      } else if (err === 0) {
        Taro.atMessage({
          message: "签到码错误",
          type: "error"
        })
      } else if (err === 2) {
        Taro.atMessage({
          message: "签到成功(迟到)",
          type: "warning"
        })
      } else if (err === -2) {
        Taro.atMessage({
          message: "已经签到过了",
          type: "warning"
        })
      } else if (err === 3) {
        Taro.atMessage({
          message: "签到已过期",
          type: "error"
        })
      }
    }
  }

  handleChange = value => {
    this.setState({
      siginCode: value
    })
  }

  handleClick = async () => {
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

  render() {
    return (
      <View className="check-in-student">
        <AtMessage />
        <AtForm>
          <AtInput
            title="签到码"
            type="text"
            maxLength="6"
            placeholder="请输入签到码"
            onChange={this.handleChange}
          />
        </AtForm>
        <AtButton
          className="check-in-button"
          type="primary"
          disabled={this.state.siginCode.length !== 6}
          onClick={this.handleClick}
        >
          签 到
        </AtButton>
        {this.state.showOpenSetting && (
          <Button className="open-button" type="primary" openType="openSetting">
            授 权
          </Button>
        )}
        <View className="title">签到记录</View>
        <AtList>
          {this.state.checkInRecord.map(e => {
            let note = `状态：${getCheckInStatus(e.status)}`
            return (
              <AtListItem title={getDate(e.time)} note={note} key={e.time} />
            )
          })}
        </AtList>
      </View>
    )
  }
}
