import Taro, { useEffect } from '@tarojs/taro'
import { login } from '@/api'
import { connect } from "@tarojs/redux"

const Login = ({ userInfo }) => {
  useEffect(async () => {
    const { token, type, user } = await login(userInfo)
    const { username } = user
    await Taro.setStorage({ key: 'token', data: token })
    if (!username) {
      console.log('no username')
      Taro.redirectTo({url: '/pages/auth/fillin'})
    } else {
      
    }
  }, [])

  return (
    <View>login</View>
  )
}

export default connect(({ user }) => ({ userInfo: user.userInfo }))(Login)