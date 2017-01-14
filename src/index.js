/**
 * Created by 5820k on 2017/1/14.
 */
import React from 'react'
import {render} from 'react-dom'
import {AppContainer} from 'react-hot-loader'
import {Provider} from 'react-redux'
import App from './containers/App'
import store from './redux/store/store'

const container = document.createElement('div')
document.body.appendChild(container)

render(<Provider store={store}>
		<AppContainer>
			<App/>
		</AppContainer>
	</Provider>
	, container)

if (module.hot) {
	module.hot.accept('./containers/App.js', () => {
		const NextApp = require('./containers/App').default
		render(<Provider store={store}>
				<AppContainer>
					<NextApp/>
				</AppContainer>
			</Provider>
			, container)
	})
}
