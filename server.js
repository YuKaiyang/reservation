/**
 * Created by 5820k on 2017/1/14.
 */
const app = require('express')()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const PORT = require('./src/constants').PORT
const list = []
const fs = require('fs')
let filePath = './src/SXRB201607151456000047329372389.png';
let bData = fs.readFileSync(filePath);
let base64Str = bData.toString('base64');
let dataUri = 'data:image/png;base64,' + base64Str;

app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", req.get("origin"))
	res.header("Access-Control-Allow-Credentials", true)
	next()
})

let userList = {}, clientList = []

io.on('connection', socket => {
	socket.on('join', username => {
		userList[username] = username
		clientList[username] = socket

		clientList.forEach(client => {
			client.emit('userList', userList)
		})
	})

	socket.on('disconnect', username => {
		console.log(username, 'disconnect')
		delete userList[username]
		clientList.splice(clientList.indexOf(username), 1)
	})

	// socket.join('room 237', function () {
	// 	console.log(socket.rooms); // [ <socket.id>, 'room 237' ]
	// 	socket.broadcast.to('room 237').emit('msg', 'a new user has joined the room'); // broadcast to everyone in the room
	// })


	// socket.on('login', req => {
	// 	if (list.indexOf(req) !== -1) {
	// 		console.log("用户已预约")
	// 		io.emit('login', {
	// 			respond: list,
	// 			queuing: true
	// 		})
	// 	} else {
	// 		console.log(req + "登录")
	// 		io.emit('login', {
	// 			respond: list
	// 		})
	// 	}
	// })
	// socket.on('reservation', req => {
	// 	console.log(req + "：预约")
	// 	if (list.indexOf(req) === -1) {
	// 		list.push(req)
	// 	}
	// 	io.emit('reservation', {
	// 		respond: list
	// 	})
	// })
	// socket.on('cancel', req => {
	// 	console.log(req + "：取消预约")
	// 	const index = list.indexOf(req)
	// 	list.splice(index, 1)
	// 	io.emit('cancel', {
	// 		respond: list
	// 	})
	// })
})

app.get('/', (req, res) => {
	res.json({
		respond: list
	})
})

server.listen(PORT, () => {
	console.log(`The server run The http://localhost:${PORT}`)
})