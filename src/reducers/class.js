import {
  UPDATE_CLASS_LIST,
  UPDATE_TEACHER_CLASS_LIST
} from '@/constants/class'

const INITIAL_STATE = {
  classes: [],
  teacherClasses: []
}

export default function userClass (state = INITIAL_STATE, action) {
  switch (action.type) {
    case UPDATE_CLASS_LIST:
      return {
        ...state,
        classes: action.data
      }
    case UPDATE_TEACHER_CLASS_LIST:
      return {
        ...state,
        teacherClasses: action.data
      }
    default:
      return state
  }
}