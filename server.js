/**
 * Created by 5820k on 2017/1/14.
 */
const app = require('express')()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const PORT = require('./src/constants').PORT
const list = []

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", req.get("origin"))
  res.header("Access-Control-Allow-Credentials", true)
  next()
})

io.on('connection', socket => {
  console.log("新用户登录")

  socket.on('login', obj => {
    console.log(obj)
    io.emit('login', list)
  })
})

app.get('/', (req, res) => {
  const data = req.query.username
  if (list.indexOf(data) !== -1) {
    console.log("用户已预约")
    res.json({
      respond: list,
      queuing: true
    })
  } else {
    res.json({
      respond: list
    })
  }
})

app.get('/reservation', (req, res) => {
  console.log(req.query.username + "：预约")
  const data = req.query.username
  if (list.indexOf(data) === -1) {
    list.push(req.query.username)
  }
  res.json({
    respond: list
  })
})

app.get('/cancel', (req, res) => {
  console.log(req.query.username + "：取消预约")
  const data = req.query.username
  const index = list.indexOf(data)
  list.splice(index, 1)
  res.json({
    respond: list
  })
})

server.listen(PORT, () => {
  console.log(`The server run The http://localhost:${PORT}`)
})