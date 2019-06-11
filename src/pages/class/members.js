import Taro, { Component } from "@tarojs/taro"
import { Empty } from '@/components/empty'
import { handleResponse } from "@/utils"
import { URLS } from "@/constants/urls"
import { AtAccordion, AtList, AtListItem } from "taro-ui"
import "./members.less"

export class Members extends Component {
  config = {
    navigationBarTitleText: "班级成员"
  }

  constructor(props) {
    super(props)
    this.state = {
      classes: []
    }
  }

  async componentWillMount() {
    try {
      const classId = this.$router.params.classId
      const res = await Taro.request({
        url: URLS.GET_CLASS_MEMBER,
        method: "GET",
        data: {
          classId
        },
        header: {
          token: Taro.getStorageSync("token")
        }
      })
      await handleResponse(res)
      const classes =
      res.data.data.classes
      .map(e => ({...e, open: false}))
      this.setState({
        ...this.state,
        classes
      })
    } catch (err) {
      console.log(err)
    }
  }

  handleClick = (value, index) => {
    const classes = this.state.classes
    classes[index]['open'] = value
    this.setState({
      ...this.state,
      classes
    })
  }

  render() {
    return (
      <View className="members">
        <View className="title">班级成员</View>
        {
          this.state.classes.length === 0 && <Empty />
        }
        {this.state.classes.map((e, i) => {
          const {
            name,
            workId,
            department,
            phone,
            email,
            sex,
            open
          } = e
          return (
            <AtAccordion
              title={name}
              key={workId}
              open={open}
              onClick={value => this.handleClick(value, i)}
            >
              <AtList>
                <AtListItem title={`学号：${workId}`} />
                <AtListItem title={`专业：${department}`} />
                <AtListItem title="学校：重庆邮电大学" />
                <AtListItem title={`手机：${phone}`} />
                <AtListItem title={`邮箱：${email}`} />
                <AtListItem title={`性别：${sex === 1 ? '男' : '女'}`} />
              </AtList>
            </AtAccordion>
          )
        })}
      </View>
    )
  }
}
