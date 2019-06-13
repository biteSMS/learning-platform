import { useState } from '@tarojs/taro'
import { handleResponse } from "@/utils"
import { URLS } from "@/constants/urls"
import { connect } from "@tarojs/redux"
import { getTopics } from "@/actions/community"
import { AtInput, AtForm, AtTextarea, AtButton } from 'taro-ui'
import './post.less'

const Post = ({ getTopics }) => {
  const [data, setData] = useState({title: '', content: ''})

  function handleChangeTitle(value) {
    setData({
      ...data,
      title: value
    })
  }

  function handleChangeContent(e) {
    setData({
      ...data,
      content: e.detail.value
    })
  }

  async function handleClickButton() {
    try {
      const res = await Taro.request({
        url: URLS.POST_TOPIC,
        method: "POST",
        data,
        header: {
          token: Taro.getStorageSync("token"),
          'content-type': 'application/x-www-form-urlencoded'
        }
      })
      await handleResponse(res)
      getTopics()
      Taro.navigateBack({
        delta: 1
      })
      Taro.showToast({
        title: '发表成功',
        icon: 'success',
        duration: 2000
      })
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <View className="community-post">
      <AtForm>
        <AtInput
          title="标题"
          placeholder="请输入问题的标题"
          onChange={handleChangeTitle}
        />
        <AtTextarea
          maxLength={100}
          placeholder="问题描述..."
          height={340}
          value={data.content}
          onChange={handleChangeContent}
        />
      </AtForm>
      <AtButton
        className="button"
        type="primary"
        disabled={Object.values(data).includes('')}
        onClick={handleClickButton}
      >
        发表
      </AtButton>
    </View>
  )
}

const mapDispatchToProps = dispatch => ({
  getTopics() {
    return dispatch(getTopics())
  }
})

export default connect(
  () => ({}),
  mapDispatchToProps
)(Post)