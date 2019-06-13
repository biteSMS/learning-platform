import { UPDATE_TOPICS } from '@/constants/community'

const INITIAL_STATE = {
  topics: []
}

export default function community (state = INITIAL_STATE, action) {
  switch (action.type) {
    case UPDATE_TOPICS:
      return {
        ...state,
        topics: action.data
      }
    default:
      return state
  }
}