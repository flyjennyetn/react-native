/**
 * Created by flyjennyetn on 2016-10-24.
 */
import React, {Component} from 'react';
import {View,Text,NetInfo,BackAndroid} from 'react-native';
import {connect} from 'react-redux';
import Toolbar from '../../components/Toolbar'
import {naviGoBack} from '../../utils/common';

class OtherNetInfo extends Component {

	state = {
		connectionInfo: [],
	}

	componentDidMount() {
	     NetInfo.addEventListener(
		        'change',
		        this._handleConnectionInfoChange
		    );
	    NetInfo.fetch().done((connectionInfo) => { 
	    	/*
				NONE - 设备处于离线状态
				BLUETOOTH - 蓝牙数据连接
				DUMMY - 模拟数据连接
				ETHERNET - 以太网数据连接
				MOBILE - 移动网络数据连接
				MOBILE_DUN - 拨号移动网络数据连接
				MOBILE_HIPRI - 高优先级移动网络数据连接
				MOBILE_MMS - 彩信移动网络数据连接
				MOBILE_SUPL - 安全用户面定位（SUPL）数据连接
				VPN - 虚拟网络连接。需要Android5.0以上
				WIFI - WIFI数据连接
				WIMAX - WiMAX数据连接
				UNKNOWN - 未知数据连接
	    	*/
	    	this.setState({connectionInfo})
	    });
	}
	componentWillUnmount() {
		   NetInfo.removeEventListener(
	        'change',
	        this._handleConnectionInfoChange
	    );
	}
	_handleConnectionInfoChange(connectionInfo) {
	        this.setState({
		      connectionInfo,
		    });
	}

    render() {
        return (
            <View>
                <Toolbar
                    navigator = {this.props.navigator}
                    title = "网络状态"
                />
            	<Text>网络状态:{this.state.connectionInfo}</Text>
            </View>
        )
    }
}

export default OtherNetInfo