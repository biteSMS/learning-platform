import Taro from "@tarojs/taro"

export const handleResponse = res => new Promise((resolved, rejected) => {
  switch (res.data.code) {
    case 4000:
      Taro.redirectTo({url: '/pages/auth/index'})
      Taro.showToast({
        title: '登陆已过期！',
        icon: 'none',
        duration: 2000
      })
      rejected(4000)
    case 1:
      resolved()
    default:
      rejected(res.data.code)
  }
})