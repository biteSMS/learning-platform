import Taro from "@tarojs/taro"

export const handleResponse = res =>
  new Promise((resolved, rejected) => {
    switch (res.data.code) {
      case 4000:
        Taro.redirectTo({ url: "/pages/auth/index" })
        Taro.showToast({
          title: "登陆已过期！",
          icon: "none",
          duration: 2000
        })
        rejected(4000)
      case 1:
        resolved()
      default:
        rejected(res.data.code)
    }
  })

export const getDate = t => {
  const time = new Date(t)
  const date = `${time.getFullYear()}年${time.getMonth() +
    1}月${time.getDate()}日 ${
    time.getHours() > 9 ? time.getHours() : "0" + time.getHours()
  }:${time.getMinutes() > 9 ? time.getMinutes() : "0" + time.getMinutes()}:${
    time.getSeconds() > 9 ? time.getSeconds() : "0" + time.getSeconds()
  }`
  return date
}

export const getCheckInStatus = type => {
  switch (type) {
    case 0:
      return "出勤"
    case 1:
      return "迟到"
    case 2:
      return "缺勤"
    case 3:
      return "请假"
    default:
  }
}

export const getSubmitStatus = type => {
  switch (type) {
    case 0:
      return "迟交"
    case 1:
      return "按时提交"
    case 2:
      return "未交"
    case 3:
      return "老师发布的"
    default:
  }
}

export const getCheckHomeworkStatus = type => {
  switch (type) {
    case 0:
      return "未批改"
    case 1:
      return "已批改"
    case 2:
      return "驳回"
    case 3:
      return "学生撤回"
    case 4:
      return "老师发布的"
    default:
  }
}