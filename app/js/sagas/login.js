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
import {Actions} from "react-native-router-flux";
import {xFetch} from '../utils/xFetch';
import {Storage,naviGoBack,toastShort} from '../utils/common';
import Main from '../pages/Main';

function* loginQuery({
	userData
}) {
	try {
		const items = yield call(xFetch, {
			requestUrl: 'loginInterface/login.json',
			...userData
		});
		yield call(Storage.save,'userData',eval('(' + items + ')'));
		Actions.main()

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