/**
 * Created by flyjennyetn on 2016-10-26.
 */
import {
	takeLatest
} from 'redux-saga';
import {
	take,
	put,
	call,
	fork,
	select
} from 'redux-saga/effects';
import {xFetch} from '../utils/xFetch';
import {Storage,naviGoBack,toastShort} from '../utils/common';
import Main from '../pages/Main';

function* loginQuery({
	userData,navigator
}) {
	try {
		const items = yield call(xFetch, {
			requestUrl: 'loginInterface/login.json',
			...userData
		});
		yield call(Storage.save,'userData',eval('(' + items + ')'));
        navigator.resetTo({
            component: Main,
            name: 'Main'
        });
	} catch (error) {
	    yield toastShort(error);
	}
}

function* watchLogin() {
	yield takeLatest('login/query', loginQuery);
}

export default function*() {
	yield fork(watchLogin)
}