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

import { naviGoBack } from '../tools/common';

const leftIcons = require('../../images/ic_back.png');

function Toolbar({
  leftIcon,  
  title,
  titleColor,
  actions,
  onIconClicked,
  onActionSelected,
  navigator
}){
  const handleIconClicked = () => {
    if (onIconClicked) {
      onIconClicked();
    } else if (navigator) {
      naviGoBack(navigator);
    }
  };

  const renderToolbarAndroid = () => (
    <ToolbarAndroid
      style={styles.toolbar}
      actions={actions}
      navIcon={leftIcon ? leftIcon : leftIcons}
      onActionSelected={onActionSelected}
      onIconClicked={handleIconClicked}
      titleColor={titleColor ? titleColor : "#fff"}
      title={title}
    />
  );

  const renderToolbarIOS = () => {
    const action = actions[0];
    let showActionButton = action !== undefined;
    return (
      <View style={styles.toolbar}>
        <TouchableOpacity onPress={this.handleIconClicked}>
          <Image
            source={leftIcon}
          />
        </TouchableOpacity>
        <Text
          style={[styles.titleIOS,
            showActionButton ? { paddingLeft: 0 } : { paddingLeft: -35 }]}
        >
          {title}
        </Text>
        {action &&
          <TouchableOpacity onPress={this.handleIconClicked}>
            <Image
              source={action.icon}
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
  toolbar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#66cc66',
    height: 58,
    marginTop: 10,
  },
  titleIOS: {
    flex: 1,
    textAlign: 'center',
    color: '#fff',
    fontSize: 20,
    marginTop: 20
  },
  leftIOS: {
    marginTop: 20,
    marginLeft: 8
  },
  rightIOS: {
    marginTop: 20,
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
