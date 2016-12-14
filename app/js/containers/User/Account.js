/**
 * Created by flyjennyetn on 2016-11-02.
 */
import React, {Component, PropTypes} from 'react'
import {View,Text,StyleSheet,Dimensions,TextInput,BackAndroid} from 'react-native';
import {connect} from 'react-redux'
import Toolbar from '../../components/Toolbar'
import Button from '../../components/Button';
import {Storage,toastShort,naviGoBack} from '../../tools/common';

class UserAccount extends Component {
    state = {
        isName:false,
        loginName:"",
    }

    componentWillMount(){
        const {loginName} = this.props.user.userInfo;
        this.setLoginName(loginName);
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

    setLoginName = (loginName)=>{
        this.setState({
            isName : loginName == '' ? false : true,
            loginName : loginName
        });
    }

    changeUserName = ()=>{
        const {isName,loginName} = this.state;
        if(isName){
            this.setState({isName:false,loginName:''}); 
        }else{
            if(loginName == ''){
                toastShort("登录账号不能为空",true);
                return;
            }
            Storage.get('userData').then(ret=>{
                this.props.dispatch({
                    type:'user/account/edit',
                    token:ret.token,
                    newUserName:loginName
                })
            });
        }
    }

    componentWillUpdate(nextProps,nextState){
        const {loginName} = nextProps.user.userInfo;
        const {isName} = this.state;
        if(loginName == nextState.loginName && !isName){
            this.setLoginName(loginName);
        }
    }

    render() {
        const {isName,loginName} = this.state;
        return (
            <View>
                <Toolbar
                    navigator = {this.props.navigator}
                    title = "修改账户"
                />
                <View style={UserAccountStyles.loginAcc}>
                    <Text style={UserAccountStyles.accountTitle}>登陆账号</Text>
                    <View style={UserAccountStyles.defineUser}>
                        <Text style={UserAccountStyles.setted}>自定义登陆账号：</Text>
                        {
                            isName ?
                            <Text>{loginName}</Text>
                            :
                            <TextInput 
                                placeholder=""
                                placeholderTextColor="#aaaaaa"
                                underlineColorAndroid="transparent"
                                style={UserAccountStyles.input} 
                                onChangeText={(value) => this.setState({loginName:value})} />
                        }
                        <Text style={UserAccountStyles.loginHintMsg}>请设置6-15位的字母、数字、或组合的账户名</Text>
                    </View>
                    <View style={UserAccountStyles.ViewButton}>
                        <Button
                            text={isName ? "重新设置" : "保存"}
                            onPress={()=>this.changeUserName()}
                            containerStyle={UserAccountStyles.container}
                            style={UserAccountStyles.button}
                        />
                    </View>
                </View>
            </View>
        )
    }
}


const { height, width } = Dimensions.get('window');
const UserAccountStyles = StyleSheet.create({
    loginAcc:{
        padding: 20,
        backgroundColor:"#f4f4f4",
        height:height
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
    },
    setted:{
        fontSize:18
    },
    input:{
        width:width*0.5,
        height:38,
        backgroundColor:"#fff",
    },
    loginHintMsg:{
        paddingTop:10,
        color:"red",
        fontSize:12
    },
    ViewButton:{
        flexDirection: "row", 
        justifyContent:"center",
        paddingTop:20,
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

export default connect(mapStateToProps)(UserAccount)