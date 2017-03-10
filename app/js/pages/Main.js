/**
 * Created by flyjennyetn on 2016-10-24.
 */
'use strict';
import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Platform,
  Dimensions,
  DrawerLayoutAndroid,
  AppState
} from 'react-native';
import {connect} from 'react-redux'
import JPushModule from 'jpush-react-native';
import TabNavigator from 'react-native-tab-navigator';
import DrawerLayout from 'react-native-drawer-layout';
import {Actions} from "react-native-router-flux";

import Courses from './Courses/';
import Subject from './Subject/';
import UserInfo from './User/Info';
import About from './About/About';

import {Storage} from '../utils/common';
import {IMGADDRESS} from '../utils/config';



const changeMsg = require('../../images/changeMsg.png');
const lock = require('../../images/lock.png');
const mobile = require('../../images/mobile.png');
const back = require('../../images/closeVideo.png');
const discoverFill = require('../../images/discover_fill.png');
const wifi = require('../../images/wifi.png');
const camera = require('../../images/ic_photo_camera_36pt.png');
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

        	Actions.activity({
                activityNum:data.id
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
        	Actions.gesturePassword({
	          component: GesturePassword,
	          name: 'GesturePassword'
	        });
        }
    }

	onPressDrawerItem(index) {
	    this.drawer.closeDrawer();
	    switch (index) {
	      case 1:
	      	Actions.userAccount();
	        break;
	      case 2:
	      	Actions.userPassword();
	        break;	      
	      case 3:
	        Actions.userMoile();
	        break;		      
	      case 4:
	      	Actions.webViews();
	        break;	 	      
	      case 5:
	      	Actions.otherNetInfo();
	        break;	      
	      case 6:
	      	Actions.otherCamera();
	        break;	      
	      case 7:
	      	Actions.otherQrcode();
	        break;		      
	      default:
	      	Storage.delete('userData');
	      	Actions.login();
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
    flexGrow: 1,
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

