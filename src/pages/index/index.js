import Taro, { useEffect } from "@tarojs/taro"
import { View, Button, Text } from "@tarojs/components"
import { connect } from "@tarojs/redux"
import { AtButton } from "taro-ui"
import { add, minus, asyncAdd } from "@/actions/counter"
import "./index.less"

const Index = ({ counter, add, dec, asyncAdd }) => {

  return (
    <View className="index">
      <Button className="add_btn" onClick={add}>
        +
      </Button>
      <Button className="dec_btn" onClick={dec}>
        -
      </Button>
      <Button className="dec_btn" onClick={asyncAdd}>
        async
      </Button>
      <View>
        <Text>{counter.num}</Text>
      </View>
      <View>
        <Text>Hello, World</Text>
      </View>
      <AtButton type="primary">按钮文案</AtButton>
    </View>
  )
}

const mapStateToProps = ({ counter }) => ({
  counter
})
const mapDispatchToProps = dispatch => ({
  add() {
    dispatch(add())
  },
  dec() {
    dispatch(minus())
  },
  asyncAdd() {
    dispatch(asyncAdd())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Index)
