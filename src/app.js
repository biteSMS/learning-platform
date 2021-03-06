import '@tarojs/async-await'
import Taro, { Component } from '@tarojs/taro'
import { Provider } from '@tarojs/redux'
import Class from '@/pages/class'
import configStore from './store'
import 'taro-ui/dist/style/index.scss'
import './app.less'

const store = configStore()

class App extends Component {

  config = {
    pages: [
      'pages/auth/index',
      'pages/auth/fillin',
      'pages/class/index',
      'pages/class/classinfostudent',
      'pages/class/classinfoteacher',
      'pages/class/members',
      'pages/class/excel',
      'pages/class/kickout',
      'pages/checkin/student',
      'pages/checkin/teacher',
      'pages/checkin/detail',
      'pages/homework/student',
      'pages/homework/teacher',
      'pages/homework/post',
      'pages/homework/submit',
      'pages/homework/hwinfostudent',
      'pages/homework/hwinfoteacher',
      'pages/homework/detailteacher',
      'pages/homework/detailstudent',
      'pages/user/index',
      'pages/user/modify',
      'pages/user/about',
      'pages/user/apply',
      'pages/community/index',
      'pages/community/post',
      'pages/community/topic',
      'pages/notification/index'
    ],
    permission: {
      'scope.userLocation': {
        desc: '你的位置信息将用于签到定位'
      }
    },
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#6190e8',
      navigationBarTitleText: '汇学',
      navigationBarTextStyle: 'white'
    },
    tabBar: {
      list: [
        {
          pagePath: 'pages/class/index',
          text: '班级',
          iconPath: './assets/tabbar/class.png',
          selectedIconPath: './assets/tabbar/class-active.png'
        },
        {
          pagePath: 'pages/community/index',
          text: '社区',
          iconPath: './assets/tabbar/community.png',
          selectedIconPath: './assets/tabbar/community-active.png'
        },
        {
          pagePath: 'pages/notification/index',
          text: '通知',
          iconPath: './assets/tabbar/notification.png',
          selectedIconPath: './assets/tabbar/notification-active.png'
        },
        {
          pagePath: 'pages/user/index',
          text: '我的',
          iconPath: './assets/tabbar/mine.png',
          selectedIconPath: './assets/tabbar/mine-active.png'
        }
      ],
      color: '#8a8a8a',
      selectedColor: '#6190e8',
      backgroundColor: '#fff',
      borderStyle: 'black'
    }
  }

  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Provider store={store}>
        <Class />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))