/**
 * Created by flyjennyetn on 2016-10-24.
 */
import React from 'react';
import {
  ActivityIndicator,
  Text,
  StyleSheet,
  View
} from 'react-native';

const LoadingView = () => (
  <View style={styles.loading}>
    <ActivityIndicator
      size="large"
      color="#34cd94"
    />
    <Text style={styles.loadingText}>数据加载中...</Text>
  </View>
);

const styles = StyleSheet.create({
  loading: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 35,
  },
  loadingText: {
    marginTop: 10,
    marginBottom:15,
    textAlign: 'center'
  }
});

export default LoadingView;
