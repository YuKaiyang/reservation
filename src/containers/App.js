/**
 * Created by 5820k on 2017/1/14.
 */
import React from 'react'
import Login from '../components/Login'
import Logout from '../components/Logout'
import fetch from 'isomorphic-fetch'
import {connect} from 'react-redux'
import {login, logout} from '../redux/actions'
import DevTools from './DevTools'

const style = {
	height: "21px",
	display: "block"
}
const App = (props) => {
	const {username, login, logout} =props
	const handleSubmit = (v) => {
		// const res = fetch('http://localhost:3000/reservation?username=于开洋')
		// res.then(res => res.json()).then(json => console.log(json))
		login({username: v.username})
	}
	const handleLogout = () => {
		logout()
	}
	const renderButton = () => {
		if (username === "") {
			return (
				<Login onSubmit={handleSubmit}/>
			)
		} else {
			return (
				<div>
					<span style={style}>{username}</span>
					<Logout onClick={handleLogout}/>
				</div>
			)
		}
	}
	return (
		<div>
			{renderButton()}
			<DevTools/>
		</div>
	)
}

export default connect(state => ({username: state.username}), {login, logout})(App)