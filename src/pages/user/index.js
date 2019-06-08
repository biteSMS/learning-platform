import Taro, { useEffect } from '@tarojs/taro'
import { connect } from "@tarojs/redux"
import {
  AtAvatar,
  AtList,
  AtListItem
} from 'taro-ui'
import './index.less'

const User = ({ userInfo }) => {
  useEffect(() => {
    Taro.setNavigationBarTitle({title: '我的'})
  }, [])

  const {
    username,
    workId,
    school,
    departmentName,
    phone,
    email,
    name,
    sex,
    headUrl
  } = userInfo

  return (
    <View className="user">
      <View className="information flex-align">
        <AtAvatar image={headUrl}></AtAvatar>
        <View className="person">
          <View className="name">{username}</View>
          <View className="id">{workId}</View>
        </View>
        <View className="modify flex-align">
          详细个人信息
        </View>
      </View>
      <View className="detailed">
        <View className="at-row">
          <View className='at-col'>昵称：{name}</View>
          <View className='at-col'>专业：{departmentName}</View>
        </View>
        <View className="at-row">
          <View className='at-col'>电话：{phone}</View>
          <View className='at-col'>学校：{school}</View>
        </View>
        <View className="at-row">
          <View className='at-col'>性别：{sex === 1 ? '男' : '女'}</View>
          <View className='at-col'>邮箱：{email}</View>
        </View>
      </View>
      <AtList>
        <AtListItem
          title="修改个人信息"
          arrow="right"
          iconInfo={{ size: 22, color: '#1296db', value: 'edit'}}
          onClick={() => Taro.navigateTo({url: '/pages/user/modify'})}
        />
      </AtList>
      <AtList className="button-list">
        <AtListItem
          title="申请成为老师"
          arrow="right"
          iconInfo={{ size: 22, color: '#83c6c2', value: 'user'}}
        />
        <AtListItem
          title="关于"
          arrow="right"
          iconInfo={{ size: 22, color: '#e89abe', value: 'alert-circle'}}
          onClick={() => Taro.navigateTo({url: '/pages/user/about'})}
        />
      </AtList>
    </View>
  )
}

const mapStateToProps = ({ user }) => ({
  userInfo: user.userInfo
})

export default connect(mapStateToProps)(User)