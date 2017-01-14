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
import * as actions from '../redux/actions/actions'
import DevTools from './DevTools'

const usernameStyle = {
	height: "21px",
	display: "block"
}
const App2 = (props) => {
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

class App extends React.Component {
	constructor(props) {
		super(props)
		this.handleSubmit = this::this.handleSubmit
		this.handleLogout = this::this.handleLogout
		this.handleReservation = this::this.handleReservation
		this.handleCancel = this::this.handleCancel
	}

	componentDidMount() {
		if (document.cookie.length > 0) {
		}
		this.props.dispatch(actions.fetchList())
	}

	handleSubmit = (v) => {
		document.cookie = "username=" + v.username
		this.props.dispatch(actions.login({username: v.username}))
	}
	handleLogout = () => {
		this.props.dispatch(actions.logout());
	}
	handleReservation = () => {
		this.props.dispatch(actions.fetchReservation({username: this.props.username}))
	}
	handleCancel = () => {
		this.props.dispatch(actions.fetchCancel({username: this.props.username}))
	}
	renderButtonLog = () => {
		if (this.props.username === "") {
			return (
				<Login onSubmit={this.handleSubmit}/>
			)
		} else {
			return (
				<div>
					<span style={usernameStyle}>{this.props.username}</span>
					<Logout handleClick={this.handleLogout}/>
				</div>
			)
		}
	}
	renderButtonRe = () => {
		if (this.props.username !== "") {
			if (!this.props.get.queuing) {
				return <Reservation disabled={this.props.get.isFetching}
				                    handleClick={this.handleReservation}/>
			} else {
				return <Cancel disabled={this.props.get.isFetching}
				               handleClick={this.handleCancel}/>
			}
		}
	}
	render = () => {
		return (
			<div>
				{this.renderButtonLog()}
				{this.renderButtonRe()}
				<List list={this.props.get.list}/>
				<DevTools/>
			</div>
		)
	}
}

const mapStateToProps = state => ({username: state.username, get: state.get})

export default connect(mapStateToProps)(App)