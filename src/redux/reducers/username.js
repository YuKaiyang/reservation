/**
 * Created by 5820k on 2017/1/14.
 */
import {createReducer} from 'redux-act'
import {login, logout} from '../actions/actions'

export default createReducer({
	[login]: (state, payload) => payload.username,
	[logout]: (state, payload) => ""
}, "")