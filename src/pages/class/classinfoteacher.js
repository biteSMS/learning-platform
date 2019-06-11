import { AtGrid } from "taro-ui"
import "./classinfo.less"

export const ClassInfo = () => {
  const gridList = [
    {
      image: require('@/assets/checkin.png'),
      value: "签到"
    },
    {
      image: require('@/assets/homework.png'),
      value: "作业"
    },
    {
      image: require('@/assets/members.png'),
      value: "班级成员"
    },
    {
      image: require('@/assets/qrcode.png'),
      value: "班级二维码"
    },
    {
      image: require('@/assets/kick-out.png'),
      value: "踢出成员"
    },
    {
      image: require('@/assets/update.png'),
      value: "更新班级信息"
    },
    {
      image: require('@/assets/dissolve.png'),
      value: "解散班级"
    }
  ]

  return (
    <View className="classinfo">
      <View className="classinfo-card">
        <View className="classname">数据库原理</View>
        <View className="detail subtitle">课程详情：2018-2019学年</View>
        <View className="teacher subtitle">任课老师：王晓蓉</View>
        <View className="code subtitle">班级码：KRLDI</View>
      </View>
      <View className="grid">
        <AtGrid data={gridList} columnNum="3" />
      </View>
    </View>
  )
}
