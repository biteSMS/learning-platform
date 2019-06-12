import Taro from "@tarojs/taro"

export const getLocation = async () => {
  const settingRes = await Taro.getSetting()
  if (!settingRes.authSetting["scope.userLocation"]) {
    await Taro.authorize({
      scope: "scope.userLocation"
    })
  }
  const locationRes = await Taro.getLocation({
    type: "gcj02"
  })
  return {
    longitude: locationRes.longitude,
    latitude: locationRes.latitude
  }
}
