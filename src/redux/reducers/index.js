/**
 * Created by 5820k on 2017/1/14.
 */
import {combineReducers} from 'redux'
import {reducer as formReducer} from 'redux-form'
import username from './username'

export default combineReducers({
	form: formReducer,
	username
})
