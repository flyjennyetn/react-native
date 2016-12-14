/**
 * Created by flyjennyetn on 2016-11-02.
 */
import React, {Component, PropTypes} from 'react'
import {View,Text,Image,StyleSheet,Dimensions,WebView,Modal,TouchableOpacity,BackAndroid,TouchableWithoutFeedback} from 'react-native';
import {connect} from 'react-redux'
import * as WeChat from 'react-native-wechat';

import Toolbar from '../../components/Toolbar';
import LoadingView from '../../components/LoadingView';
import {Storage,naviGoBack,toastShort} from '../../tools/common';
import {IMGADDRESS} from '../../tools/config';

const shareIconWechat = require('../../../images/share_icon_wechat.png');
const shareIconMoments = require('../../../images/share_icon_moments.png');
const share_disable = require('../../../images/share_disable.png');


const shareAddress="http://101.201.107.72/wap/#!/subject"
const toolbarActions = [
  { title: '分享', icon: share_disable, show: 'always' }
];

let canGoBack = false;

class SubjectDetails extends Component {
    
    state = {
      isShareModal: false
    }

    componentDidMount() {
      BackAndroid.addEventListener('hardwareBackPress', this.goBack);
    }

    componentWillUnmount() {
      BackAndroid.removeEventListener('hardwareBackPress', this.goBack);
    }

    goBack = ()=> {
      if (this.state.isShareModal) {
        this.setState({
          isShareModal: false
        });
        return true;
      } else if (canGoBack) {
        this.webview.goBack();
        return true;
      }
      return naviGoBack(this.props.navigator);
    }

    renderSpinner() {
      const { route } = this.props;
      const {thematicSname,photoUrl1,thematicNum} = this.props.route.params;
      return (
        <TouchableWithoutFeedback
          onPress={() => {
            this.setState({
              isShareModal: false
            });
          }}
        >
          <View
            key={'spinner'}
            style={SubjectDetailsStyles.spinner}
          >
            <View style={SubjectDetailsStyles.spinnerContent}>
              <Text style={[SubjectDetailsStyles.spinnerTitle, { fontSize: 20, color: 'black' }]}>
                分享到
              </Text>
              <View style={SubjectDetailsStyles.shareParent}>
                <TouchableOpacity
                  style={SubjectDetailsStyles.base}
                  onPress={() => {
                    WeChat.isWXAppInstalled()
                      .then((isInstalled) => {
                        if (isInstalled) {
                          WeChat.shareToSession({
                            title: thematicSname,
                            description: '分享自：青少年第一人',
                            thumbImage: IMGADDRESS+photoUrl1,
                            type: 'news',
                            webpageUrl: shareAddress+thematicNum
                          })
                          .catch((error) => {
                            toastShort(error.message, true);
                          });
                        } else {
                          toastShort('没有安装微信软件，请您安装微信之后再试', true);
                        }
                      });
                  }}
                >
                  <View style={SubjectDetailsStyles.shareContent}>
                    <Image
                      style={SubjectDetailsStyles.shareIcon}
                      source={shareIconWechat}
                    />
                    <Text style={SubjectDetailsStyles.spinnerTitle}>
                      微信
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={SubjectDetailsStyles.base}
                  onPress={() => {
                    WeChat.isWXAppInstalled()
                      .then((isInstalled) => {
                        if (isInstalled) {
                          WeChat.shareToTimeline({
                            title: thematicSname,
                            thumbImage: IMGADDRESS+photoUrl1,
                            type: 'news',
                            webpageUrl: shareAddress+thematicNum
                          })
                          .catch((error) => {
                            toastShort(error.message, true);
                          });
                        } else {
                          toastShort('没有安装微信软件，请您安装微信之后再试', true);
                        }
                      });
                  }}
                >
                  <View style={SubjectDetailsStyles.shareContent}>
                    <Image
                      style={SubjectDetailsStyles.shareIcon}
                      source={shareIconMoments}
                    />
                    <Text style={SubjectDetailsStyles.spinnerTitle}>
                      朋友圈
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      );
    }
    renderLoading() {
      return <LoadingView />;
    }

    onNavigationStateChange(navState) {
      canGoBack = navState.canGoBack;
    }

    render() {
        const {thematicSname,thematicNum} = this.props.route.params;
        return (
            <View>
                <Toolbar
                    navigator = {this.props.navigator}
                    actions={toolbarActions}
                    onActionSelected={()=>{this.setState({isShareModal: true })}}
                    title = {thematicSname}
                />

                <Modal
                  animationType="fade"
                  visible={this.state.isShareModal}
                  transparent
                  onRequestClose={() => {
                    this.setState({
                      isShareModal: false
                    });
                  }}
                >
                  {this.renderSpinner()}
                </Modal>
                <WebView
                  ref={(ref) => { this.webview = ref; }}
                  automaticallyAdjustContentInsets={false}
                  style={SubjectDetailsStyles.webView}
                  source={{uri: shareAddress+thematicNum}}
                  javaScriptEnabled={true}
                  domStorageEnabled={true}
                  decelerationRate="normal"
                  startInLoadingState={true}
                  scalesPageToFit={true}
                  onNavigationStateChange={this.onNavigationStateChange}
                  renderLoading={()=>this.renderLoading}
                />
            </View>
        )
    }
}


const { height, width } = Dimensions.get('window');
const SubjectDetailsStyles = StyleSheet.create({
    base: {
      flex: 1
    },
    scroll:{
        height:height
    },
    webView:{
        width:width,
        height:height
    },
    spinner: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.65)'
    },
    spinnerContent: {
      justifyContent: 'center',
      width: Dimensions.get('window').width * (7 / 10),
      height: Dimensions.get('window').width * (7 / 10) * 0.68,
      backgroundColor: '#fcfcfc',
      padding: 20,
      borderRadius: 5
    },
    spinnerTitle: {
      fontSize: 18,
      color: '#313131',
      textAlign: 'center',
      marginTop: 5
    },
    shareParent: {
      flexDirection: 'row',
      marginTop: 20
    },
    shareContent: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    },
    shareIcon: {
      width: 40,
      height: 40
    }
});

export default SubjectDetails