/**
 * Created by flyjennyetn on 2016-10-24.
 */
import React, { PropTypes } from 'react';
import {
  ToolbarAndroid,
  StyleSheet,
  Platform,
  View,
  Image,
  Text,
  TouchableOpacity
} from 'react-native';
import { naviGoBack } from '../utils/common';

const leftIcons = require('../../images/ic_back.png');

function Toolbar({
  leftIcon,  
  title,
  titleColor,
  actions,
  onIconClicked,
  onActionSelected
}){
  const handleIconClicked = () => {
    if (onIconClicked) {
      onIconClicked();
    } else {
      naviGoBack();
    }
  };

  const renderToolbarAndroid = () => (
    <ToolbarAndroid
      style={styles.toolbarA}
      actions={actions}
      navIcon={leftIcon ? leftIcon : leftIcons}
      onActionSelected={onActionSelected}
      onIconClicked={handleIconClicked}
      titleColor={titleColor ? titleColor : "#fff"}
      title={title}
    />
  );

  const renderToolbarIOS = () => {
    const action = actions ? actions[0] : null;
    let showActionButton = action !== undefined;
    return (
      <View style={styles.toolbar}>
        <TouchableOpacity onPress={handleIconClicked}>
          <Image
            source={leftIcon ? leftIcon : leftIcons}
            style={styles.leftIOS}
          />
        </TouchableOpacity>
        <Text
          style={[styles.titleIOS,
            showActionButton ? { paddingLeft: 0 } : { paddingLeft: -35 }]}
        >
          {title}
        </Text>
        {action &&
          <TouchableOpacity onPress={handleIconClicked}>
            <Image
              source={action.icon}
              style={styles.rightIOS}
            />
          </TouchableOpacity>
        }
      </View>
    );
  };

  const Toolbar = Platform.select({
    android: () => renderToolbarAndroid(),
    ios: () => renderToolbarIOS()
  });

  return <Toolbar />;
};

const styles = StyleSheet.create({
  toolbarA: {
    flexDirection: 'row',
    backgroundColor: '#66cc66',
    height: 58
  },  
  toolbar: {
    flexDirection: 'row',
    backgroundColor: '#66cc66',
    paddingTop:20,
    height: 58
  },
  titleIOS: {
    flexGrow: 1,
    textAlign: 'center',
    color: '#fff',
    fontSize: 20
  },
  leftIOS: {
    marginLeft: 8
  },
  rightIOS: {
    marginRight: 8
  },
  rightText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 18
  },
  zero: {
    height: 0,
    width: 0
  }
});


export default Toolbar;
