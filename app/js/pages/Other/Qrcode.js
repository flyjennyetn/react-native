/**
 * Created by flyjennyetn on 2016-10-24.
 */
import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Vibration
  } from 'react-native';

// import BarcodeScanner from 'react-native-barcodescanner';
import {toastShort} from '../../utils/common';


class Qrcode extends Component {
  constructor(props) {
    super(props);

    this.state = {
      torchMode: 'off',
      cameraType: 'back',
    };
  }

  barcodeReceived(e) {
    Vibration.vibrate();
    toastShort(e.data,true);
    // console.log('Barcode: ' + e.data);
    // console.log('Type: ' + e.type);
  }

  render() {
    return (
      <View>
      {/*

        <BarcodeScanner
          onBarCodeRead={this.barcodeReceived}
          style={styles.camera}
        >
            <View style={styles.rectangleContainer}>
                <View style={styles.rectangle} />
            </View>
        </BarcodeScanner>
      */}
      </View>
     
    );
  }
}


const styles = StyleSheet.create({
    camera: {
        flexGrow: 1
    },
    rectangleContainer: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent'
    },
    rectangle: {
        height: 250,
        width: 250,
        borderWidth: 2,
        borderColor: '#00FF00',
        backgroundColor: 'transparent'
    }
})

export default Qrcode