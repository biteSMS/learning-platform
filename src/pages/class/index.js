import { useState } from "@tarojs/taro"
import { AtTabs, AtTabsPane, AtButton, AtCard, AtFab } from "taro-ui"
import "./index.less"

const Class = () => {
  const [currentTab, setCurrentTab] = useState(0)
  const tabList = [{ title: "我听的课" }, { title: "我教的课" }]

  return (
    <View className="class">
      <AtTabs
        tabList={tabList}
        current={currentTab}
        onClick={index => setCurrentTab(index)}
      >
        <AtTabsPane current={currentTab} index={0}>
          <View>
            <AtCard
              className="class-card"
              title="计算机网络"
              extra="···"
              note="许老师"
            >
              课程描述
            </AtCard>
            <AtCard
              className="class-card"
              title="数学建模"
              extra="···"
              note="老师"
            >
              课程描述
            </AtCard>
            <AtCard
              className="class-card"
              title="数学建模"
              extra="···"
              note="老师"
            >
              课程描述
            </AtCard>
            <AtCard
              className="class-card"
              title="数学建模"
              extra="···"
              note="老师"
            >
              课程描述
            </AtCard>
          </View>
        </AtTabsPane>
        <AtTabsPane current={currentTab} index={1}>
          <View>我的班级</View>
        </AtTabsPane>
      </AtTabs>
      <View className="join-button">
        <AtFab>
          <Text className="at-fab__icon at-icon at-icon-add" />
        </AtFab>
      </View>
    </View>
  )
}
