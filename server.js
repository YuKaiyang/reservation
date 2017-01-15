/**
 * Created by 5820k on 2017/1/14.
 */
import express from 'express'

const PATH = 3000
const app = express()
const list = []

app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", req.get("origin"));
	res.header("Access-Control-Allow-Credentials", true);
	next();
});

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

app.listen(PATH, () => {
	console.log(`The server run The http://localhost:${PATH}`)
})