import React, { Component } from 'react';
import {
    View,
    StatusBar,
    Platform,
    BackAndroid
} from 'react-native';
import {
  Scene,
  Reducer,
  Router,
  Switch,
  Modal,
  Actions,
  ActionConst,
} from 'react-native-router-flux';
// 微信分享插件
//import { registerApp } from 'react-native-wechat';

import Main from './pages/Main';
import Splash from './pages/Splash/';
import Login from './pages/Login/';
import Quizzes from './pages/Courses/Quizzes';
import SubjectDetails from './pages/Subject/Details';

import User from './pages/User/';
import UserAccount from './pages/User/Account';
import UserContact from './pages/User/Contact';
import UserMoile from './pages/User/Moile';
import UserPassword from './pages/User/Password';
import UserRecovered from './pages/User/Recovered';
//其他例子
// 网络
import OtherNetInfo from './pages/Other/NetInfo';
// 拍照摄影
import OtherCamera from './pages/Other/Camera';
// 扫一扫
// import OtherQrcode from './pages/Other/Qrcode';
// 后台唤醒之后手势密码
import GesturePassword from './pages/Other/GesturePassword';
import WebViews from './pages/Web/WebViews';
import Activity from './pages/Activity/';


const reducerCreate = params => {
  const defaultReducer = new Reducer(params);
  return (state, action) => {
    // console.log('ACTION:', action);
    return defaultReducer(state, action);
  };
};

// define this based on the styles/dimensions you use
const getSceneStyle = (/* NavigationSceneRendererProps */ props, computedProps) => {
  const style = {
    flexGrow: 1,
    backgroundColor: '#fff',
    shadowColor: null,
    shadowOffset: null,
    shadowOpacity: null,
    shadowRadius: null,
  };
  if (computedProps.isActive) {
    style.marginTop = computedProps.hideNavBar ? 0 : 64;
    style.marginBottom = computedProps.hideTabBar ? 0 : 50;
  }
  return style;
};


class App extends Component {
    constructor(props) {
        super(props);
        // 注册微信
        //registerApp('wxfb5294b09a6cb516');
    }


    render() {
        return (
            <View style={{flexGrow: 1}}>
                <StatusBar
                    barStyle='light-content'
                    backgroundColor='#66cc66'
                    translucent={true}
                />
                <Router createReducer={reducerCreate} getSceneStyle={getSceneStyle}>
                    <Scene key="modal" component={Modal} >
                        <Scene key="root" hideNavBar hideTabBar>
                            <Scene key="splash"  component={Splash} initial />
                            <Scene key="main"  component={Main} type="replace" />
                            <Scene key="login"  component={Login} type="replace"  />
                            <Scene key="quizzes"  component={Quizzes}  />
                            <Scene key="subjectDetails"  component={SubjectDetails}  />

                            <Scene key="user"  component={User}  />
                            <Scene key="userAccount"  component={UserAccount}  />
                            <Scene key="userContact"  component={UserContact}  />
                            <Scene key="userMoile"  component={UserMoile}  />
                            <Scene key="userPassword"  component={UserPassword}  />
                            <Scene key="userRecovered"  component={UserRecovered}  />
                            <Scene key="otherNetInfo"  component={OtherNetInfo}  />
                            <Scene key="otherCamera"  component={OtherCamera}  />
                            <Scene key="gesturePassword"  component={GesturePassword}  />
                            <Scene key="webViews"  component={WebViews}  />
                            <Scene key="activity"  component={Activity}  />

                        </Scene>
                    </Scene>
              </Router>
            </View>
        )
    }
}

export default App;