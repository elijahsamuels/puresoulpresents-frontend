import { combineReducers } from 'redux'
import usersReducer from './usersReducer'
import eventsReducer from './eventsReducer'

const rootReducer = combineReducers({
	users: usersReducer,
	events: eventsReducer,
 })

export default rootReducer