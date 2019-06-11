import { AtButton, AtMessage } from 'taro-ui'
import { applyTeacher } from '@/actions/user'
import { connect } from "@tarojs/redux"
import './apply.less'

const Apply = ({ type, applyTeacher }) => {

  return (
    <View className="apply">
      <AtMessage />
      <AtButton
        className="apply-button"
        type="primary"
        disabled={type === 1}
        onClick={applyTeacher}
      >
        申 请
      </AtButton>
      {
        type === 1 &&
        <View style={{color: '#999', fontSize: '15px', marginTop: '10px', marginLeft: '35px'}}>你已经是老师了！</View>
      }
    </View>
  )
}

const mapStateToProps = ({ user }) => ({
  type: user.userInfo.type
})

const mapDispatchToProps = dispatch => ({
  applyTeacher(data) {
    dispatch(applyTeacher(data))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Apply)