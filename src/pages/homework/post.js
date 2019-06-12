import Taro, { Component } from "@tarojs/taro"
import { AtTextarea, AtInput, AtForm, AtImagePicker, AtListItem, AtButton } from "taro-ui"
import "./post.less"

export default class Post extends Component {
  config = {
    navigationBarTitleText: "发布作业"
  }

  render() {
    const files = [
      {
        url: "https://storage.360buyimg.com/mtd/home/111543234387022.jpg"
      },
      {
        url: "https://storage.360buyimg.com/mtd/home/221543234387016.jpg"
      },
      {
        url: "https://storage.360buyimg.com/mtd/home/331543234387025.jpg"
      }
    ]
    return (
      <View className="homework-post">
        <AtForm>
          <AtInput title="作业标题" />
          <AtTextarea maxLength={100} placeholder="作业描述..." height={300} />
          <AtImagePicker
            files={files}
          />
          <AtListItem
            title="作业时长"
            extraText="3天0小时"
          />
        </AtForm>
        <AtButton
          className="post-button"
          type="primary"
        >发 布</AtButton>
      </View>
    )
  }
}
