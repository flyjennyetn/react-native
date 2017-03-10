/**
 * Created by flyjennyetn on 2016-11-02.
 */
import React, {Component, PropTypes} from 'react'
import {View,Text,Image,StyleSheet,Dimensions,ScrollView,TextInput,Picker,BackAndroid} from 'react-native';
import {connect} from 'react-redux'
import Toolbar from '../../components/Toolbar'
import Button from '../../components/Button';
import {Storage,toastShort,naviGoBack} from '../../utils/common';

const inputLine = require('../../../images/pwdBack_line.png');

class UserRecovered extends Component {

    state = {
        name:'',
        sex:0,
        gradeNum:0,
        classNum:'',
        stuCode:''
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
        if(this.state.name == ''){
            toastShort('姓名不能为空或格式错误', 1);
            return false;
        }
        if(this.state.sex == 0){
            toastShort('请选择性别', 1);
            return false;
        }
        if(this.state.gradeNum == 0){
            toastShort('请选择年级', 1);
            return false;
        }
        if(this.state.classNum == ''){
            toastShort('班级不能为空', 1);
            return false;
        }        
        if(this.state.stuCode == ''){
            toastShort('学籍号不能为空', 1);
            return false;
        }
        this.props.dispatch({
            type:'user/recovered/pwd',
            ...this.state
        })
    }

    render() {
        return (
            <View style={UserRecoveredStyle.login}>
                <Toolbar
                    title = "找回密码"
                />
                 <View style={UserRecoveredStyle.content}>
                    <View style={UserRecoveredStyle.item}>
                        <Text style={UserRecoveredStyle.span}>姓名</Text>
                        <TextInput 
                            placeholder=""
                            placeholderTextColor="#aaaaaa"
                            underlineColorAndroid="transparent"
                            style={UserRecoveredStyle.input} 
                            onChangeText={(value) => this.setState({name:value})} />
                            <Image style={UserRecoveredStyle.inputLine} source={inputLine} />
                    </View>                    
                    <View style={UserRecoveredStyle.item}>
                        <Text style={UserRecoveredStyle.span}>性别</Text>
                        <Picker
                          mode="dropdown"
                          style={UserRecoveredStyle.input} 
                          selectedValue={this.state.sex}
                          onValueChange={(itemValue) => this.setState({sex: itemValue})}>
                          <Picker.Item value="0" label="请选择" />
                          <Picker.Item value="M" label="男" />
                          <Picker.Item value="F" label="女" />
                        </Picker>
                        <Image style={UserRecoveredStyle.inputLine} source={inputLine} />
                    </View>                     
                    <View style={UserRecoveredStyle.item}>
                        <Text style={UserRecoveredStyle.span}>年级</Text>
                        <Picker
                          mode="dropdown"
                          style={UserRecoveredStyle.input} 
                          selectedValue={this.state.gradeNum}
                          onValueChange={(itemValue) => this.setState({gradeNum: itemValue})}>
                          <Picker.Item value="0" label="请选择" />
                          <Picker.Item value="1" label="一年级" />
                          <Picker.Item value="2" label="二年级" />
                          <Picker.Item value="3" label="三年级" />
                          <Picker.Item value="4" label="四年级" />
                          <Picker.Item value="5" label="五年级" />
                          <Picker.Item value="6" label="六年级" />
                          <Picker.Item value="7" label="七年级" />
                          <Picker.Item value="8" label="八年级" />
                          <Picker.Item value="9" label="九年级" />
                          <Picker.Item value="10" label="十年级" />
                          <Picker.Item value="11" label="十一年级" />
                          <Picker.Item value="12" label="十二年级" />
                        </Picker>
                        <Image style={UserRecoveredStyle.inputLine} source={inputLine} />
                    </View>                    
                    <View style={UserRecoveredStyle.item}>
                        <Text style={UserRecoveredStyle.span}>班级</Text>
                        <TextInput 
                            placeholder="例如：1"
                            placeholderTextColor="#aaaaaa"
                            underlineColorAndroid="transparent"
                            style={UserRecoveredStyle.input} 
                            onChangeText={(value) => this.setState({classNum:value})} />
                            <Image style={UserRecoveredStyle.inputLine} source={inputLine} />
                    </View>                      
                    <View style={UserRecoveredStyle.item}>
                        <Text style={UserRecoveredStyle.span}>学籍号</Text>
                        <TextInput 
                            placeholder=""
                            placeholderTextColor="#aaaaaa"
                            underlineColorAndroid="transparent"
                            style={UserRecoveredStyle.input} 
                            onChangeText={(value) => this.setState({stuCode:value})} />
                            <Image style={UserRecoveredStyle.inputLine} source={inputLine} />
                    </View>    
                </View>
                <View style={UserRecoveredStyle.content1}>
                    <Button
                        text="初始化密码"
                        onPress={()=>this.confirm()}
                        containerStyle={UserRecoveredStyle.button}
                        style={UserRecoveredStyle.a}
                    />
                </View>
            </View>
        )
    }
}


const { height, width } = Dimensions.get('window');
const UserRecoveredStyle = StyleSheet.create({
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
    // color: '#000000',
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
  }

});


function mapStateToProps({user}) {
    return {user}
}

export default connect(mapStateToProps)(UserRecovered)
