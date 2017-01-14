/**
 * Created by 5820k on 2017/1/14.
 */
import {createAction} from 'redux-act'
import fetch from 'isomorphic-fetch'

export const login = createAction("LOGIN")

export const logout = createAction("LOGOUT")

export const reservationRequest = createAction("RESERVATION_REQUEST")

export const reservationReceive = createAction("RESERVATION_RECEIVE")

export const cancelRequest = createAction("CANCEL_REQUEST")

export const cancelReceive = createAction("CANCEL_RECEIVE")

export const fetchReservation = payload => {
	return dispatch => {
		dispatch(reservationRequest(payload))
		return fetch(`http://localhost:3000/reservation?username=${payload.username}`)
			.then(response => response.json())
			.then(json => dispatch(reservationReceive({list: json.respond})))
	}
}

export const fetchCancel = payload => {
	return dispatch => {
		dispatch(cancelRequest(payload))
		return fetch(`http://localhost:3000/cancel?username=${payload.username}`)
			.then(response => response.json())
			.then(json => dispatch(cancelReceive({list: json.respond})))
	}
}