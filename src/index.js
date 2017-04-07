/**
 * Author：Yky
 * Create Date：2017/3/28
 * Modified By：Yky
 * Why & What is modified  <修改原因描述>
 * <文件描述>
 */
import React, {Component} from 'react'
import {render} from 'react-dom'

class T1 extends Component {

	componentWillUnmount() {
		console.log('T1 will unmount')
	}

	render() {
		return <p>T1</p>
	}
}

class T22 extends Component {

	componentWillUnmount() {
		console.log('T22 will unmount')
	}

	render() {
		return <p>T22</p>
	}
}


class T2 extends Component {

	componentWillUnmount() {
		console.log('T2 will unmount')
	}

	render() {
		return (
			<div>
				<p>T2</p>
				<T22/>
			</div>)

	}
}

class Home extends Component {
	constructor(props) {
		super(props)

		this.state = {
			int: 0
		}
	}

	renderChild = () => {
		return this.state.int % 2 === 0 ? <T1/> : <T2/>
	}

	handleClick = () => {
		this.setState({int: this.state.int + 1})
	}

	render() {
		return (
			<div>
				{this.state.int}
				<button onClick={this.handleClick}>加</button>
				{this.renderChild()}
			</div>
		)
	}
}

const container = document.createElement('div')
document.body.appendChild(container)

render(<Home/>, container)