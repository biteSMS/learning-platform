import { combineReducers } from 'redux'
import user from './user'
import userClass from './class'
import community from './community'

export default combineReducers({
  user,
  userClass,
  community
})