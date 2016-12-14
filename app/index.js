/**
 * Created by flyjennyetn on 2016-10-24.
 */
import React , { Component } from 'react';
import {Navigator,View,StatusBar, Platform} from 'react-native';
import {createStore,applyMiddleware,compose,combineReducers} from 'redux';
import {Provider } from 'react-redux';
import createSagaMiddleware, {END} from 'redux-saga';

import ReducersManager from './js/reducers/';
import SagaManager from './js/sagas/';
import App from './js/app';

const sagaMiddleware = createSagaMiddleware();
const initialState = window.__INITIAL_STATE__;

const store = createStore(
    ReducersManager,
    initialState,
    compose(applyMiddleware(sagaMiddleware))
);

store.runSaga = sagaMiddleware.run;
store.close = () => store.dispatch(END);
store.runSaga(SagaManager);

const isDebuggingInBrowser = __DEV__ && !!window.navigator.userAgent;
if (isDebuggingInBrowser) {
    window.store = store;
}

export default class MyProject extends Component {
    render() {
        return (
            <Provider store = {store} >
                <App />
            </Provider>
        )
    }
}