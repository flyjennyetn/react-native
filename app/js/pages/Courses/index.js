/**
 * Created by flyjennyetn on 2016-11-02.
 */
import React, {Component} from 'react';
import {View,Text,Image,InteractionManager,BackAndroid,Modal,StyleSheet,Dimensions,TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {Actions} from "react-native-router-flux";
// 扫一扫
import OtherQrcode from '../Other/Qrcode';

import WebVideo from '../../components/WebVideo'

import Toolbar from '../../components/Toolbar'
import CoursesTab from '../../components/CoursesTab'
import CouresesList from '../../components/CouresesList'
import Loading from '../../components/Loading'
import LoadingView from '../../components/LoadingView'

import {Storage,isNotNullObj,naviGoBack} from '../../utils/common';

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
      return naviGoBack();
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
        const {dispatch} = this.props;
        const {token,grade} = this.state.userData;

        dispatch({
            type:'courses/learning',
            token,
            grade,
            lessonId
        });  
    }

    onActionSelected = ()=>{
        Actions.otherQrcode()
    }

    render() {
        const {courses,dispatch} = this.props;
        return (
            <View>
               <Toolbar
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
        flexGrow: 1,
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