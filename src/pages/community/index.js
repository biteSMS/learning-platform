import Taro, { Component } from "@tarojs/taro"
import { AtFab, AtAvatar, AtMessage } from "taro-ui"
import { connect } from "@tarojs/redux"
import { getDate } from "@/utils"
import { getTopics } from "@/actions/community"
import "./index.less"

class Index extends Component {
  config = {
    navigationBarTitleText: "社区",
    enablePullDownRefresh: true
  }

  constructor(props) {
    super(props)
    this.state = {}
  }

  async onPullDownRefresh() {
    await this.props.getTopics()
    Taro.stopPullDownRefresh()
    Taro.atMessage({
      message: '更新成功',
      type: 'success'
    })
  }

  componentWillMount() {
    this.props.getTopics()
  }

  handleClickButton = () => {
    Taro.navigateTo({url: '/pages/community/post'})
  }

  handleClickTopic = topicId => {
    Taro.navigateTo({url: `/pages/community/topic?topicId=${topicId}`})
  }

  render() {
    return (
      <View className="community">
        <AtMessage />
        {this.props.topics.map(topic => (
          <View className="topic-card" key={topic.topicId} onClick={() => this.handleClickTopic(topic.topicId)}>
            <View className="info">
              <AtAvatar image={topic.headUrl} circle size="small" />
              <View className="name">{topic.nickName}</View>
              <View className="school">{topic.school}</View>
            </View>
            <View className="title">{topic.title}</View>
            <View className="content">{topic.content}</View>
            <View className="date">{getDate(topic.publishTime)}</View>
          </View>
        ))}
        <View className="fab-button" onClick={this.handleClickButton}>
          <AtFab>
            <Text className="at-fab__icon at-icon at-icon-add" />
          </AtFab>
        </View>
      </View>
    )
  }
}

const mapStateToProps = ({ community }) => ({
  topics: community.topics
})

const mapDispatchToProps = dispatch => ({
  getTopics() {
    return dispatch(getTopics())
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Index)
