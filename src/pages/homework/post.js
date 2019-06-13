import Taro, { Component } from "@tarojs/taro"
import { handleResponse } from "@/utils"
import { URLS } from "@/constants/urls"
import { AtTextarea, AtInput, AtForm, AtImagePicker, AtListItem, AtButton } from "taro-ui"
import { Picker } from "@tarojs/components"
import "./post.less"

export default class Post extends Component {
  config = {
    navigationBarTitleText: "发布作业"
  }

  constructor(props) {
    super(props)
    this.state = {
      data: {
        title: '',
        content: '',
        classId: null,
        deadLine: [0, 0],
        files: []
      }
    }
  }

  componentWillMount() {
    this.setState({
      data: {
        ...this.state.data,
        classId: this.$router.params.classId
      }
    })
  }

  handleChangeTitle = value => {
    this.setState({
      data: {
        ...this.state.data,
        title: value
      }
    })
  }

  handleChangeContent = e => {
    this.setState({
      data: {
        ...this.state.data,
        content: e.detail.value
      }
    })
  }

  handleChangeFiles = files => {
    console.log(files)
    this.setState({
      data: {
        ...this.state.data,
        files
      }
    })
  }

  handleChangeDeadline = e => {
    this.setState({
      data: {
        ...this.state.data,
        deadLine: e.detail.value
      }
    })
  }

  handleClickPost = async () => {
    try {
      console.log(this.state.data)
      // const res = await Taro.request({
      //   url: URLS.POST_HOMEWORK,
      //   method: "POST",
      //   data: {
      //     classId: this.state.classId,
      //     title: 'title',
      //     deadLine: 3600,
      //     content: 'content',
      //     files: this.state.data.files[0].url
      //   },
      //   header: {
      //     token: Taro.getStorageSync("token")
      //   }
      // })
      // console.log(res)
      // await handleResponse(res)
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    const hour = [...new Array(24)].map((e, i) => i)
    const day = [...new Array(31)].map((e, i) => i)
    const range = [day, hour]
    return (
      <View className="homework-post">
        <AtForm>
          <AtInput
            title="作业标题"
            onChange={this.handleChangeTitle}
          />
          <AtTextarea
            maxLength={100}
            placeholder="作业描述..."
            height={300}
            onChange={this.handleChangeContent}
          />
          <AtImagePicker
            files={this.state.data.files}
            onChange={this.handleChangeFiles}
          />
          <Picker
            mode="multiSelector"
            range={range}
            onChange={this.handleChangeDeadline}
          >
            <AtListItem
              title="作业时长"
              extraText={`${this.state.data.deadLine[0]}天${this.state.data.deadLine[1]}小时`}
            />
          </Picker>
        </AtForm>
        <AtButton
          className="post-button"
          type="primary"
          onClick={this.handleClickPost}
        >发 布</AtButton>
      </View>
    )
  }
}
