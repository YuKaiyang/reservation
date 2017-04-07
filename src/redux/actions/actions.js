/**
 * Created by 5820k on 2017/1/14.
 */
import {createAction} from 'redux-act'
import 'whatwg-fetch'
import {URL, PORT} from '../../constants'
import io from 'socket.io-client'

export const login = createAction("LOGIN")

export const logout = createAction("LOGOUT")

export const getListRequest = createAction("GET_LIST_REQUEST")

export const getListReceive = createAction("GET_LIST_RECEIVE")

export const reservationRequest = createAction("RESERVATION_REQUEST")

export const reservationReceive = createAction("RESERVATION_RECEIVE")

export const cancelRequest = createAction("CANCEL_REQUEST")

export const cancelReceive = createAction("CANCEL_RECEIVE")

const socket = io(`ws://${URL}:${PORT}`)

export const fetchLogin = payload => {
  return dispatch => {
    dispatch(login(payload))
    socket.emit('login', payload.username)
    socket.once('login', json => {
      if (json.queuing) {
        dispatch(reservationReceive({list: json.respond}))
      } else {
        dispatch(getListReceive({list: json.respond}))
      }
    })
  }
}

export const fetchList = payload => {
  return dispatch => {
    dispatch(getListRequest(payload))
    return fetch(`http://${URL}:${PORT}/`)
      .then(response => response.json())
      .then(json => dispatch(getListReceive({list: json.respond}))).catch(e => console.log(e))
  }
}

export const fetchReservation = payload => {
  return dispatch => {
    dispatch(reservationRequest(payload))
    socket.emit('reservation', payload.username)
    socket.once('reservation', json => {
      dispatch(reservationReceive({list: json.respond}))
    })
  }
}

export const fetchCancel = payload => {
  return dispatch => {
    dispatch(cancelRequest(payload))
    socket.emit('cancel', payload.username)
    socket.once('cancel', json => {
      dispatch(cancelReceive({list: json.respond}))
    })
  }
}