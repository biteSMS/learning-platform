import Taro, { Component } from "@tarojs/taro"
import { handleResponse } from "@/utils"
import { URLS } from "@/constants/urls"
import { AtGrid } from "taro-ui"
import "./classinfo.less"

export class ClassInfoTeacher extends Component {
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

  render() {
    const gridList = [
      {
        image: require('@/assets/checkin.png'),
        value: "签到"
      },
      {
        image: require('@/assets/homework.png'),
        value: "作业"
      },
      {
        image: require('@/assets/members.png'),
        value: "班级成员"
      },
      {
        image: require('@/assets/qrcode.png'),
        value: "班级二维码"
      },
      {
        image: require('@/assets/kick-out.png'),
        value: "踢出成员"
      },
      {
        image: require('@/assets/update.png'),
        value: "更新班级信息"
      },
      {
        image: require('@/assets/dissolve.png'),
        value: "解散班级"
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
          <AtGrid data={gridList} />
        </View>
      </View>
    )
  }
}