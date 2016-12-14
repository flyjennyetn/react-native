/**
 * Created by flyjennyetn on 2016-11-02.
 */
'use strict';

import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  VibrationIOS
  } from 'react-native';

import Camera from 'react-native-camera';

var QRCodeScreen = React.createClass({

  _onPressCancel: function() {
    var $this = this;
    requestAnimationFrame(function() {
      $this.props.navigator.pop();
      if ($this.props.onCancel) {
        $this.props.onCancel();
      }
    });
  },

  _onBarCodeRead: function(result) {
    var $this = this;

    if (this.barCodeFlag) {
      this.barCodeFlag = false;

      setTimeout(function() {
        VibrationIOS.vibrate();
        $this.props.navigator.pop();
        $this.props.onSucess(result.data);
      }, 1000);
    }
  },

  render: function() {
    var cancelButton = null;
    this.barCodeFlag = true;
    
    if (this.props.cancelButtonVisible) {
      cancelButton = <CancelButton onPress={this._onPressCancel} title={this.props.cancelButtonTitle} />;
    }

    return (
      <Camera onBarCodeRead={this._onBarCodeRead} style={styles.camera}>
        <View style={styles.rectangleContainer}>
          <View style={styles.rectangle}/>
        </View>
        {cancelButton}
      </Camera>
    );
  },
});


QRCodeScreen.propTypes = {
    cancelButtonVisible: React.PropTypes.bool,
    cancelButtonTitle: React.PropTypes.string,
    onSucess: React.PropTypes.func,
    onCancel: React.PropTypes.func,
};

QRCodeScreen.defaultProps = {
      cancelButtonVisible: false,
      cancelButtonTitle: 'Cancel',
};



const CancelButton = ({ onPress, title}) => (
      <View style={styles.cancelButton}>
        <TouchableOpacity onPress={onPress}>
          <Text style={styles.cancelButtonText}>{title}</Text>
        </TouchableOpacity>
      </View>
);



var styles = StyleSheet.create({

  camera: {
    height: 568,
    alignItems: 'center',
  },

  rectangleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },

  rectangle: {
    height: 250,
    width: 250,
    borderWidth: 2,
    borderColor: '#00FF00',
    backgroundColor: 'transparent',
  },

  cancelButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 3,
    padding: 15,
    width: 100,
    bottom: 10,
  },
  cancelButtonText: {
    fontSize: 17,
    fontWeight: '500',
    color: '#0097CE',
  },
});

export default QRCodeScreen