/**
 * Author : zhangqiandong
 * Created Date : 2017/3/29
 * Modified By： zhangqiandong
 * Why & What is modified  <修改原因描述>
 * <文件描述>
 */
const express = require('express')
const http = require('http')

const app = express()
const server = http.createServer(app)
const io = require('socket.io')(server)

const PORT = 9000
const hostname = '10.2.54.207'

let user_socket_online = []
let clientList = {}

io.on('connection', function (socket) {
	//TODO auth
	socket.emit("connection", "hello")

	socket.on('auth', function (data) {
		socket.name = data
		clientList[data] = socket
		user_socket_online.push({'user': data, 'id': socket.id})

		io.emit("auth", user_socket_online)
	})

	socket.on("msg", function (data, callback) {
		if (!data.roomId) {
			if (clientList[data.toUser]) {
				clientList[data.toUser].emit('msg', data)
			}
		} else {
			socket.to(data.roomId).emit(data)
		}
		callback()
	})

	socket.on('load', function (data) {
		socket.emit("history", loadMsg(data.user))
	})

	socket.on('disconnect', () => {
		user_socket_online = user_socket_online.filter(v => {
			return v.user !== socket.name
		})
		delete clientList[socket.name]
		io.emit('logout', user_socket_online)
	})
})

// function isOnline(user) {
//     if(user === '张三'){
//         return true
//     }else{
//         return false
//     }
// }

function getSocket(user) {
	user_socket_online.forEach(function (index, item, array) {
		if (item.user === user) {
			return item.socket
		}
	})
}

function loadMsg(user) {
	let d1 = {fromUser: "张三", toUser: user, msgType: "text", content: "你好", time: "20170202173849"}
	let d2 = {fromUser: "李四", toUser: user, msgType: "text", content: "你好，你买房子么", time: "20170228173849"}
	let d3 = {fromUser: "王五", roomId: "1", msgType: "text", content: "大家好，我是王五。", time: "20170228173849"}
	let d4 = {fromUser: "李四", roomId: "1", msgType: "text", content: "王五好。。。", time: "20170228173854"}

	return [d1, d4, d3, d2]
}

server.listen(PORT, hostname, (err) => {
	err && console.error(err)
	console.log(`The server is run at http://${hostname}:${PORT}`)
})