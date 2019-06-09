import { combineReducers } from 'redux'
import counter from './counter'
import user from './user'
import userClass from './class'

export default combineReducers({
  counter,
  user,
  userClass
})