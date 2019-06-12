import { AtFab, AtAvatar } from "taro-ui"
import "./index.less"

export const Index = () => {
  return (
    <View className="community">
      <View className="topic-card">
        <View className="info">
          <AtAvatar
            image="http://storage.360buyimg.com/mtd/home/32443566_635798770100444_2113947400891531264_n1533825816008.jpg"
            circle
            size="small"
          />
          <View className="name">bibi</View>
          <View className="school">重庆邮电大学</View>
        </View>
        <View className="title">问一下学长们该怎么准备考研呢？</View>
        <View className="content">
          什么时候准备？该准备什么呢？希望学长学姐们能解答一下，谢谢。
        </View>
        <View className="date">2019年6月12日 15:30:21</View>
      </View>
      <View className="topic-card">
        <View className="info">
          <AtAvatar
            image="http://storage.360buyimg.com/mtd/home/32443566_635798770100444_2113947400891531264_n1533825816008.jpg"
            circle
            size="small"
          />
          <View className="name">Levi</View>
          <View className="school">重庆大学</View>
        </View>
        <View className="title">大家分享一下你们学校的趣事吧。</View>
        <View className="content">
          如题。
        </View>
        <View className="date">2019年6月12日 12:10:45</View>
      </View>
      <View className="fab-button" onClick={this.handleClick}>
        <AtFab>
          <Text className="at-fab__icon at-icon at-icon-add" />
        </AtFab>
      </View>
    </View>
  )
}

Index.config = {
  navigationBarTitleText: "社区"
}