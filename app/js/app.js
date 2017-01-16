import React, { Component } from 'react';
import {
    Navigator,
    View,
    StatusBar,
    Platform,
    BackAndroid
} from 'react-native';
// 微信分享插件
import { registerApp } from 'react-native-wechat';

import Splash from './pages/Splash/';
import { naviGoBack } from './utils/common';

let tempNavigator;
let isRemoved = false;

class App extends Component {
    constructor(props) {
        super(props);
        // 注册微信
        registerApp('wxfb5294b09a6cb516');
    }

    goBack = ()=> {
       return naviGoBack(tempNavigator);
    }

    renderScene = (route, navigator) => {
        const Component = route.component;
        tempNavigator = navigator;
        if (route.name === 'GesturePassword') {
          BackAndroid.removeEventListener('hardwareBackPress', this.goBack);
          isRemoved = true;
        } else if (isRemoved) {
          BackAndroid.addEventListener('hardwareBackPress', this.goBack);
        }
        return (
          <Component navigator={navigator} route={route} />
        );
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <StatusBar
                    barStyle='light-content'
                    backgroundColor='#66cc66'
                    translucent={true}
                />
                <Navigator
                    initialRoute={{name: 'Splash', component: Splash}}  
                    configureScene={(route)=>{
                        if (route.sceneConfig) {
                            return route.sceneConfig;
                        }
                        return  Navigator.SceneConfigs.PushFromRight;
                    }}
                    renderScene={this.renderScene}
                />
            </View>
        )
    }
}

export default App;