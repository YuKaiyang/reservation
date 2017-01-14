/**
 * Created by 5820k on 2017/1/14.
 */
import {createReducer} from 'redux-act'
import {
	reservationRequest, reservationReceive,
	cancelRequest, cancelReceive,
	getListRequest, getListReceive
} from '../actions/actions'

export default createReducer({
	[reservationRequest]: (state, payload) => ({...state, isFetching: true}),
	[reservationReceive]: (state, payload) => ({isFetching: false, queuing: true, list: payload.list}),
	[cancelRequest]: (state, payload) => ({...state, isFetching: true}),
	[cancelReceive]: (state, payload) => ({isFetching: false, queuing: false, list: payload.list}),
	[getListRequest]: (state, payload) => ({...state, isFetching: true}),
	[getListReceive]: (state, payload) => ({...state, isFetching: true, list: payload.list})
}, {isFetching: false, queuing: false, list: []})