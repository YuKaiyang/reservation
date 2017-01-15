/**
 * Created by 5820k on 2017/1/14.
 */
import {createReducer} from 'redux-act'
import {
	reservationRequest, reservationReceive,
	cancelRequest, cancelReceive,
	getListRequest, getListReceive,
	logout
} from '../actions/actions'

export default createReducer({
	[reservationRequest]: state => ({...state, isFetching: true}),
	[reservationReceive]: (state, payload) => ({isFetching: false, queuing: true, list: payload.list}),
	[cancelRequest]: state => ({...state, isFetching: true}),
	[cancelReceive]: (state, payload) => ({isFetching: false, queuing: false, list: payload.list}),
	[getListRequest]: state => ({...state, isFetching: true}),
	[getListReceive]: (state, payload) => ({...state, isFetching: false, list: payload.list}),
	[logout]: state => ({...state, queuing: false})
}, {isFetching: false, queuing: false, list: []})