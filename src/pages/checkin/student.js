import { AtInput, AtButton, AtForm } from "taro-ui"
import "./student.less"

export const Student = () => {
  return (
    <View className="check-in-student">
      <AtForm>
        <AtInput
          title="签到码"
          type="text"
          maxLength="6"
          placeholder="请输入签到码"
        >
          <View
            className="check-in-button"
            onClick={() => console.log(123)}
          >签到</View>
        </AtInput>
      </AtForm>
      <AtButton
        className="record"
        type="primary"
      >查看考勤记录</AtButton>
    </View>
  )
}
