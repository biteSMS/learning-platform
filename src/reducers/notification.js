import { UPDATE_NOTIFICATION } from '@/constants/notification'

const INITIAL_STATE = {
  messages: []
}

export default function Notification (state = INITIAL_STATE, action) {
  switch (action.type) {
    case UPDATE_NOTIFICATION:
      return {
        ...state,
        messages: action.data
      }
    default:
      return state
  }
}