/**
 * Created by 5820k on 2017/1/14.
 */
import {createStore, applyMiddleware, compose} from 'redux'
import reducer from '../reducers'
import thunk from 'redux-thunk'
import DevTools from '../../containers/DevTools'

const enhancer = compose(
	applyMiddleware(thunk),
	DevTools.instrument()
);

export default createStore(reducer, enhancer)