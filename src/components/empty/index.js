import './index.less'

export const Empty = () => {

  return (
    <View className="empty">
      <Image src={require('@/assets/empty.png')} className="empty-icon" />
    </View>
  )
}