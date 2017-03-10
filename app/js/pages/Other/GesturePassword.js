/**
 * Created by flyjennyetn on 2016-10-24.
 */
import React, {Component} from 'react';
import {AppRegistry,BackAndroid} from 'react-native';

import PasswordGesture from 'react-native-gesture-password';

import {naviGoBack} from '../../utils/common';

let Password1 = '';
class GesturePassword extends Component {


    state = {
        status:'normal',
        message:'请你输入密码'
    }

    componentDidMount() {
      BackAndroid.addEventListener('hardwareBackPress', this.goBack);
    }

    componentWillUnmount() {
      BackAndroid.removeEventListener('hardwareBackPress', this.goBack);
    }

    goBack=()=>{
      if (this.state.status == 'right') {
        return naviGoBack();
      } else {
        return true;
      }
    }

    // 示例检查密码
    onEnd=(password)=>{
        if (password == '123') {
            this.setState({
                status: 'right',
                message: '密码是正确的,成功的'
            },()=>naviGoBack());
        } else {
            this.setState({
                status: 'wrong',
                message: '密码是错误的,再试一次.'
            });
        }
    }
    onStart=()=> {
        this.setState({
            status: 'normal',
            message: '请你输入密码.'
        });
    }
    onReset=()=> {
        this.setState({
            status: 'normal',
            message: '请输入您的密码(再一次).'
        });
    }
    // 示例设置密码
    /*
    onEnd=(password)=>{
        if ( Password1 === '' ) {
            // The first password
            Password1 = password;
            this.setState({
                status: 'normal',
                message: '其次请输入你的密码.'
            });
        } else {
            // The second password
            if ( password === Password1 ) {
                this.setState({
                    status: 'right',
                    message: '你的密码设置为'' + password
                });

                Password1 = '';
                // your codes to close this view
            } else {
                this.setState({
                    status: 'wrong',
                    message:  '不一样的,再试一次.'
                });
            }
        }
    }
    onStart=()=> {
        if ( Password1 === '') {
            this.setState({
                message: '请你输入密码.'
            });
        } else {
            this.setState({
                message: '其次请输入你的密码.'
            });
        }
    }
    */
    render=()=> {
        return (
            <PasswordGesture
                ref='pg'
                status={this.state.status}
                message={this.state.message}
                onStart={() => this.onStart()}
                onEnd={(password) => this.onEnd(password)}
                />
        );
    }
}

export default GesturePassword