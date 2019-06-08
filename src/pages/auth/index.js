import Taro from '@tarojs/taro'
import { addUserInfo } from '@/actions/user'
import { connect } from "@tarojs/redux"
import './index.less'

const Auth = ({ addUserInfo }) => {

  function onGetUserInfo(e) {
    const { detail } = e
    const { userInfo } = detail
    
    if (!userInfo) {
      return Taro.showToast({
        title: '请同意授权进入汇学',
        icon: 'none',
        duration: 2000
      })
    }

    const {
      avatarUrl,
      gender,
      nickName
    } = userInfo

    addUserInfo({
      headUrl: avatarUrl,
      sex: gender,
      nickName
    })
    Taro.redirectTo({url: '/pages/auth/login'})
  }
  
  return (
    <View className="auth">
      <View className="logo">
        <Image src={require('../../assets/logo.png')} />
      </View>
      <View className="name">汇 学</View>
      <Button
        className="button"
        type="primary"
        openType='getUserInfo'
        onGetUserInfo={onGetUserInfo}
      >授 权</Button>
    </View>
  )
}

const mapDispatchToProps = dispatch => ({
  addUserInfo(data) {
    dispatch(addUserInfo(data))
  }
})

export default connect(() => ({}), mapDispatchToProps)(Auth)