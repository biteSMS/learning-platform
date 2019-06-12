import { AtList, AtListItem } from "taro-ui"
import './student.less'

export const Student = () => {

  return (
    <View className="homework-student">
      <View className="title">
        作业发布记录
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
      <View className="title" style={{marginTop: '30px'}}>
        作业提交记录
      </View>
      <AtList>
        <AtListItem
          title="第一次作业"
          arrow="right"
          note="第二章作业课后习题"
        />
      </AtList>
    </View>
  )
}