/**
 * Created by 5820k on 2017/1/14.
 */
import React from 'react'
import {render} from 'react-dom'
import {AppContainer} from 'react-hot-loader'
import {Provider} from 'react-redux'
import App from './containers/App'
import store from './redux/store/store'
import {fetchList} from './redux/actions/actions'

const container = document.createElement('div')
document.body.appendChild(container)

const ws = new WebSocket('ws:10.2.54.207:3000/')
ws.onmessage = function (e) {
  console.log('_message1111');
  if (e.data[0]) {
    store.dispatch(fetchList())
  }
};
ws.onerror = function (err) {
  console.log('_error');
  console.log(err);
};
ws.onopen = function () {
  console.log('_connect')
};
ws.onclose = function () {
  console.log('_close');
};

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
