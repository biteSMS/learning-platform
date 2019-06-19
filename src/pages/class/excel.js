import Taro, { Component } from "@tarojs/taro"
import { AtList, AtListItem } from "taro-ui"
import { handleResponse } from "@/utils"
import { URLS } from "@/constants/urls"
import "./excel.less"

export default class Excel extends Component {
  config = {
    navigationBarTitleText: "导出"
  }

  constructor(props) {
    super(props)
    this.state = {
      classId: null,
      data: {}
    }
  }

  componentWillMount() {
    this.setState(
      {
        classId: this.$router.params.classId
      },
      () => this.getExcel()
    )
  }

  getExcel = async () => {
    try {
      const classId = this.state.classId
      const res = await Taro.request({
        url: URLS.GET_EXCEL,
        method: "GET",
        data: {
          classId
        },
        header: {
          token: Taro.getStorageSync("token")
        }
      })
      await handleResponse(res)
      console.log(res)
      this.setState({
        data: res.data.data
      })
    } catch (err) {
      console.log(err)
    }
  }

  setClipboardData = async data => {
    try {
      await Taro.setClipboardData({
        data
      })
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    return (
      <View className="excel">
        <AtList>
          <AtListItem
            title="导出班级成员"
            note="班级成员的个人详细信息"
            thumb={require("@/assets/tabbar/class-active.png")}
            onClick={() => this.setClipboardData(this.state.data.student)}
          />
          <AtListItem
            title="导出签到汇总"
            note="班级成员的所有签到统计"
            thumb={require("@/assets/checkin.png")}
            onClick={() => this.setClipboardData(this.state.data.sigin)}
          />
          <AtListItem
            title="导出作业汇总"
            note="班级成员的所有作业统计"
            thumb={require("@/assets/homework.png")}
            onClick={() => this.setClipboardData(this.state.data.homework)}
          />
        </AtList>
        <View className="tips tips1">点击获取Excel下载链接</View>
        <View className="tips">下载链接有效时间为10分钟，下拉刷新可再次下载。</View>
      </View>
    )
  }
}
