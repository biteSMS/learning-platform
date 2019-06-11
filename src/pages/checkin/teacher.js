import { AtButton, AtList, AtListItem } from "taro-ui"
import "./teacher.less"

export const Teacher = () => {
  return (
    <View className="check-in-teacher">
      <AtButton className="post-button" type="primary">
        发布签到
      </AtButton>
      <View className="title">
        签到发布记录 (点击查看详细)
      </View>
      <AtList>
        <AtListItem
          title="2019年6月11日 星期二"
          arrow="right"
          note="出勤: 28 缺勤: 2 迟到: 0 请假: 1"
        />
        <AtListItem
          title="2019年6月9日 星期日"
          arrow="right"
          note="出勤: 30 缺勤: 0 迟到: 1 请假: 0"
        />
      </AtList>
    </View>
  )
}
