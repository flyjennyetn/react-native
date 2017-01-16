/**
 * Created by flyjennyetn on 2016-11-02.
 */
import React, {Component} from 'react'
import {View,Text,Image,StyleSheet,Dimensions,Platform,ScrollView,TouchableOpacity} from 'react-native';
import {connect} from 'react-redux'
import ImagePicker from 'react-native-image-picker';

import UserContact from './Contact';

import Toolbar from '../../components/Toolbar'
import Button from '../../components/Button';
import Loading from '../../components/Loading'
import LoadingView from '../../components/LoadingView'
import {IPLOCATION,IMGADDRESS} from '../../utils/config';
import {Storage,isNotNullObj,toastShort} from '../../utils/common';
const categoryPress = require('../../../images/ic_tab_category.png');


class UserInfo extends Component {
    state = {
        visible:false,
        imgSource:null
    }

    componentWillMount(){
        Storage.get('userData').then(ret=>{
            this.props.dispatch({
                type:'user/query/pci',
                token:ret.token
            })
        })
    }

    changeFace = ()=>{
        let that = this;
        const options = {
            title: '选择头像',
            cancelButtonTitle: '取消',
            takePhotoButtonTitle: '拍照',
            chooseFromLibraryButtonTitle: '从相册选取',
            maxWidth: 100,
            maxHeight: 100,
            quality: 0.2, //很重要，不设置会导致app很卡
        };

       ImagePicker.showImagePicker(options, (response) => {
          // that.setState({visible:true})
          if (response.didCancel) {
                toastShort('用户取消图片选择器');
          }else if (response.error) {
                toastShort(response.error);
          // }else if (response.customButton) {
          //   console.log('用户利用自定义按钮: ', response.customButton);
          }else {
          //   const source = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true};
            if (Platform.OS === 'ios') {
                that.setState({imgSource:response.uri.replace('file://', '')})
            } else {
                that.setState({imgSource:response.uri})
            }
            // that.setState({visible:false})
          }
        });
    }

    contacts = ()=>{
        this.props.navigator.push({
          component: UserContact,
          name: 'UserContact'
        });
    }

    onIconClicked = ()=> {
        this.props.drawer.openDrawer();
    }   

    render() {
        const {patch,stuname,gendercode,schoolarea,school,stugrade,stuclassname} = this.props.user.userInfo;
        return (
            <View>
                <Toolbar
                    navigator = {this.props.navigator}
                    onIconClicked={this.onIconClicked}
                    title = "我的"
                    leftIcon = {categoryPress}
                />
                <ScrollView
                    style={UserInfoStyles.scroll}
                >
                    {isNotNullObj(stuname) ?
                    <View style={UserInfoStyles.userBasMsg} >
                        <View style={UserInfoStyles.img}>
                            <TouchableOpacity onPress={this.changeFace}>
                                {this.state.imgSource == null? 
                                    <Image style={UserInfoStyles.userImg} source={{uri:IMGADDRESS+patch}}/>
                                    :
                                    <Image style={UserInfoStyles.userImg} source={{uri:this.state.imgSource}}/>
                                }
                            </TouchableOpacity>
                        </View>
                        <View style={UserInfoStyles.li}>
                            <Text style={UserInfoStyles.text}>姓名</Text>
                            <Text style={UserInfoStyles.text}>{stuname}</Text>
                        </View>
                        <View style={UserInfoStyles.li}>
                            <Text style={UserInfoStyles.text}>性别</Text>
                            <Text style={UserInfoStyles.text}>
                                {gendercode == 'M' ? '男' : '女'}
                            </Text>
                        </View>
                        <View style={UserInfoStyles.li}>
                            <Text style={UserInfoStyles.text}>所在地</Text>
                            <Text style={UserInfoStyles.text}>{schoolarea}</Text>
                        </View>
                        <View style={UserInfoStyles.li}>
                            <Text style={UserInfoStyles.text}>学校</Text>
                            <Text style={UserInfoStyles.text}>{school}</Text>
                        </View>
                        <View style={UserInfoStyles.li}>
                            <Text style={UserInfoStyles.text}>年级</Text>
                            <Text style={UserInfoStyles.text}>{stugrade}</Text>
                        </View>
                        <View style={UserInfoStyles.li}>
                            <Text style={UserInfoStyles.text}>班级</Text>
                            <Text style={UserInfoStyles.text}>{stuclassname}</Text>
                        </View>
                        <View style={UserInfoStyles.bottomCon}>
                            <Image style={UserInfoStyles.Msg_icon} source={require('../../../images/userBasMsg_icon.png')}/>
                            <Text>如果需要修改个人资料，</Text>
                            <Button
                                text="联系我们!"
                                onPress={this.contacts}
                                containerStyle={UserInfoStyles.container}
                                style={UserInfoStyles.button}
                            />
                        </View>
                    </View>
                    :
                        <LoadingView />
                    }

                    <Loading
                        visible={this.state.visible}
                    />
                </ScrollView>
            </View>
        )
    }
}

const { height, width } = Dimensions.get('window');
const UserInfoStyles = StyleSheet.create({
    userBasMsg:{
        width:width,
        padding:20,
    },
    scroll:{
        height:height-70
    },
    img:{
        flexDirection:"row",
        justifyContent:"center",
        paddingTop:20,
        marginBottom:30,
    },
    userImg:{ 
        width:100,
        height:100,
        borderRadius:100,
    },
    li:{
        flexDirection:"row",
        justifyContent:"space-between",
        paddingTop:15,
        paddingBottom:15,
        borderBottomColor:'#DDDDDD',
        borderBottomWidth:1,
    },
    text:{
        fontSize: 20
    },
    bottomCon:{
        width:width,
        flexDirection:"row",
        paddingTop:30,
    },
    Msg_icon:{
        width:20,
        height:20,
        resizeMode:'stretch'
    },
    container:{},
    button:{
        fontSize: 12,
        color: "#0000FF"
    }
});



function mapStateToProps({user}) {
    return {user}
}

export default connect(mapStateToProps)(UserInfo)