import Taro, { Component } from "@tarojs/taro"
import { handleResponse, getDate } from "@/utils"
import { URLS } from "@/constants/urls"
import {
  AtAvatar,
  AtMessage,
  AtFab,
  AtFloatLayout,
  AtTextarea,
  AtButton
} from "taro-ui"
import "./topic.less"

export default class Topic extends Component {
  config = {
    navigationBarTitleText: "话题详情",
    enablePullDownRefresh: true
  }

  constructor(props) {
    super(props)
    this.state = {
      topicId: null,
      topic: {
        nickName: '',
        school: '',
        title: '',
        content: '',
        publishTime: ''
      },
      comments: [],
      showFloat: false,
      content: ''
    }
  }

  async onPullDownRefresh() {
    await this.getTopic()
    Taro.stopPullDownRefresh()
    Taro.atMessage({
      message: "更新成功",
      type: "success"
    })
  }

  componentWillMount() {
    this.setState(
      {
        topicId: this.$router.params.topicId
      },
      () => {
        this.getTopic()
      }
    )
  }

  getTopic = async () => {
    try {
      const res = await Taro.request({
        url: URLS.GET_TOPIC_DETAIL,
        method: "GET",
        data: {
          topicId: this.state.topicId
        },
        header: {
          token: Taro.getStorageSync("token")
        }
      })
      await handleResponse(res)
      console.log(res.data.data.comment)
      this.setState({
        topic: res.data.data.topic,
        comments: res.data.data.comment
      })
    } catch (err) {
      console.log(err)
    }
  }

  handleClickFab = () => {
    this.setState({
      showFloat: true
    })
  }

  handleChangeContent = e => {
    this.setState({
      content: e.detail.value
    })
  }

  handleClickPost = async () => {
    try {
      const res = await Taro.request({
        url: URLS.POST_COMMENT,
        method: "POST",
        data: {
          content: this.state.content,
          topicId: this.state.topicId
        },
        header: {
          token: Taro.getStorageSync("token"),
          'content-type': 'application/x-www-form-urlencoded'
        }
      })
      await handleResponse(res)
      this.getTopic()
      this.setState({
        showFloat: false,
        content: ''
      })
      Taro.atMessage({
        message: '评论成功',
        type: 'success'
      })
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    const topic = this.state.topic
    return (
      <View className="community-topic">
        <AtMessage />
        <View className="topic-card">
          <View className="info">
            <AtAvatar image={topic.headUrl} circle size="small" />
            <View className="name">{topic.nickName}</View>
            <View className="school">{topic.school}</View>
          </View>
          <View className="topic-title">{topic.title}</View>
          <View className="content">{topic.content}</View>
          <View className="date">{getDate(topic.publishTime)}</View>
        </View>
        <View className="title">评论详情</View>
        {this.state.comments.length === 0 && (
          <View className="none">话题暂无评论</View>
        )}
        {this.state.comments.map(comment => (
          <View className="comment-card" key={comment.commentId}>
          <View className="info">
            <AtAvatar image={comment.headUrl} circle size="small" />
            <View className="name">{comment.username}</View>
            <View className="school">{comment.school}</View>
          </View>
          <View className="content">{comment.content}</View>
          <View className="date">{getDate(comment.publishTime)}</View>
        </View>
        ))}
        <View className="fab-button" onClick={this.handleClickFab}>
          <AtFab>
            <Text className="at-fab__icon at-icon at-icon-add" />
          </AtFab>
        </View>
        <AtFloatLayout
          title="评论话题"
          isOpened={this.state.showFloat}
          onClose={() => this.setState({ showFloat: false })}
        >
          <View className="post">
            <AtTextarea
              maxLength={100}
              placeholder="评论内容..."
              height={300}
              value={this.state.content}
              onChange={this.handleChangeContent}
            />
            <AtButton
              className="button"
              type="primary"
              disabled={this.state.content === ''}
              onClick={this.handleClickPost}
            >评 论</AtButton>
          </View>
        </AtFloatLayout>
      </View>
    )
  }
}
