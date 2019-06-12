import Taro, { Component } from "@tarojs/taro"
import { handleResponse } from "@/utils"
import { URLS } from "@/constants/urls"
import { AtGrid, AtModal } from "taro-ui"
import { exitClass } from "@/actions/class"
import { connect } from "@tarojs/redux"
import "./classinfo.less"

class ClassInfoStudent extends Component {
  config = {
    navigationBarTitleText: "班级详情"
  }

  constructor(props) {
    super(props)
    this.state = {
      classInfo: {},
      isExitOpen: false
    }
  }

  async componentWillMount() {
    this.getClassInfo()
  }

  getClassInfo = async () => {
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
        classInfo
      })
    } catch (err) {
      console.log(err)
    }
  }

  handleExit = async () => {
    try {
      await this.props.exitClass({classId: this.state.classInfo.classId})
      wx.navigateBack({
        delta: 1
      })
    } catch (err) {
      console.log(err)
    }
  }

  handleClick = (item, index) => {
    switch (index) {
      case 0:
        Taro.navigateTo({
          url: `/pages/checkin/student?classId=${this.state.classInfo.classId}`
        })
        break
      case 2:
        Taro.navigateTo({
          url: `/pages/class/members?classId=${this.state.classInfo.classId}`
        })
        break
      case 4:
        this.setState({
          isExitOpen: true
        })
        break
      default:
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
    const { className, detail, teacherName, code } = this.state.classInfo

    return (
      <View className="classinfo">
        <AtModal
          isOpened={this.state.isExitOpen}
          content="确认要退出班级吗？"
          cancelText="取消"
          confirmText="退出"
          onCancel={() => this.setState({...this.state, isExitOpen: false})}
          onConfirm={this.handleExit}
        />
        <View className="classinfo-card">
          <View className="classname">{className}</View>
          <View className="detail subtitle">课程详情：{detail || '暂无课程详情～'}</View>
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

const mapDispatchToProps = dispatch => ({
  exitClass(data) {
    return dispatch(exitClass(data))
  }
})

export default connect(
  () => ({}),
  mapDispatchToProps
)(ClassInfoStudent)
