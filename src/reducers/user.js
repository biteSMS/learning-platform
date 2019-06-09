import {
  UPDATE_USER_INFO
} from '@/constants/user'

const INITIAL_STATE = {
  userInfo: {}
}

export default function user (state = INITIAL_STATE, action) {
  switch (action.type) {
    case UPDATE_USER_INFO:
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          ...action.data
        }
      }
    default:
      return state
  }
}