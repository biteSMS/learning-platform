import { AtButton, AtList, AtListItem } from "taro-ui"
import './teacher.less'

export const Teacher = () => {

  return (
    <View className="homework-teacher">
      <AtButton className="post-button" type="primary">
        发布作业
      </AtButton>
      <View className="title">
        作业发布记录 (点击查看详细)
      </View>
      <AtList>
        <AtListItem
          title="第二次作业"
          arrow="right"
          note="第四章作业课后习题"
        />
        <AtListItem
          title="第一次作业"
          arrow="right"
          note="第二章作业课后习题"
        />
      </AtList>
    </View>
  )
}