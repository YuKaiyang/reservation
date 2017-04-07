/**
 * Created by 5820k on 2017/1/14.
 */
import path from 'path'
import OpenBrowser from 'open-browser-webpack-plugin'
import webpack from 'webpack'

export default {
	entry: {
		bundle: ["react-hot-loader/patch", "./src/index.js"]
	},
	output: {
		path: "build",
		filename: "[name].js"
	},
	module: {
		loaders: [
			{test: /\.jsx?$/, loader: "babel-loader", exclude: path.resolve(__dirname, 'node_modules')}
		]
	},
	plugins: [
		new OpenBrowser({
			url: "http://localhost:8080/bundle"
		}),
		new webpack.ProvidePlugin({
			$: "jquery",
			jQuery: "jquery",
			"window.jQuery": "jquery"
		})
	],
	devtool: 'eval'
}