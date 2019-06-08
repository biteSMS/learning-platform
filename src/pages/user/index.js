import Taro, { useEffect } from '@tarojs/taro'
import {
  AtAvatar,
  AtList,
  AtListItem
} from 'taro-ui'
import './index.less'

export const User = () => {
  useEffect(() => {
    Taro.setNavigationBarTitle({title: '我的'})
  }, [])

  return (
    <View className="user">
      <View className="information flex-align">
        <AtAvatar image='http://storage.360buyimg.com/mtd/home/32443566_635798770100444_2113947400891531264_n1533825816008.jpg'></AtAvatar>
        <View className="person">
          <View className="name">哈哈哈</View>
          <View className="id">2017211657</View>
        </View>
        <View className="modify flex-align">
          详细个人信息
        </View>
      </View>
      <View className="detailed">
        <View className="at-row">
          <View className='at-col'>昵称：bibi</View>
          <View className='at-col'>专业：信息安全</View>
        </View>
        <View className="at-row">
          <View className='at-col'>电话：1500000000</View>
          <View className='at-col'>学校：重庆邮电大学</View>
        </View>
        <View className="at-row">
          <View className='at-col'>性别：男</View>
          <View className='at-col'>邮箱：333333333@qq.com</View>
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