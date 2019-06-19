import Taro, { Component } from "@tarojs/taro"
import { AtMessage } from "taro-ui"
import { connect } from "@tarojs/redux"
import { getDate } from "@/utils"
import { Empty } from "@/components/empty"
import { getNotification } from "@/actions/notification"
import "./index.less"

class Notification extends Component {
  config = {
    navigationBarTitleText: "通知",
    enablePullDownRefresh: true
  }

  constructor(props) {
    super(props)
    this.state = {}
  }

  async onPullDownRefresh() {
    await this.props.getNotification()
    Taro.stopPullDownRefresh()
    Taro.atMessage({
      message: '更新成功',
      type: 'success'
    })
  }

  async componentWillMount() {
    this.props.getNotification()
  }

  render() {
    return (
      <View className="notification">
        <AtMessage />
        {this.props.messages.length === 0 && <Empty />}
        {this.props.messages.map(e => (
          <View className="message-card" key={e.date}>
            <Image className="icon" src={require("@/assets/message.png")} />
            <View className="right">
              <View className="title">{e.title}</View>
              <View className="content">内容：{e.content}</View>
              <View className="date">{getDate(e.date)}</View>
            </View>
          </View>
        ))}
      </View>
    )
  }
}

const mapStateToProps = ({ notification }) => ({
  messages: notification.messages
})

const mapDispatchToProps = dispatch => ({
  getNotification() {
    return dispatch(getNotification())
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Notification)
