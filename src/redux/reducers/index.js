/**
 * Created by 5820k on 2017/1/14.
 */
import {combineReducers} from 'redux'
import {reducer as formReducer} from 'redux-form'
import username from './username'
import get from './get'

export default combineReducers({
	form: formReducer,
	username, get
})
