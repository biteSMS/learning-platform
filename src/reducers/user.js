import {
  ADD_USER_INFO
} from '@/constants/user'

const INITIAL_STATE = {
  
}

export default function user (state = INITIAL_STATE, action) {
  switch (action.type) {
    case ADD_USER_INFO:
      return {
        ...state,
        userInfo: action.data
      }
    default:
      return state
  }
}