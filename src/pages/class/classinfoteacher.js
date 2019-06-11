import Taro, { Component } from "@tarojs/taro"
import { handleResponse } from "@/utils"
import { URLS } from "@/constants/urls"
import { AtGrid, AtModal } from "taro-ui"
import { dissolveClass } from "@/actions/class"
import { connect } from "@tarojs/redux"
import "./classinfo.less"

class ClassInfoTeacher extends Component {
  config = {
    navigationBarTitleText: "班级详情"
  }

  constructor(props) {
    super(props)
    this.state = {
      classInfo: {},
      isDissolveOpen: false
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
      case 6:
        this.setState({
          isDissolveOpen: true
        })
        break
      default:
        console.log('de')
        break
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
      code,
      classId
    } = this.state.classInfo

    return (
      <View className="classinfo">
        <AtModal
          isOpened={this.state.isDissolveOpen}
          content="确认要解散班级吗？"
          cancelText="取消"
          confirmText="退出"
          onCancel={() => this.setState({...this.state, isDissolveOpen: false})}
          onConfirm={() => this.props.dissolveClass({classId})}
        />
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

const mapDispatchToProps = dispatch => ({
  dissolveClass(data) {
    dispatch(dissolveClass(data))
  }
})

export default connect(
  () => ({}),
  mapDispatchToProps
)(ClassInfoTeacher)