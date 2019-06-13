import Taro, { Component } from "@tarojs/taro"
import { handleResponse } from "@/utils"
import { URLS } from "@/constants/urls"
import { AtTextarea, AtForm, AtImagePicker, AtButton } from "taro-ui"
import "./submit.less"

export default class Submit extends Component {
  config = {
    navigationBarTitleText: "提交作业"
  }

  constructor(props) {
    super(props)
    this.state = {
      data: {
        content: "",
        homeworkId: null,
        fileId: []
      },
      files: []
    }
  }

  componentWillMount() {
    this.setState({
      data: {
        ...this.state.data,
        homeworkId: this.$router.params.homeworkId
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
          name: "file",
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

  handleClickPost = async () => {
    try {
      const res = await Taro.request({
        url: URLS.SUBMIT_HOMEWORK,
        method: "POST",
        data: {
          homeworkId: +this.state.data.homeworkId,
          content: this.state.data.content,
          fileId: this.state.data.fileId
        },
        header: {
          token: Taro.getStorageSync("token")
        }
      })
      await handleResponse(res)
      Taro.navigateBack({
        delta: 2
      })
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    return (
      <View className="homework-submit">
        <AtForm>
          <AtTextarea
            maxLength={100}
            placeholder="作业描述..."
            height={300}
            value={this.state.data.content}
            onChange={this.handleChangeContent}
          />
          <AtImagePicker
            files={this.state.files}
            onChange={this.handleChangeFiles}
            count={3}
          />
        </AtForm>
        <AtButton
          className="submit-button"
          type="primary"
          disabled={
            this.state.data.content === "" && this.state.files.length === 0
          }
          onClick={this.handleClickPost}
        >
          提 交
        </AtButton>
      </View>
    )
  }
}
