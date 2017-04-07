/**
 * Author：Yky
 * Create Date：2017/3/28
 * Modified By：Yky
 * Why & What is modified  <修改原因描述>
 * <文件描述>
 */
import React, {Component} from 'react'
import {render} from 'react-dom'
import io from 'socket.io-client'

const PORT = 9000

class Test extends Component {
	constructor(props) {
		super(props)

		this.state = {
			userList: [],
			userInfo: {},
			myName: '',
			toUser: '请选择好友'
		}
	}

	componentDidMount() {
		$('document').ready(() => {
			const username = prompt('你的昵称')
			const socket = io.connect(`ws://10.2.54.207:${PORT}`)

			if (username) {
				socket.emit('auth', username)
				socket.emit('load', username)
			}

			socket.on('auth', msg => {
				const userList = msg.map(v => {
					return v.user
				})
				this.setState({userList: userList, userInfo: msg, myName: username})
			})

			socket.on('history', (data) => {
				data.forEach(v => {
					$('#chat').append(this.msgHtml(v))
				})
			})

			socket.on('msg', data => {
				$('#chat').append(this.msgHtml(data))
			})

			socket.on('logout', msg => {
				const userList = msg.map(v => {
					return v.user
				})
				this.setState({userList: userList, userInfo: msg, myName: username})
			})

			socket.on('reconnect', () => {
				if (username) {
					socket.emit('auth', username)
				}
			})

			$('input')[0].onkeydown = (e) => {
				if (e.keyCode === 13 && e.target.value && this.state.toUser !== '请选择好友') {
					const {myName, toUser} = this.state
					const data = {
						fromUser: myName,
						toUser: toUser,
						msgType: 'text',
						content: e.target.value,
						time: Date.now()
					}
					socket.emit('msg', data, () => {
						$('#chat').append(this.mySay(data))
						$('input')[0].value = ''
					})
				}
			}
		})
	}

	msgHtml = (data) => '<section>'
	+ '<p>' + data.fromUser + ': ' + data.content + '</p>'
	+ '</section>'

	mySay = (data) => '<section>'
	+ '<p>' + '我说: ' + data.content + '</p>'
	+ '</section>'

	handleChange = (e) => {
		this.setState({toUser: e.target.innerHTML})
		$('input').focus()
	}

	renderUserList = () => {
		return this.state.userList.map((v, i) => {
			if (v !== this.state.myName) {
				return <li key={i}>
					<button style={{height: '50px', width: '50px'}}
					        onClick={this.handleChange}
					>{v}</button>
				</li>
			}
		})
	}

	render() {
		return (
			<div id="chat">
				<div>
					<ul style={{position: 'fixed', right: '50px', listStyle: 'none'}}>
						<p>在线列表（点击好友头像聊天）</p>
						{this.state.userList.length <= 1 ? '当前没有其他好友在线' : this.renderUserList()}
					</ul>
				</div>
				<div style={{width: '100%', position: 'fixed', bottom: 0}}>
					<span style={{display: 'inline-block', width: '12%', height: '50px'}}>
						{this.state.toUser}
					</span>
					<input
						type="text" style={{width: '70%', height: '46px'}}
					/>
					<span style={{display: 'inline-block', width: '12%', height: '50px'}}>
						我是：{this.state.myName}
					</span>
				</div>
			</div>
		)
	}
}

const
	container = document.createElement('div')
document
	.body
	.appendChild(container)

render(
	<Test/>,
	container
)