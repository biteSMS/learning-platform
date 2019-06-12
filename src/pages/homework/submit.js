import Taro, { Component } from "@tarojs/taro"
import { AtTextarea, AtForm, AtImagePicker, AtListItem, AtButton } from "taro-ui"
import "./submit.less"

export default class Submit extends Component {
  config = {
    navigationBarTitleText: "提交作业"
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
      <View className="homework-submit">
        <AtForm>
          <AtTextarea maxLength={100} placeholder="作业描述..." height={300} />
          <AtImagePicker
            files={files}
          />
        </AtForm>
        <AtButton
          className="submit-button"
          type="primary"
        >提 交</AtButton>
      </View>
    )
  }
}