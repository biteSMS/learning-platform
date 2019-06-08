import Taro, { useEffect } from '@tarojs/taro'
import { AtTag } from 'taro-ui'
import './about.less'

export const About = () => {
  useEffect(() => {
    Taro.setNavigationBarTitle({title: '关于'})
  }, [])

  return (
    <View className="about">
      <View className="banner">
        <Image src={require('../../assets/logo.png')} />
      </View>
      <View className="version">
        汇学
        <View style={{marginLeft: '10px'}}></View>
        <AtTag
          active
          size="small"
        >v1.0.0</AtTag>
      </View>
    </View>
  )
}