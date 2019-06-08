import Taro, {useState} from '@tarojs/taro'
import { fetchUserInfo } from '@/actions/user'
import { connect } from "@tarojs/redux"
import './index.less'

const Auth = ({
  fetchUserInfo
}) => {
  const [loading, setLoading] = useState(false)

  async function onGetUserInfo(e) {
    setLoading(true)
    const { detail } = e
    const { userInfo } = detail
    if (!userInfo) {
      return Taro.showToast({
        title: '请同意授权进入汇学',
        icon: 'none',
        duration: 2000
      })
    }
    const { avatarUrl, gender, nickName } = userInfo
    const data = {
      headUrl: avatarUrl,
      sex: gender,
      nickName
    }
    fetchUserInfo(data)
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
        loading={loading}
        onGetUserInfo={onGetUserInfo}
      >进 入</Button>
    </View>
  )
}

const mapDispatchToProps = dispatch => ({
  fetchUserInfo(data) {
    dispatch(fetchUserInfo(data))
  }
})

export default connect(() => ({}), mapDispatchToProps)(Auth)