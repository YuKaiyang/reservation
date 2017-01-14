/**
 * Created by 5820k on 2017/1/14.
 */
import express from 'express'

const PATH = 3000
const app = express()
const state = []

app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", req.get("origin"));
	res.header("Access-Control-Allow-Credentials", true);
	next();
});

app.get('/reservation', (req, res) => {
	const data = req.query.username
	if (state.indexOf(data) === -1) {
		state.push(req.query.username)
	}
	res.json({
		respond: state
	})
})

app.get('/cancel', (req, res) => {
	const index = state.indexOf(req.query.username)
	if (index) {
		state.splice(index)
	}
	res.json({
		respond: state
	})
})

app.listen(PATH, () => {
	console.log(`The server run The http://localhost:${PATH}`)
})