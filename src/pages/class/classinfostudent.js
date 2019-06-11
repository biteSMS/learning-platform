import Taro, { Component } from "@tarojs/taro"
import { handleResponse } from "@/utils"
import { URLS } from "@/constants/urls"
import { AtGrid } from "taro-ui"
import "./classinfo.less"

export class ClassInfoStudent extends Component {
  config = {
    navigationBarTitleText: "班级详情"
  }

  constructor(props) {
    super(props)
    this.state = {
      classInfo: {}
    }
  }

  async componentWillMount() {
    try {
      const classId = this.$router.params.classId
      const res = await Taro.request({
        url: URLS.GET_CLASS_INFO,
        method: "GET",
        data: {
          classId
        },
        header: {
          token: Taro.getStorageSync("token")
        }
      })
      await handleResponse(res)
      const classInfo = res.data.data
      this.setState({
        ...this.state,
        classInfo
      })
    } catch (err) {
      console.log(err)
    }
  }

  handleClick = (item, index) => {
    switch (index) {
      case 2:
        Taro.navigateTo({url: `/pages/class/members?classId=${this.state.classInfo.classId}`})
        break
      default:
        console.log('de')
        break
    }
  }

  render() {
    const gridList = [
      {
        image: require("@/assets/checkin.png"),
        value: "签到"
      },
      {
        image: require("@/assets/homework.png"),
        value: "作业"
      },
      {
        image: require("@/assets/members.png"),
        value: "班级成员"
      },
      {
        image: require("@/assets/qrcode.png"),
        value: "班级二维码"
      },
      {
        image: require("@/assets/exit.png"),
        value: "退出班级"
      }
    ]
    const {
      className,
      detail,
      teacherName,
      code
    } = this.state.classInfo

    return (
      <View className="classinfo">
        <View className="classinfo-card">
          <View className="classname">{className}</View>
          <View className="detail subtitle">课程详情：{detail}</View>
          <View className="teacher subtitle">任课老师：{teacherName}</View>
          <View className="code subtitle">班级码：{code}</View>
        </View>
        <View className="grid">
          <AtGrid data={gridList} onClick={this.handleClick} />
        </View>
      </View>
    )
  }
}
