import { useState, useEffect } from "@tarojs/taro"
import { Empty } from "@/components/empty"
import {
  getClassList,
  getTeacherClassList,
  joinClass,
  createClass
} from "@/actions/class"
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
  useEffect(async () => {
    try {
      getClassList()
      getTeacherClassList()
    } catch (err) {
      console.log(err)
    }
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
    setCreateInfo({
      className: "",
      detail: ""
    })
    setCode("")
  }

  async function handleClickJoin() {
    try {
      await joinClass({ classCode: code })
      Taro.atMessage({
        message: "加入成功",
        type: "success"
      })
      setFloatLayout({
        ...floatLayout,
        isOpened: false
      })
      setCode("")
    } catch (err) {
      console.log(err)
      if (err === 0) {
        Taro.atMessage({
          message: "班级不存在",
          type: "error"
        })
      } else if (err === -1) {
        Taro.atMessage({
          message: "你已加入该班级",
          type: "error"
        })
      } else if (err === -5) {
        Taro.atMessage({
          message: "无法加入自己创建的班级",
          type: "error"
        })
      }
    }
  }

  async function handleClickCreate() {
    try {
      await createClass(createInfo)
      Taro.atMessage({
        message: "创建成功",
        type: "success"
      })
      setFloatLayout({
        ...floatLayout,
        isOpened: false
      })
      setCreateInfo({
        className: "",
        detail: ""
      })
    } catch (err) {
      console.log(err)
      if (err === 0) {
        Taro.atMessage({
          message: "创建失败",
          type: "error"
        })
      } else if (err === -3) {
        Taro.atMessage({
          message: "你还不是老师！",
          type: "error"
        })
      }
    }
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
                onClick={() =>
                  Taro.navigateTo({
                    url: `/pages/class/classinfostudent?classId=${c.classId}`
                  })
                }
              >
                {c.detail || "暂无课程详情～"}
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
                onClick={() =>
                  Taro.navigateTo({
                    url: `/pages/class/classinfoteacher?classId=${c.classId}`
                  })
                }
              >
                {c.detail || "暂无课程详情～"}
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
              placeholder="请输入班级码(不区分大小写)"
              value={code}
              onChange={setCode}
            />
            <AtButton
              className="join-button"
              type="primary"
              onClick={handleClickJoin}
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
              onClick={handleClickCreate}
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
    return dispatch(getClassList())
  },
  getTeacherClassList() {
    return dispatch(getTeacherClassList())
  },
  joinClass(data) {
    return dispatch(joinClass(data))
  },
  createClass(data) {
    return dispatch(createClass(data))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Class)
