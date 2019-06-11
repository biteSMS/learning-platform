import Taro, { useState, useEffect } from '@tarojs/taro'
import { postUserInfo } from '@/actions/user'
import { connect } from "@tarojs/redux"
import {
  AtInput,
  AtForm,
  AtButton
} from 'taro-ui'
import './fillin.less'

const Fillin = ({ postUserInfo }) => {
  useEffect(() => {
    Taro.setNavigationBarTitle({title: '填写个人信息'})
  }, [])

  const initialState = {
    username: '',
    workId: '',
    school: '',
    departmentName: '',
    phone: '',
    email: ''
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
      Taro.switchTab({ url: "/pages/class/index" })
    } catch (err) {
      console.log(err)
    }
  }

  const isFilledUp = !Object.values(info).includes('')

  return (
    <View className="fillin">
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
        className="fillin-button"
        type="primary"
        onClick={handleSubmit}
        disabled={!isFilledUp}
      >完成</AtButton>
    </View>
  )
}

const mapDispatchToProps = dispatch => ({
  postUserInfo(data) {
    return dispatch(postUserInfo(data))
  }
})

export default connect(() => ({}), mapDispatchToProps)(Fillin)