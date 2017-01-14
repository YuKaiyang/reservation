/**
 * Created by 5820k on 2017/1/14.
 */
import React from 'react'
import Login from '../components/Login'
import Logout from '../components/Logout'
import Reservation from '../components/Reservation'
import Cancel from '../components/Cancel'
import List from '../components/List'
import {connect} from 'react-redux'
import {login, logout, fetchReservation, fetchCancel} from '../redux/actions'
import DevTools from './DevTools'

const usernameStyle = {
	height: "21px",
	display: "block"
}
const App = (props) => {
	const {username, get} =props
	const handleSubmit = (v) => {
		props.dispatch(login({username: v.username}))
	}
	const handleLogout = () => {
		props.dispatch(logout());
	}
	const handleReservation = () => {
		props.dispatch(fetchReservation({username: username}))
	}
	const handleCancel = () => {
		props.dispatch(fetchCancel({username: username}))
	}
	const renderButtonLog = () => {
		if (username === "") {
			return (
				<Login onSubmit={handleSubmit}/>
			)
		} else {
			return (
				<div>
					<span style={usernameStyle}>{username}</span>
					<Logout handleClick={handleLogout}/>
				</div>
			)
		}
	}
	const renderButtonRe = () => {
		if (username !== "") {
			if (!get.queuing) {
				return <Reservation disabled={get.isFetching}
				                    handleClick={handleReservation}/>
			} else {
				return <Cancel disabled={get.isFetching}
				               handleClick={handleCancel}/>
			}
		}
	}
	return (
		<div>
			{renderButtonLog()}
			{renderButtonRe()}
			<List list={get.list}/>
			<DevTools/>
		</div>
	)
}

const mapStateToProps = state => ({username: state.username, get: state.get})

export default connect(mapStateToProps)(App)