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
        fileId: []
      },
      files: []
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

  handleChangeFiles = async (files, type, index) => {
    try {
      if (type === "remove") {
        let temp = this.state.files
        temp.splice(index, 1)
        this.setState({
          files: temp,
          data: {
            ...this.state.data,
            fileId: temp.map(e => e.fileId)
          }
        })
      }
      if (type === "add") {
        const res = await Taro.uploadFile({
          url: URLS.UPLOAD_FILE,
          filePath: files[files.length - 1].url,
          name: 'file',
          header: {
            token: Taro.getStorageSync("token")
          }
        })
        const file = JSON.parse(res.data).data
        this.setState({
          files: this.state.files.concat(file),
          data: {
            ...this.state.data,
            fileId: this.state.data.fileId.concat(file.fileId)
          }
        })
      }
    } catch (err) {
      console.log(err)
    }
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
      const res = await Taro.request({
        url: URLS.POST_HOMEWORK,
        method: "POST",
        data: {
          classId: parseInt(this.state.data.classId),
          title: this.state.data.title,
          deadline: this.state.data.deadLine[0]*24*3600+this.state.data.deadLine[1]*3600,
          content: this.state.data.content,
          fileId: this.state.data.fileId
        },
        header: {
          token: Taro.getStorageSync("token")
        }
      })
      await handleResponse(res)
      Taro.showToast({
        title: '发布成功',
        icon: 'success',
        duration: 2000
      })
      Taro.navigateBack({
        delta: 1
      })
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
            placeholder="请输入作业标题"
            onChange={this.handleChangeTitle}
          />
          <AtTextarea
            maxLength={100}
            placeholder="作业描述..."
            value={this.state.data.content}
            height={300}
            onChange={this.handleChangeContent}
          />
          <AtImagePicker
            files={this.state.files}
            onChange={this.handleChangeFiles}
            count={3}
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
          disabled={this.state.data.title === ''}
        >发 布</AtButton>
      </View>
    )
  }
}
