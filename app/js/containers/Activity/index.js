/**
 * Created by flyjennyetn on 2016-11-02.
 */
import React, {Component, PropTypes} from 'react'
import {View,StyleSheet,Dimensions,WebView} from 'react-native';
import {connect} from 'react-redux'

import Toolbar from '../../components/Toolbar';

const shareAddress="http://www.qsndyr.com/web/#!/activity"

let canGoBack = false;

class Activity extends Component {
  
    render() {
        const {activityNum} = this.props.route.params;
        return (
            <View>
                <Toolbar
                    navigator = {this.props.navigator}
                    title = {"活动"}
                />
                <WebView
                  ref={(ref) => { this.webview = ref; }}
                  automaticallyAdjustContentInsets={false}
                  style={ActivityStyles.webView}
                  source={{uri: shareAddress+activityNum}}
                  javaScriptEnabled={true}
                  domStorageEnabled={true}
                  decelerationRate="normal"
                  startInLoadingState={true}
                  scalesPageToFit={true}
                />
            </View>
        )
    }
}


const { height, width } = Dimensions.get('window');
const ActivityStyles = StyleSheet.create({
    webView:{
        width:width,
        height:height
    }
});

export default Activity