import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from "redux-saga"
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import rootReducer, { rootSaga } from 'modules/index';

const sagaMiddleware = createSagaMiddleware()

const configureStore = () => {
  const store = createStore(rootReducer, applyMiddleware(sagaMiddleware))
  sagaMiddleware.run(rootSaga)
  // const persistor = persistStore(store);

  return store
}

ReactDOM.render(
  <Provider store={configureStore()}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

