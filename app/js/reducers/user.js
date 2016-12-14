/**
 * Created by flyjennyetn on 2016-10-26.
 */
import {
	handleActions
} from 'redux-actions';
import {
	combineReducer
} from 'redux';

const user = handleActions({
	['user/set/info'](state, action) {
		return {
			...state,
			userInfo: action.userInfo,
		};
	},
	['user/set/name'](state, action) {
		state.userInfo = {loginName:action.loginName};
		return {
			...state
		};
	},
	['user/set/visible'](state, action) {
		return {
			...state,
			visible:action.visible,
		};
	},
	['user/set/count'](state, action) {
		return {
			...state,
			count:action.count,
		};
	}
}, {
	userInfo: {},
	visible:false,
	count:false
});

export default user;