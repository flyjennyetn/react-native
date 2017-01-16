/**
 * Created by flyjennyetn on 2016-11-02.
 */
import React, {Component, PropTypes} from 'react'
import {View,Text,Image,StyleSheet,Dimensions,TextInput,BackAndroid} from 'react-native';
import {connect} from 'react-redux'
import Toolbar from '../../components/Toolbar'
import {toastShort,naviGoBack} from '../../utils/common';

const trueImg = require('../../../images/check.png');
const toolbarActions = [
  { title: '分享', icon: trueImg, show: 'always' }
];
let feedbackText;

class UserContact extends Component {

    componentDidMount() {
        feedbackText = '';
        BackAndroid.addEventListener('hardwareBackPress', this.goBack);

    }

    componentWillUnmount() {
      BackAndroid.removeEventListener('hardwareBackPress', this.goBack);
    }

    goBack = ()=> {
      return naviGoBack(this.props.navigator);
    }

    onActionSelected = ()=> {
        if (feedbackText === undefined || feedbackText.replace(/\s+/g, '') === '') {
          toastShort('请填写建议内容哦~');
        } else {
          const { navigator } = this.props;
          // const feedback = AV.Object.new('Feedback');
          // feedback.set('manufacturer', DeviceInfo.getManufacturer());
          // feedback.set('system', DeviceInfo.getSystemName());
          // feedback.set('deviceVersion', DeviceInfo.getSystemVersion());
          // feedback.set('deviceModel', DeviceInfo.getModel());
          // feedback.set('appVersion', DeviceInfo.getVersion());
          // feedback.set('feedback', feedbackText);
          // feedback.save();
          // navigator.pop();
          toastShort('您的问题已反馈，我们会及时跟进处理');
        }
    }



    render() {
        return (
            <View style={UserContactStyles.container}>
                <Toolbar
                    navigator = {this.props.navigator}
                    actions={toolbarActions}
                    onActionSelected={this.onActionSelected}
                    title = "联系我们"
                />
                <TextInput
                  style={UserContactStyles.textInput}
                  placeholder="请写下您宝贵的意见或建议，与青少年一起进步！"
                  placeholderTextColor="#aaaaaa"
                  underlineColorAndroid="transparent"
                  numberOfLines={200}
                  multiline
                  autoFocus
                  onChangeText={(text) => {
                    feedbackText = text;
                  }}
                />
            </View>
        )
    }
}

const UserContactStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fcfcfc',
  },
  textInput: {
    flex: 1,
    fontSize: 18,
    padding: 15,
    textAlignVertical: 'top'
  }
});


export default UserContact