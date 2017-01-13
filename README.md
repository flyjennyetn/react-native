


##[react-native](https://github.com/flyjennyetn/react-native)
>```注意``` 使用本框架前请先学习[es6](http://es6.ruanyifeng.com/)相关知识和[react](http://www.ruanyifeng.com/blog/2015/03/react.html)基础知识，了解一遍react-native组件API。

 react 开发框架，集成[redux]( http://cn.redux.js.org/index.html)，[react-router](http://leonshi.com/redux-saga-in-chinese/index.html)，[redux-saga](http://www.uprogrammer.cn/react-router-cn/  )，[CSS Modules ](http://www.ruanyifeng.com/blog/2016/06/css_modules.html)，
 [redux-actions](https://www.npmjs.com/package/redux-actions) ，使用webpack构建。

##安装
* npm install

* react-native start

* react-native run-android

##项目目录结构
```react-native-master```               &nbsp; &nbsp; # 项目根目录
```sh
├─ android                
├─ app                    # 项目配置文件
    ├── images           # 图片库
    ├── js   
         ├──components   # 组件库
         ├── containers  # 容器/页
         ├── reducers   # 负责处理action的state更新。
         ├── sagas      # 负责协调那些复杂或异步的操作。
         ├── tools      # 工具库
         ├── app.js     # app入口文件
    ├──index.js
├─ ios     
├─ .babelrc        [#babel配置文件](https://inv-veri.chinatax.gov.cn/)
├── .buckconfig      
├── .flowconfig      
├── .gitignore      
├── .watchmanconfig 
├── index.android.js  #安卓启动入口配置文件
├── index.ios.js      #ios启动入口配置文件
├── package.json      # 包配置
├── README.md   
```
> **注意**  当前目录结构适用于原生和微信小程序，请勿修改。

##开发流程
#### ```index.android.js```  
 
```js
import { AppRegistry } from 'react-native';
import qsndyr from './app/';

console.disableYellowBox = true;

AppRegistry.registerComponent('qsndyr', () => qsndyr);
```

APP入口配置文件

#### ```app/index.js```  
 
```js
import React , { Component } from 'react';
import {Navigator,View,StatusBar, Platform} from 'react-native';
import{createStore,applyMiddleware,compose,combineReducers} from 'redux';
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
//集合所有的还原剂和中间键
store.runSaga = sagaMiddleware.run;
store.close = () => store.dispatch(END);
//运行中间键
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
```
该页面主要是项目的架构配置页面会去启动引入的APP页面


#### ```app/index.js```  
 
```js
import React, { Component } from 'react';
import {Navigator,View,StatusBar,Platform,BackAndroid} from 'react-native';
import { registerApp } from 'react-native-wechat';
import Splash from './containers/Splash/';
import { naviGoBack } from './tools/common';

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
//获取页面信息和导航器信息的方法
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
```
这个页面主要注册了一个的原生的导航器 Navigator 

#### ```src/sagas/index.js```   
#### ```src/reducers/index.js``` 
...除视图外，页面雷同于web端react

#### ```app/js/containers/Main.js```  
 
```js
'use strict';
import React, {Component} from 'react';
import {StyleSheet,View,Text,Image,TouchableOpacity,Platform,Dimensions,DrawerLayoutAndroid,AppState,Navigator} from 'react-native';
import {connect} from 'react-redux'
import JPushModule from 'jpush-react-native';
import TabNavigator from 'react-native-tab-navigator';
import DrawerLayout from 'react-native-drawer-layout';

import Courses from './Courses/';
import Subject from './Subject/';
import User from './User/';
import UserInfo from './User/Info';
import UserAccount from './User/Account';
import UserMoile from './User/Moile';
import UserPassword from './User/Password';

import Login from './Login/';
import About from './About/About';
import WebViews from './Web/WebViews';

import Activity from './Activity/';

import {Storage} from '../tools/common';
import {IMGADDRESS} from '../tools/config';

//其他例子
// 网络
import OtherNetInfo from './Other/NetInfo';
// 拍照摄影
import OtherCamera from './Other/Camera';
// 扫一扫
import OtherQrcode from './Other/Qrcode';
// 后台唤醒之后手势密码
import GesturePassword from './Other/GesturePassword';

const changeMsg = require('../../images/changeMsg.png');
const lock = require('../../images/lock.png');
const mobile = require('../../images/mobile.png');
const back = require('../../images/closeVideo.png');
const discoverFill=require('../../images/discover_fill.png');
const wifi = require('../../images/wifi.png');
const camera=require('../../images/ic_photo_camera_36pt.png');
const scan = require('../../images/scan.png');

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userData:{},
            currentAppState: AppState.currentState,
            selectedTab:'courses',
            drawerItems:[
                ['账户修改',changeMsg,1],
                ['修改密码',lock,2],
                ['绑定手机',mobile,3],
                ['访问wap版',discoverFill,4],
                ['网络状态',wifi,5],
                ['拍照摄影',camera,6],
                ['扫一扫',scan,7],
                ['退出',back,0]
            ],
            gradeGather:[
                '小学一年级',
                '小学二年级',
                '小学三年级',
                '小学四年级',
                '小学五年级',
                '小学六年级',
                '初中一年级',
                '初中二年级',
                '初中三年级',
                '高中一年级',
                '高中二年级',
                '高中三年级'
            ]
        };
    }

    componentWillMount(){
        Storage.get('userData').then(ret=>{
            this.state.userData = ret;
            this.props.dispatch({
                type:'user/query/pci',
                token:ret.token
            })
        });
    }

    componentDidMount() {
        AppState.addEventListener('change', this._handleAppStateChange);

        JPushModule.addReceiveNotificationListener((message) => {
            //这是默认的通知消息   
            console.log("默认=",message);  
        })

        JPushModule.addReceiveCustomMsgListener((message) => {
            //这是自定义的通知消息    
            console.log("自定义=",message);
        });

        //点击通知进入应用的主页，相当于跳转到制定的页面  
        JPushModule.addReceiveOpenNotificationListener((message) => {  
            console.log(message);
            var data = eval('(' + message.extras + ')');  
            this.props.navigator.replace({
                name: "Activity",
                component:Activity,
                params:{
                    activityNum:data.id
                }
            });  
        }) 

    }
    componentWillUnmount() {
        AppState.removeEventListener('change', this._handleAppStateChange);
        JPushModule.removeReceiveCustomMsgListener();
        JPushModule.removeReceiveNotificationListener();
    }

    _handleAppStateChange = (currentAppState)=>{
        this.setState({currentAppState:currentAppState});
        if(currentAppState == 'active'){
            this.props.navigator.push({
              component: GesturePassword,
              name: 'GesturePassword',
              sceneConfig: Navigator.SceneConfigs.FadeAndroid,
            });
        }
    }

    onPressDrawerItem(index) {
        const { navigator } = this.props;
        this.drawer.closeDrawer();
        switch (index) {
          case 1:
            navigator.push({
              component: UserAccount,
              name: 'UserAccount'
            });
            break;
          case 2:
            navigator.push({
              component: UserPassword,
              name: 'UserPassword'
            });
            break;        
          case 3:
            navigator.push({
              component: UserMoile,
              name: 'UserMoile'
            });
            break;            
          case 4:
            navigator.push({
              component: WebViews,
              name: 'WebViews'
            });
            break;            
          case 5:
            navigator.push({
              component: OtherNetInfo,
              name: 'OtherNetInfo'
            });
            break;        
          case 6:
            navigator.push({
              component: OtherCamera,
              name: 'OtherCamera'
            });
            break;        
          case 7:
            navigator.push({
              component: OtherQrcode,
              name: 'OtherQrcode'
            });
            break;            
          default:
            Storage.delete('userData');
            navigator.resetTo({
                component: Login,
                name: 'Login'
            });
            break;
        }
    }

    userPic(){
        this.drawer.closeDrawer();
        this.setState({selectedTab:'UserInfo'})
    }

    drawerView = ()=>{
        const {patch} = this.props.user.userInfo;
        return(
            <View style={[styles.container, { backgroundColor: '#fcfcfc' }]}>
                <View style={styles.drawerTitleContent} >
                    <TouchableOpacity 
                        onPress={()=>this.userPic()}>
                        <Image style={styles.userImg} source={{uri:IMGADDRESS+patch}}/>
                    </TouchableOpacity>
                    <View>
                      <Text style={styles.drawerTitle}>
                        {this.state.userData.name}
                      </Text>
                      <Text style={styles.drawerTitle}>
                        {this.state.gradeGather[this.state.userData.grade-1]}
                      </Text>
                    </View>  
                </View>
                {
                    this.state.drawerItems.map((el,i)=>
                        <TouchableOpacity 
                            key={i}
                            style={styles.drawerContent}
                            onPress={() => this.onPressDrawerItem(el[2])}>
                                <Image style={styles.drawerIcon} source={el[1]} />
                                <Text style={styles.drawerText}>{el[0]}</Text>
                        </TouchableOpacity>
                    )
                }
            </View>
        )

    }
    
    render() {
        return (
            <DrawerLayout
                ref={(drawer) => { return this.drawer = drawer  }}
                drawerPosition={Platform.OS === 'android' ? DrawerLayoutAndroid.positions.Left : 'left'}
                drawerWidth={Dimensions.get('window').width / 5 * 3}
                renderNavigationView={this.drawerView}
            >
                <TabNavigator>
                    <TabNavigator.Item  
                        title="安全"   
                        selected={this.state.selectedTab === 'courses'}   
                        selectedTitleStyle={styles.selectedTextStyle}
                        titleStyle={styles.textStyle}
                        renderIcon={() => <Image source={require("../../images/unsecurity.png")} style={styles.iconStyle}/>} 
                        renderSelectedIcon={() => <Image source={require("../../images/security.png")} style={styles.iconStyle}/>}  
                        onPress={() => this.setState({ selectedTab: 'courses' })}> 
                        <Courses drawer={this.drawer} {...this.props}/>
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        title="专题"
                        selected={this.state.selectedTab === 'subject'}
                        selectedTitleStyle={styles.selectedTextStyle}
                        titleStyle={styles.textStyle}
                        renderIcon={() => <Image source={require("../../images/unproject.png")} style={styles.iconStyle}/>}
                        renderSelectedIcon={() => <Image source={require("../../images/project.png")} style={styles.iconStyle}/>}
                        onPress={() => this.setState({ selectedTab: 'subject' })}>
                        <Subject drawer={this.drawer} {...this.props}/>
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        title="我的"
                        selected={this.state.selectedTab === 'UserInfo'}
                        selectedTitleStyle={styles.selectedTextStyle}
                        titleStyle={styles.textStyle}
                        renderIcon={() => <Image source={require("../../images/mine.png")} style={styles.iconStyle}/>}
                        renderSelectedIcon={() => <Image source={require("../../images/mined.png")} style={styles.iconStyle}/>}
                        onPress={() => this.setState({ selectedTab: 'UserInfo' })}>
                        <UserInfo drawer={this.drawer} {...this.props}/>
                    </TabNavigator.Item>
                    <TabNavigator.Item
                    //默认跳转课程页
                        title="关于"
                        selected={this.state.selectedTab === 'About'}
                        selectedTitleStyle={styles.selectedTextStyle}
                        titleStyle={styles.textStyle}
                        renderIcon={() => <Image source={require("../../images/prompts.png")} style={styles.iconStyle}/>}
                        renderSelectedIcon={() => <Image source={require("../../images/prompt.png")} style={styles.iconStyle}/>}
                        onPress={() => this.setState({ selectedTab: 'About' })}>
                        <About drawer={this.drawer} {...this.props}/>
                    </TabNavigator.Item>
                </TabNavigator>
            </DrawerLayout>
        );
    }
}

const { height, width } = Dimensions.get('window');

const styles=StyleSheet.create({
   iconStyle:{
       width:26,
       height:26,
   },
   textStyle:{
       color:'#000',
   },
   selectedTextStyle:{
       color:'#33cc93',
   },
    userImg:{ 
        width:70,
        height:70,
        borderRadius:70,
        marginRight:8,
    },
   container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#f4f4f4'
  },
  drawerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd'
  },
  drawerTitleContent: {
    height: 120,
    flexDirection:"row",
    justifyContent:"center",
    alignItems:"center",
    padding: 20,
    backgroundColor: '#66cc66'
  },
  drawerIcon: {
    width: 25,
    height: 25,
    resizeMode:'stretch',
    marginLeft: 5
  },
  drawerTitle: {
    fontSize: 20,
    textAlign: 'left',
    color: '#fcfcfc'
  },
  drawerText: {
    fontSize: 18,
    marginLeft: 15,
    textAlign: 'center',
    color: 'black'
  }
});


function mapStateToProps({user}) {
    return {user}
}

export default connect(mapStateToProps)(Main)

```

这里使用了TabNavigator 底部菜单插件 ，和DrawerLayout 抽屉效果左侧划出 ，引入了所有需要跳转的页面。``` selected={this.state.selectedTab === 'courses'}```的设置为默认跳转courses页面。


#### ```src/containers/Courses/index.js```   
```js
import React, {Component} from 'react';
import {View,Text,Image,InteractionManager,BackAndroid,Modal,StyleSheet,Dimensions,TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';

// 扫一扫
import OtherQrcode from '../Other/Qrcode';

import WebVideo from '../../components/WebVideo'

import Toolbar from '../../components/Toolbar'
import CoursesTab from '../../components/CoursesTab'
import CouresesList from '../../components/CouresesList'
import Loading from '../../components/Loading'
import LoadingView from '../../components/LoadingView'

import {Storage,isNotNullObj,naviGoBack} from '../../tools/common';

const categoryPress = require('../../../images/ic_tab_category.png');
const scan = require('../../../images/scan-b.png');
const { height, width } = Dimensions.get('window');

const toolbarActions = [
  { title: '扫一扫', icon: scan, show: 'always' }
];

class Courses extends Component {
    state = {
        userData : {},
        modalVisible:false,
    }
    componentWillMount(){
        Storage.get('userData').then(ret=>{
            this.setState({userData:ret});
            this.props.dispatch({
                type:'courses/query',
                token:ret.token
            })
        });
    }

    onIconClicked = ()=> {
        this.props.drawer.openDrawer();
    }   

    componentDidMount() {
        BackAndroid.addEventListener('hardwareBackPress', this.goBack);
    }
    componentWillUnmount() {
        BackAndroid.removeEventListener('hardwareBackPress', this.goBack);
    }

    goBack = ()=> {

     if (this.state.modalVisible) {
        this.setState({
          modalVisible: false
        });
        return true;
      } 
      return naviGoBack(this.props.navigator);
    }

    onClose = ()=> {
        this.setState({visible:false});
    }

    setVideoId = ()=>{
        this.setState({modalVisible:false});
        this.props.dispatch({
            type:'courses/set/videoId',
            videoId:null
        })
    }

    getVideoId = (lessonId)=>{
        const {dispatch} = this.props;
        const {token} = this.state.userData;

        dispatch({
            type:'courses/get/videoId',
            token:token,
            lessonId:lessonId
        });    
        this.setState({modalVisible:true})  
    }

    learningLesson = (lessonId)=>{
        const {dispatch,navigator} = this.props;
        const {token,grade} = this.state.userData;

        dispatch({
            type:'courses/learning',
            token,
            grade,
            lessonId,
            navigator
        });  
    }

    onActionSelected = ()=>{
        this.props.navigator.push({
          component: OtherQrcode,
          name: 'OtherQrcode'
        });
    }

    render() {
        const {courses,dispatch,navigator} = this.props;
        return (
            <View>
               <Toolbar
                    navigator = {navigator}
                    onIconClicked={this.onIconClicked}
                    title = "安全"
                    leftIcon = {categoryPress}
                    actions={toolbarActions}
                    onActionSelected={this.onActionSelected}
                />
                <CoursesTab dispatch={dispatch} coursesState={courses.coursesState} />
                {isNotNullObj(courses.items) ?
                    <CouresesList 
                        courses={courses}
                        getVideoId={this.getVideoId}
                        learningLesson={this.learningLesson}
                    />
                    :
                    <LoadingView />
                }
                <Modal
                  animationType={"fade"}
                  transparent={true}
                  visible={this.state.modalVisible}
                  onRequestClose={this.setVideoId}
                  >

                    {courses.videoId != null &&
                        <View style={CoursesStyles.spinner}>
                           <TouchableOpacity 
                                style={CoursesStyles.backOpacity}
                                onPress={this.setVideoId} >
                                <Image style={CoursesStyles.back} source={require('../../../images/close.png')}/>
                           </TouchableOpacity>
                           <WebVideo videoId={courses.videoId}/>
                        </View>
                    }

                </Modal>
                <Loading visible={courses.visible} />
            </View>
        )
    }
}


const CoursesStyles = StyleSheet.create({
    spinner: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.65)'
    },
    backOpacity:{
        width:width,
        backgroundColor: '#fff',
        height:25,
        flexDirection:"row-reverse",
    },
    back:{
        width:25,
        height:25,
        resizeMode:'stretch',
        marginRight:12,
    }
});


function mapStateToProps({courses}) {
    return {courses}
}
export default connect(mapStateToProps)(Courses)
```

和react不同之处在  html标签不一样  ```react-native```使用请看官网组件库

开发流程请先了解[web端react](https://github.com/flyjennyetn/react)。


##links

[react-native](https://github.com/flyjennyetn/react-native)

[react](https://github.com/flyjennyetn/react)

[wechat-react](https://github.com/flyjennyetn/wechat)


##贡献者

[北京天融互联科技有限公司](http://www.e-tianrong.com/)

[flyjennyetn](https://github.com/flyjennyetn)

[荣倩倩](rongqianqian@e-tianrong.com)



##开源协议

本项目依据MIT开源协议发布，允许任何组织和个人免费使用。