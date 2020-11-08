import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import createSagaMiddleware from 'redux-saga'
import burgerBuilderReducer from './store/reducers/burgerBuilder'
import fetchOrdersReducer from './store/reducers/orders'
import placeOrderReducer from './store/reducers/orderPlace'
import authReducer from './store/reducers/auth'
import { watchAuth } from './store/sagas/index'  // we can omit index here

const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

const rootReducer = combineReducers({
  bbReducer: burgerBuilderReducer,
  foReducer: fetchOrdersReducer,
  poReducer: placeOrderReducer,
  authReducer: authReducer
})

const logger = store => {
  return next => {
      return action => {
          console.log('[MIDDLEWARE] dispatching', action)
          const result = next(action)
          console.log('[MIDDLEWARE] next state', store.getState())
          return result
      }
  }
}

const crashReporter = store => {
  return next => {
      return action => {
          try {
              next(action)
          } catch (err) {
              console.log('[CrashReport]' , err)
          }
      }
  }
}

const sagaMiddleware = createSagaMiddleware()
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk, logger, crashReporter, sagaMiddleware)))

sagaMiddleware.run(watchAuth)

ReactDOM.render(
  <React.StrictMode>
    <Provider store = {store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
