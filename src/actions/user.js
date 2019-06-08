import {
  ADD_USER_INFO
} from '@/constants/user'

export const addUserInfo = data => ({
  type: ADD_USER_INFO,
  data
})