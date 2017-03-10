/**
 * Created by flyjennyetn on 2016-10-24.
 */
import React,{Component} from 'react';
import {View,Text,TextInput,Image,StyleSheet,Dimensions,ScrollView} from 'react-native';
import {connect} from 'react-redux';
import {Actions} from "react-native-router-flux";
import UserRecovered from '../User/Recovered';

import Button from '../../components/Button';

const inputLine = require('../../../images/pwdBack_line.png');

class Login extends Component {

    state = {
        name:'',
        password:''
    }

    userVerify = ()=>{
        const {dispatch} = this.props;
        const userData = this.state;
        if(userData.name == ""){
            alert("用户名不能为空");
            return;
        }
        if(userData.password == ""){
            alert("密码不能为空");
            return;
        }
        dispatch({
            type:'login/query',
            userData
        })
    }

    recovered = ()=>{
        Actions.userRecovered()
    }

    render() {
        const {dispatch} = this.props;
        return (
            <View style={LoginStyles.login}>

                <Text style={LoginStyles.loginText} >
                    登录青少年第一人
                </Text>
                <View style={LoginStyles.content}>
                    <View style={LoginStyles.item}>
                        <Text style={LoginStyles.span}>用户名</Text>
                        <TextInput 
                            placeholder="请输入用户名"
                            placeholderTextColor="#aaaaaa"
                            underlineColorAndroid="transparent"
                            style={LoginStyles.input} onChangeText={(value) => this.setState({name:value})}/>
                            <Image source={inputLine} />
                    </View>
                    <View style={LoginStyles.item}>
                        <Text style={LoginStyles.span}>密码</Text>
                        <TextInput 
                            placeholder="请输入密码"
                            placeholderTextColor="#aaaaaa"
                            underlineColorAndroid="transparent"
                            secureTextEntry={true}
                            style={LoginStyles.input} 
                            onChangeText={(value) => this.setState({password:value})} />
                            <Image source={inputLine} />
                    </View>
                </View>
                <View style={LoginStyles.content1}>
                    <Button
                        text="登录"
                        onPress={()=>this.userVerify()}
                        containerStyle={LoginStyles.button}
                        style={LoginStyles.a}
                    />
                    <Button
                        text="忘记密码"
                        onPress={this.recovered}
                        containerStyle={LoginStyles.content2}
                        style={LoginStyles.pwdBack}
                    />
                </View>
            </View>
        )
    }

}

const { height, width } = Dimensions.get('window');
const LoginStyles = StyleSheet.create({
  login :{
    backgroundColor: '#f4f4f4',
    height:height,
    paddingTop: 25,
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
    paddingTop: 15
    // paddingBottom: 1
  },
  span:{
    width: 60,
    height: 36,
    textAlign: 'left',
    fontSize: 18,
    color: '#a9a9a9'
  },
  input:{
    flexGrow: 1,
    height: 45,
    fontSize: 18,
    color: '#000000'
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
    flexDirection:"row",
    justifyContent:"center",
    alignItems:"center"
  },
  a:{
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

function mapStateToProps(login) {
    return {login}
}

export default connect(mapStateToProps)(Login)
