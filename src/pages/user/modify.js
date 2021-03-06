import Taro, { useState, useEffect } from '@tarojs/taro'
import { postUserInfo } from '@/actions/user'
import { getClassList, getTeacherClassList } from '@/actions/class'
import { connect } from "@tarojs/redux"
import {
  AtInput,
  AtForm,
  AtButton,
  AtMessage
} from 'taro-ui'
import './modify.less'

const Modify = ({ userInfo, postUserInfo, getClassList, getTeacherClassList }) => {
  useEffect(() => {
    Taro.setNavigationBarTitle({title: '修改个人信息'})
  }, [])
  const {
    username,
    workId,
    school,
    departmentName,
    phone,
    email
  } = userInfo

  const initialState = {
    username,
    workId,
    school,
    departmentName,
    phone,
    email
  }
  const [info, setInfo] = useState(initialState)

  function handleChange(key, value) {
    setInfo(({
      ...info,
      [key]: value
    }))
    return value
  }

  async function handleSubmit() {
    try {
      await postUserInfo(info)
      getClassList()
      getTeacherClassList()
      Taro.atMessage({
        message: "修改成功",
        type: "success"
      })
    } catch (err) {
      console.log(err)
      if (err === 2) {
        Taro.atMessage({
          message: '手机号或者邮箱格式错误',
          type: 'error'
        })
      }
    }
  }

  const isFilledUp = !Object.values(info).includes('')

  return (
    <View className="modify">
      <AtMessage />
      <AtForm>
        <AtInput
          name="username"
          title="姓名"
          placeholder='真实姓名'
          value={info.username}
          onChange={value => handleChange('username', value)}
        />
        <AtInput
          name="workId"
          title="学号/工号"
          type='number'
          placeholder='学号/老师工号'
          value={info.workId}
          onChange={value => handleChange('workId', value)}
        />
        <AtInput
          name="school"
          title="学校"
          placeholder='所在学校'
          value={info.school}
          onChange={value => handleChange('school', value)}
        />
        <AtInput
          name="departmentName"
          title="专业"
          placeholder='专业名字'
          value={info.departmentName}
          onChange={value => handleChange('departmentName', value)}
        />
        <AtInput
          name="phone"
          title="手机号码"
          type="phone"
          placeholder='手机号码'
          value={info.phone}
          onChange={value => handleChange('phone', value)}
        />
        <AtInput
          name="email"
          title="邮箱"
          placeholder='邮箱地址'
          value={info.email}
          onChange={value => handleChange('email', value)}
        />
      </AtForm>
      <AtButton
        className="modify-button"
        type="primary"
        onClick={handleSubmit}
        disabled={!isFilledUp}
      >修改</AtButton>
    </View>
  )
}

const mapStateToProps = ({ user }) => ({
  userInfo: user.userInfo
})

const mapDispatchToProps = dispatch => ({
  postUserInfo(data) {
    return dispatch(postUserInfo(data))
  },
  getClassList() {
    return dispatch(getClassList())
  },
  getTeacherClassList() {
    return dispatch(getTeacherClassList())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Modify)