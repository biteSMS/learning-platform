import Taro, { Component } from "@tarojs/taro"
import { handleResponse } from "@/utils"
import { URLS } from "@/constants/urls"
import { AtGrid, AtModal, AtFloatLayout, AtForm, AtInput, AtButton, AtMessage } from "taro-ui"
import { dissolveClass, updateClassInfo } from "@/actions/class"
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
      updateInfo: {
        className: '',
        detail: ''
      },
      isDissolveOpen: false,
      showUpdateInfo: false
    }
  }

  componentWillMount() {
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
        classInfo,
        updateInfo: {
          className: classInfo.className,
          detail: classInfo.detail
        }
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
      case 5:
        this.setState({
          showUpdateInfo: true
        })
        break
      case 6:
        this.setState({
          isDissolveOpen: true
        })
        break
      default:
    }
  }

  handleClickUpdateButton = async () => {
    try {
      await this.props.updateClassInfo({
        ...this.state.updateInfo,
        classId: this.state.classInfo.classId
      })
      Taro.atMessage({
        message: "修改成功！",
        type: "success"
      })
      this.getClassInfo()
      this.setState({
        showUpdateInfo: false
      })
    } catch (err) {
      console.log(err)
    }
  }

  handleDissolve = async () => {
    try {
      await this.props.dissolveClass({classId: this.state.classInfo.classId})
      wx.navigateBack({
        delta: 1
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
        value: "修改班级信息"
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
        <AtMessage />
        <AtModal
          isOpened={this.state.isDissolveOpen}
          content="确认要解散班级吗？"
          cancelText="取消"
          confirmText="退出"
          onCancel={() => this.setState({...this.state, isDissolveOpen: false})}
          onConfirm={this.handleDissolve}
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
        <AtFloatLayout
          title="修改班级信息"
          isOpened={this.state.showUpdateInfo}
          onClose={() => this.setState({showUpdateInfo: false})}
        >
          <View className="update-classinfo">
            <AtForm>
              <AtInput
                type="text"
                title="班级名字"
                value={this.state.updateInfo.className}
                onChange={className => this.setState({updateInfo: {...this.state.updateInfo, className}})}
                placeholder="请填写班级名字"
              />
              <AtInput
                type="text"
                title="班级详情"
                value={this.state.updateInfo.detail}
                onChange={detail => this.setState({updateInfo: {...this.state.updateInfo, detail}})}
                placeholder="请填写学期/班级详情"
              />
            </AtForm>
            <AtButton
              className="update-button"
              type="primary"
              disabled={this.state.updateInfo.className === ''}
              onClick={this.handleClickUpdateButton}
            >
              修 改
            </AtButton>
          </View>
        </AtFloatLayout>
      </View>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  dissolveClass(data) {
    return dispatch(dissolveClass(data))
  },
  updateClassInfo(data) {
    return dispatch(updateClassInfo(data))
  }
})

export default connect(
  () => ({}),
  mapDispatchToProps
)(ClassInfoTeacher)