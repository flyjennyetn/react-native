/**
 * Created by flyjennyetn on 2016-11-02.
 */
import React, {Component, PropTypes} from 'react'
import {View,Text,Image,StyleSheet,Dimensions,ScrollView,TextInput,BackAndroid} from 'react-native';
import {connect} from 'react-redux'
import {Actions} from "react-native-router-flux";
import UserRecovered from './Recovered';
import Toolbar from '../../components/Toolbar'
import Button from '../../components/Button';
import {Storage,toastShort,naviGoBack} from '../../utils/common';

const inputLine = require('../../../images/pwdBack_line.png');

class UserPassword extends Component {

    state = {
        oldPwd:'',
        newPwd:'',
        affirmPwd:''
    }

    componentDidMount() {
        BackAndroid.addEventListener('hardwareBackPress', this.goBack);
    }
    componentWillUnmount() {
      BackAndroid.removeEventListener('hardwareBackPress', this.goBack);
    }

    goBack = ()=> {
      return naviGoBack();
    }

    confirm = ()=>{
        const {oldPwd,newPwd,affirmPwd} = this.state;
        if(oldPwd == ""){
            toastShort('旧密码不能为空', true);
            return false;
        }
        if(newPwd == ""){
            toastShort('新密码不能为空', true);
            return;
        }
        if(affirmPwd != newPwd){
            toastShort('确认密码和新密码不一致', true);
            return;
        }
        this.setState({oldPwd:'',newPwd:'',affirmPwd:''})
        Storage.get('userData').then(ret=>{
            this.props.dispatch({
                type:'user/pwd/edit',
                token:ret.token,
                oldPwd:this.state.oldPwd,
                newPwd:this.state.newPwd,
            })
        });
    }

    recovered = ()=>{
        Actions.userRecovered()

    }
    render() {
        return (
            <View style={UserPasswordStyle.login}>
                <Toolbar
                    title = "修改密码"
                />
                <View style={UserPasswordStyle.content}>
                    <View style={UserPasswordStyle.item}>
                        <Text style={UserPasswordStyle.span}>原始密码</Text>
                        <TextInput 
                            placeholder="请输入原始密码"
                            placeholderTextColor="#aaaaaa"
                            underlineColorAndroid="transparent"
                            secureTextEntry={true}
                            style={UserPasswordStyle.input} 
                            onChangeText={(value) => this.setState({oldPwd:value})} />
                            <Image style={UserPasswordStyle.inputLine} source={inputLine} />
                    </View>                    
                    <View style={UserPasswordStyle.item}>
                        <Text style={UserPasswordStyle.span}>新密码</Text>
                        <TextInput 
                            placeholder="请输入新密码"
                            placeholderTextColor="#aaaaaa"
                            underlineColorAndroid="transparent"
                            secureTextEntry={true}
                            style={UserPasswordStyle.input} 
                            onChangeText={(value) => this.setState({newPwd:value})} />
                            <Image style={UserPasswordStyle.inputLine} source={inputLine} />
                    </View>                    
                    <View style={UserPasswordStyle.item}>
                        <Text style={UserPasswordStyle.span}>确认新密码</Text>
                        <TextInput 
                            placeholder="请输入确认新密码"
                            placeholderTextColor="#aaaaaa"
                            underlineColorAndroid="transparent"
                            secureTextEntry={true}
                            style={UserPasswordStyle.input} 
                            onChangeText={(value) => this.setState({affirmPwd:value})} />
                            <Image style={UserPasswordStyle.inputLine}  source={inputLine} />
                    </View>
                </View>
                <View style={UserPasswordStyle.content1}>
                    <Button
                        text="确认修改"
                        onPress={this.confirm}
                        containerStyle={UserPasswordStyle.button}
                        style={UserPasswordStyle.a}
                    />
                    <Button
                        text="忘记密码"
                        onPress={this.recovered}
                        containerStyle={UserPasswordStyle.content2}
                        style={UserPasswordStyle.pwdBack}
                    />
                </View>
            </View>
        )
    }
}

const { height, width } = Dimensions.get('window');
const UserPasswordStyle = StyleSheet.create({
  login :{
    backgroundColor: '#f4f4f4',
    height:height,
  },
  loginText:{
    paddingTop: 35,
    paddingBottom: 55,
    textAlign: 'center',
    fontSize: 24
  },
  content:{
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 25,
    backgroundColor: '#fff',
  },
  item:{
    width: width,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems:'flex-end',
    paddingTop: 15,
    paddingBottom: 5
  },
  span:{
    width: 120,
    height: 36,
    textAlign: 'left',
    fontSize: 18,
    color: '#a9a9a9'
  },
  input:{
    width: width*0.6,
    height: 45,
    fontSize: 18,
    color: '#000000',
    borderColor:"#ddd",
    borderWidth:1,
  },
  inputLine:{
    marginTop:8,
  },
  content1:{
    flexGrow: 1,
    alignItems: 'center',
    flexDirection:'column',
    paddingTop: 45
  },
  button:{
    width: width*0.8,
    height: 50,
    borderRadius: 20,
    backgroundColor: '#66cc66',
  },
  a:{
    paddingTop: 10,
    textAlign: 'center',
    fontSize: 18,
    color: '#fff'
  },
  content2:{
  },
  pwdBack:{
    paddingTop: 25,
    marginLeft:width*0.7,
    fontSize: 16,
    color:'#0000ff',
    textDecorationLine:'underline'
  }
});

function mapStateToProps({user}) {
    return {user}
}

export default connect(mapStateToProps)(UserPassword)