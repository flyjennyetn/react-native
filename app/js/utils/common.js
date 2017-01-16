/**
 * Created by flyjennyetn on 2016-10-24.
 */

import { AsyncStorage,Alert, ToastAndroid, Platform} from 'react-native';

// 是否有打开页
export const naviGoBack = (navigator) => {
  if (navigator && navigator.getCurrentRoutes().length > 1) {
    navigator.pop();
    return true;
  }
  return false;
};

// 缓存 封装
export class Storage {
  static get(key) {
    return AsyncStorage.getItem(key).then((value) => {
      const jsonValue = JSON.parse(value);
      return jsonValue;
    });
  }

  static save(key, value) {
    return AsyncStorage.setItem(key, JSON.stringify(value));
  }

  static update(key, value) {
    return DeviceStorage.get(key).then((item) => {
      value = typeof value === 'string' ? value : Object.assign({}, item, value);
      return AsyncStorage.setItem(key, JSON.stringify(value));
    });
  }

  static delete(key) {
    return AsyncStorage.removeItem(key);
  }
}


// 轻提示 几秒消失 
// isAlert 为true 需要用户确认
export const toastShort = (content, isAlert) => {
  if (isAlert || Platform.OS === 'ios') {
    Alert.alert(
      '提示',
      content.toString()
    );
  } else {
    ToastAndroid.show(content.toString(), ToastAndroid.SHORT);
  }
};

// 需要用户确定
// export const compelAlert = (msg,callback)=>{
// 	Alert.alert(
//         '提示',
//         msg,
//         [
//           {
//             text: '确定',
//             onPress: callback
//           },
//         ]
//     );
// }

export function isNotNullObj(obj) {
	for (var i in obj) {
		if (obj.hasOwnProperty(i)) {
			return true;
		}
	}
	return false;
}

//渲染视频的
export function polyvObjects() {
	//polyvplayer_v2.0.min
	var width = "100%";
	var height = "5rem";
	var banSeekByLimitTime = 'off';
	var autoplay = '1';
	if (arguments.length > 1) {
		width = arguments[1];
		height = arguments[2];
		banSeekByLimitTime = 'on';
		autoplay = '0';
	}
	var player = polyvObject('#plv_' + arguments[0]).videoPlayer({
		'width': width,
		'height': height,
		'vid': arguments[0],
		'flashvars': {
			"ban_seek_by_limit_time": banSeekByLimitTime,
			"autoplay": autoplay
		}
	});
}