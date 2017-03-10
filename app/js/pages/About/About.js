/**
 * Created by flyjennyetn on 2016-10-24.
 */
import React, {Component} from 'react'
import {
  StyleSheet,
  Image,
  Text,
  Linking,
  View
} from 'react-native';

import Toolbar from '../../components/Toolbar';
import Button from '../../components/Button';

const READING_REPO = 'http://www.e-tianrong.com/';

class About extends Component {
  onPress(url) {
    Linking.openURL(url);
  }

  onIconClicked = ()=> {
      this.props.drawer.openDrawer();
  }   

  render() {
    return (
      <View style={styles.container}>
       <Toolbar
            onIconClicked={this.onIconClicked}
            title = "关于"
            leftIcon = {require('../../../images/ic_tab_category.png')}
        />
        <View style={styles.content}>
          <View style={styles.center}>
            <Image
              style={styles.logo}
              source={{uri:'http://www.e-tianrong.com/images/tr_logo.png'}}
            />
            <Text style={styles.version}>
              天融互联
            </Text>
            <Text style={styles.title}>
              中国安全生产协会
            </Text>
            <Text style={styles.subtitle}>
              中小学安全教育
                工作委员会
            </Text>
          </View>
          <View style={styles.bottomContainer}>
            <View style={styles.disclaimerContent}>
              <Text style={[styles.disclaimer, { color: '#999999' }]}>
                免责声明：所有内容均来自——天融互联
              </Text>
              <Button
                style={[styles.disclaimer, { color: '#3e9ce9' }]}
                text={READING_REPO}
                onPress={() => this.onPress(READING_REPO)}
              />
            </View>
            <View style={styles.sourceContent}>
              <Text style={[styles.source, { color: '#aaaaaa' }]}>
                技术支持：
              </Text>
              <Button
                style={[styles.source, { color: '#3e9ce9' }]}
                text={READING_REPO}
                onPress={() => this.onPress(READING_REPO)}
              />
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexDirection: 'column',
  },
  content: {
    flexGrow: 1,
    backgroundColor: '#fcfcfc',
    justifyContent: 'center',
    paddingBottom: 10
  },
  center: {
    flexGrow: 1,
    alignItems: 'center'
  },
  logo: {
    width: 180,
    height: 90,
    marginTop: 50,
    resizeMode:'stretch'
  },
  version: {
    fontSize: 16,
    textAlign: 'center',
    color: '#aaaaaa',
    marginTop: 5
  },
  title: {
    fontSize: 28,
    textAlign: 'center',
    color: '#313131',
    marginTop: 10
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    color: '#4e4e4e'
  },
  disclaimerContent: {
    flexDirection: 'column'
  },
  disclaimer: {
    fontSize: 14,
    textAlign: 'center'
  },
  sourceContent: {
    flexDirection: 'row',
    marginTop: 8
  },
  source: {
    fontSize: 12,
    textAlign: 'center'
  },
  bottomContainer: {
    alignItems: 'center',
    paddingBottom: 40
  }
});

export default About;
