import { combineReducers } from 'redux'
import user from './user'
import userClass from './class'
import community from './community'
import notification from './notification'

export default combineReducers({
  user,
  userClass,
  community,
  notification
})