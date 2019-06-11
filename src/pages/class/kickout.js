import Taro, { Component } from "@tarojs/taro"
import { Empty } from "@/components/empty"
import { AtCheckbox, AtFab, AtMessage, AtModal } from "taro-ui"
import { handleResponse } from "@/utils"
import { URLS } from "@/constants/urls"
import "./kickout.less"

export default class KickOut extends Component {
  config = {
    navigationBarTitleText: "踢出成员"
  }

  constructor(props) {
    super(props)
    this.state = {
      classId: null,
      checkboxOption: [],
      checkedList: [],
      isOpened: false
    }
  }

  componentWillMount() {
    this.setState(
      {
        classId: this.$router.params.classId
      },
      () => this.getMembers()
    )
  }

  getMembers = async () => {
    try {
      const classId = this.state.classId
      const res = await Taro.request({
        url: URLS.GET_CLASS_MEMBER,
        method: "GET",
        data: {
          classId
        },
        header: {
          token: Taro.getStorageSync("token")
        }
      })
      await handleResponse(res)
      const classes = res.data.data.classes
      const checkboxOption = classes.map(e => ({
        value: e.id,
        label: e.name,
        desc: e.workId
      }))
      this.setState({
        checkboxOption
      })
      console.log(checkboxOption)
    } catch (err) {
      console.log(err)
    }
  }

  postKickOut = async () => {
    const classId = this.state.classId
    const checkedList = this.state.checkedList
    const res = await Taro.request({
      url: URLS.KICK_OUT_STUDENT,
      method: "POST",
      data: {
        classId,
        uid: checkedList
      },
      header: {
        token: Taro.getStorageSync("token")
      }
    })
    await handleResponse(res)
  }

  handleChange = value => {
    this.setState({
      checkedList: value
    })
  }

  handleClick = () => {
    if (this.state.checkedList.length === 0) {
      Taro.atMessage({
        message: "未选择踢出的学生",
        type: "error"
      })
    } else {
      this.setState({ isOpened: true })
    }
  }

  handleConfirm = async () => {
    try {
      await this.postKickOut()
      await this.getMembers()
      this.setState({
        isOpened: false
      })
      Taro.atMessage({
        message: "踢出成功！",
        type: "success"
      })
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    return (
      <View className="kickout">
        <AtMessage />
        <View className="title">
          踢出成员 ({this.state.checkboxOption.length}人)
        </View>
        {this.state.checkboxOption.length === 0 && <Empty />}
        {this.state.checkboxOption.length !== 0 && (
          <AtCheckbox
            options={this.state.checkboxOption}
            selectedList={this.state.checkedList}
            onChange={this.handleChange}
          />
        )}
        <View className="fab-button" onClick={this.handleClick}>
          <AtFab>
            <Text className="at-fab__icon at-icon at-icon-subtract" />
          </AtFab>
        </View>
        <AtModal
          isOpened={this.state.isOpened}
          content={`确定踢出所选的${this.state.checkedList.length}名学生吗？`}
          cancelText="取消"
          confirmText="确定"
          onCancel={() => this.setState({ isOpened: false })}
          onConfirm={this.handleConfirm}
        />
      </View>
    )
  }
}
