/**
 * Created by flyjennyetn on 2016-10-24.
 */
import qs from 'qs';
import {toastShort} from './common';
import {IPLOCATION,SMSLOCATION} from './config';

function check401(res) {
	console.log(res);
	// if (res.status === 401) {
	// 	// location.href = '/401';
	// 	alert('/401');
	// }
	// return res;
}

function check404(res) {
	console.log(res);
	// if (res.status === 404) {
	// 	return Promise.reject(errorMessages(res));
	// }
	// return res;
}

function jsonParse(res) {
	console.log(res);
	// return res.json().then(jsonResult => ({...res,
	// 	jsonResult
	// }));
}

function errorMessageParse(res) {
	console.log(res);
	// const {
	// 	result,
	// 	msg,
	// 	t
	// } = res.jsonResult;
	// if (!result) {
	// 	alert(msg);
	// 	return false;
	// }
	// return t;
}

export function xFetch(options) {
	return new Promise((resolve, reject) => {
	    fetch(`${IPLOCATION + options.requestUrl}?${qs.stringify(options)}`)
	    .then((response) => {
	    	if (response.ok) {
	          isOk = true;
	        } else {
	          isOk = false;
	        }
	        return response.json();
	    })
	    .then((responseData) => {
	    	if(!responseData.result){
				toastShort(responseData.msg,true);
				return;
			}else{
				resolve(responseData.t);
			}
	    })
	    .catch((error) => {
	        reject(error);
	    });
	});
}

export function xFetchCode(options) {
	return new Promise((resolve, reject) => {
	    fetch(`${SMSLOCATION + options.requestUrl}?${qs.stringify(options)}`)
	    .then((response) => {
	    	if (response.ok) {
	          isOk = true;
	        } else {
	          isOk = false;
	        }
	        return response.text();
	    })
	    .then((responseData) => {
	    	if(responseData.indexOf('43434333') > -1){
	    		let jsonstr = responseData.split("3(")[1].split(")");
	    		let jsonObj = eval('(' + jsonstr[0] + ')');
	    		if(jsonObj.state == 1 && jsonObj.state == 2){
	    			toastShort(jsonObj.remark,true);
	    		}else{
	    			resolve(jsonObj);
	    		}
	    	}else{
		  //   	if(!responseData.result){
				// 	toastShort(responseData.msg,true);
				// 	return;
				// }else{
				// 	resolve(responseData.t);
				// }
	    	}
	    })
	    .catch((error) => {
	        reject(error);
	    });
	});
}

