import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/app/App'
import './index.css'
import * as component from './component'
import {Provider} from 'react-redux'
import reduxLogger from 'redux-logger'
import reduxCatch from 'redux-catch'
import {applyMiddleware, combineReducers, createStore} from 'redux'

const errorHandler = (error, getState, lastAction, dispatch) => {
  console.error(error)
}

// create middleware
const middleware = [reduxCatch(errorHandler)]
if (location.search.indexOf('redux-logger=true') > -1) {
  middleware.push(reduxLogger())
}
// create store
const store = createStore(combineReducers(component.reducers), applyMiddleware(...middleware))

ReactDOM.render(
  <Provider store={store}>
    <div>
      <App />
    </div>
  </Provider>,
  document.getElementById('root')
)
