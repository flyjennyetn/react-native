/**
 * Created by flyjennyetn on 2016-11-02.
 */
import React, {Component, PropTypes} from 'react'
import {View,Text,StyleSheet,Dimensions,TextInput,InteractionManager,BackAndroid} from 'react-native';
import {connect} from 'react-redux'
import Toolbar from '../../components/Toolbar'
import Button from '../../components/Button';
import Loading from '../../components/Loading';

import {Storage,toastShort,naviGoBack} from '../../tools/common';

class UserMoile extends Component {
    state = {
        isMobile:'',
        isAnew:false,
        mobile:'',
        newMobile:'',
        oldMobile:'',
        code:'',
        num:60,
    }

    componentWillMount(){
        const {mobile} = this.props.user.userInfo;
        this.setMobile(mobile);
    }

    componentDidMount() {
        BackAndroid.addEventListener('hardwareBackPress', this.goBack);
    }

    componentWillUnmount() {
      BackAndroid.removeEventListener('hardwareBackPress', this.goBack);
    }

    goBack = ()=> {
      return naviGoBack(this.props.navigator);
    }

    setMobile = (mobile)=>{
        this.setState({
            isMobile : mobile == '' ? false : true,
            isAnew: mobile == '' ? true : false,
            mobile : mobile
        });
    }

    verifyMobile = (mobile)=> {
        let mobiles = /^1[3|5|8]\d{9}$/;
        if (!mobiles.test(mobile)) {
            toastShort('手机号不能为空或格式不正确',1);
            return false;
        }
        return true;
    }

    getCode = ()=>{
        const {newMobile,num} = this.state;
        if(this.verifyMobile(newMobile)){
            Storage.get('userData').then(ret=>{

                this.props.dispatch({
                    type:'user/moile/code',
                    token:ret.token,
                    mobile:newMobile
                })
                if(this.props.user.count){
                    InteractionManager.runAfterInteractions(() => {    
                        let time = 60;
                        let timer = setInterval(() => {
                            if(time < 1){
                                this.props.dispatch({
                                    type:'user/set/count',
                                    count:false,
                                })
                                this.setState({num :60});
                                clearInterval(timer);
                            }else{
                                this.setState({num :--time});
                            }
                        }, 1000);
                    });

                }
            });
        }
    }

    confirm = ()=>{
        const {isAnew,code,newMobile,oldMobile} = this.state;
        if(isAnew){
            var verifyCode = /[\d]{4}/;
            if(!this.verifyMobile(newMobile)){
                return;
            }
            if (!verifyCode.test(code)) {
                toastShort('验证码不能为空或不正确',1);
                return;
            }

            this.props.dispatch({
                type:'user/moile/visible',
                visible:true,
            })
            Storage.get('userData').then(ret=>{
                this.props.dispatch({
                    type:'user/moile/set',
                    token:ret.token,
                    newMobile,
                    oldMobile,
                    code
                })
            });
        }else{
            this.setState({isAnew:true});
        }
    }


    componentWillUpdate(nextProps,nextState){
        const {mobile} = nextProps.user.userInfo;
        const {isMobile,isAnew} = this.state;
        if(mobile == nextState.newMobile && !isMobile && isAnew){
            this.setLoginName(mobile);
        }
    }

    render() {
        const {isMobile,isAnew,mobile,visible,num} = this.state;
        const {count} = this.props.user;
        return (
            <View>
                <Toolbar
                    navigator = {this.props.navigator}
                    title = "绑定手机"
                />

                <View style={UserMoileStyles.loginAcc}>
                    <Text style={UserMoileStyles.accountTitle}>手机号</Text>
                    {
                        isMobile &&
                        <View style={UserMoileStyles.ViewButton}>
                            <Text style={UserMoileStyles.loginHintMsg}>已绑定：{mobile}</Text>
                        </View>
                    }
                    {
                        isMobile && isAnew &&
                        <View style={UserMoileStyles.defineUser}>
                            <Text style={UserMoileStyles.setted}>旧手机号：</Text>
                            <TextInput 
                                placeholder=""
                                placeholderTextColor="#aaaaaa"
                                underlineColorAndroid="transparent"
                                style={UserMoileStyles.input} 
                                onChangeText={(value) => this.setState({oldMobile:value})} />
                        </View>  
                    }  
                   
                    {
                        isAnew &&
                        <View style={UserMoileStyles.defineUser}>
                            <Text style={UserMoileStyles.setted}>{ isMobile && '新'}手机号：</Text>
                            <TextInput 
                                placeholder=""
                                placeholderTextColor="#aaaaaa"
                                underlineColorAndroid="transparent"
                                style={UserMoileStyles.input} 
                                onChangeText={(value) => this.setState({newMobile:value})} />
                                {
                                    count ?
                                    <Text style={UserMoileStyles.loginHintMsg}>{num}</Text>
                                    :
                                    <Button
                                        text="获取验证码"
                                        onPress={()=>this.getCode()}
                                        containerStyle={UserMoileStyles.containerCode}
                                        style={UserMoileStyles.buttonCode}
                                    />
                                }
                        </View> 
                    }
                    {
                    isAnew &&
                    <View style={UserMoileStyles.defineUser}>
                        <Text style={UserMoileStyles.setted}>验证码：</Text>
                        <TextInput 
                            placeholder=""
                            placeholderTextColor="#aaaaaa"
                            underlineColorAndroid="transparent"
                            style={UserMoileStyles.input} 
                            onChangeText={(value) => this.setState({code:value})} />
                    </View>
                    }
                    <View style={UserMoileStyles.ViewButton}>
                        <Button
                            text={isAnew ? "绑定" : "重新绑定"}
                            onPress={()=>this.confirm()}
                            containerStyle={UserMoileStyles.container}
                            style={UserMoileStyles.button}
                        />
                    </View>
                </View>
                <Loading visible={visible}/>
            </View>
        )
    }
}


const { height, width } = Dimensions.get('window');
const UserMoileStyles = StyleSheet.create({
    loginAcc:{
        padding: 20,
        backgroundColor:"#f4f4f4",
        height: height,
    },
    accountTitle:{
        fontSize:24,
        height:50,
    },
    defineUser:{
        flexDirection: "row", 
        flexWrap:"wrap",
        alignItems:"center",
        paddingLeft:15,
        paddingTop:10,
        paddingBottom:10,
    },
    setted:{
        fontSize:18
    },
    input:{
        width:width*0.45,
        height:38,
        backgroundColor:"#fff",
    },
    loginHintMsg:{
        color:"red",
        fontSize:12
    },
    ViewButton:{
        flexDirection: "row", 
        justifyContent:"center",
        paddingTop:10,
    },
    containerCode:{
        marginLeft:15,
    },
    buttonCode:{
        color:"#0000ff",
        fontSize:12
    },
    container:{
        flexDirection: "row", 
        backgroundColor:"#66cc66",
        justifyContent:"center",
        alignItems:"center",
        width:120,
        height:38,
    },
    button:{
        color:"#fff",
        fontSize:14
    }
});


function mapStateToProps({user}) {
    return {user}
}

export default connect(mapStateToProps)(UserMoile)