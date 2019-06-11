import { useState, useEffect } from "@tarojs/taro"
import { Empty } from "@/components/empty"
import { getClassList, getTeacherClassList, joinClass, createClass } from "@/actions/class"
import { connect } from "@tarojs/redux"
import {
  AtTabs,
  AtTabsPane,
  AtCard,
  AtFab,
  AtFloatLayout,
  AtInput,
  AtForm,
  AtButton,
  AtMessage
} from "taro-ui"
import { Picker } from "@tarojs/components"
import "./index.less"

const Class = ({
  classes,
  teacherClasses,
  getClassList,
  getTeacherClassList,
  joinClass,
  createClass
}) => {

  useEffect(() => {
    getClassList()
    getTeacherClassList()
  }, [])

  const [currentTab, setCurrentTab] = useState(0)
  const [floatLayout, setFloatLayout] = useState({
    isOpened: false,
    title: "加入班级"
  })
  const [code, setCode] = useState("")
  const [createInfo, setCreateInfo] = useState({
    className: "",
    detail: ""
  })
  const tabList = [{ title: "我听的课" }, { title: "我教的课" }]

  function onChange(e) {
    const value = e.detail.value
    if (value === "0") {
      setFloatLayout({
        title: "加入班级",
        isOpened: true
      })
    } else if (value === "1") {
      setFloatLayout({
        title: "创建班级",
        isOpened: true
      })
    }
  }

  function onClose() {
    setFloatLayout({
      ...setFloatLayout,
      isOpened: false
    })
  }

  return (
    <View className="class">
      <AtMessage />
      <AtTabs
        tabList={tabList}
        current={currentTab}
        onClick={index => setCurrentTab(index)}
      >
        <AtTabsPane current={currentTab} index={0}>
          <View className="container">
            {classes.length === 0 && <Empty />}
            {classes.map(c => (
              <AtCard
                key={c.classId}
                className="class-card"
                title={c.className}
                extra="···"
                note={c.teacherName}
                onClick={() => Taro.navigateTo({url: `/pages/class/classinfostudent?classId=${c.classId}`})}
              >
                {c.detail}
              </AtCard>
            ))}
          </View>
        </AtTabsPane>
        <AtTabsPane current={currentTab} index={1}>
          <View className="container">
            {teacherClasses.length === 0 && <Empty />}
            {teacherClasses.map(c => (
              <AtCard
                key={c.classId}
                className="class-card create-card"
                title={c.className}
                extra="···"
                note={c.teacherName}
                onClick={() => Taro.navigateTo({url: `/pages/class/classinfoteacher?classId=${c.classId}`})}
              >
                {c.detail}
              </AtCard>
            ))}
          </View>
        </AtTabsPane>
      </AtTabs>
      <Picker
        mode="selector"
        range={["加入班级", "创建班级"]}
        onChange={onChange}
      >
        <View className="fab-button">
          <AtFab>
            <Text className="at-fab__icon at-icon at-icon-add" />
          </AtFab>
        </View>
      </Picker>
      <AtFloatLayout
        isOpened={floatLayout.isOpened}
        title={floatLayout.title}
        onClose={onClose}
      >
        {floatLayout.title === "加入班级" && (
          <View className="joinclass">
            <AtInput
              type="text"
              title="班级码"
              placeholder="请输入班级码"
              value={code}
              onChange={setCode}
            />
            <AtButton
              className="join-button"
              type="primary"
              onClick={() => {
                joinClass({classCode: code})
                setFloatLayout({
                  ...floatLayout,
                  isOpened: false
                })
              }}
              disabled={!code}
            >
              加 入
            </AtButton>
          </View>
        )}
        {floatLayout.title === "创建班级" && (
          <View className="joinclass">
            <AtForm>
              <AtInput
                type="text"
                title="班级名字"
                placeholder="请填写班级名字"
                value={createInfo.className}
                onChange={className =>
                  setCreateInfo({ ...createInfo, className })
                }
              />
              <AtInput
                type="text"
                title="班级详情"
                placeholder="请填写学期/班级详情"
                value={createInfo.detail}
                onChange={detail => setCreateInfo({ ...createInfo, detail })}
              />
            </AtForm>
            <AtButton
              className="join-button"
              type="primary"
              onClick={() => {
                createClass(createInfo)
                setFloatLayout({
                  ...floatLayout,
                  isOpened: false
                })
              }}
              disabled={!createInfo.className}
            >
              创 建
            </AtButton>
          </View>
        )}
      </AtFloatLayout>
    </View>
  )
}
const mapStateToProps = ({ userClass }) => ({
  classes: userClass.classes.reverse(),
  teacherClasses: userClass.teacherClasses.reverse()
})

const mapDispatchToProps = dispatch => ({
  getClassList() {
    dispatch(getClassList())
  },
  getTeacherClassList() {
    dispatch(getTeacherClassList())
  },
  joinClass(data) {
    dispatch(joinClass(data))
  },
  createClass(data) {
    dispatch(createClass(data))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Class)
