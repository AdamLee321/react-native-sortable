import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { SIZE } from './Config';

const styles = StyleSheet.create({
  container: {
    width: SIZE,
    height: SIZE,
  },
});

const Tile = ({ onPress, onLongPress, activeOpacity = 0.7, children }) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      onLongPress={onLongPress}
      activeOpacity={activeOpacity}
    >
      {children}
    </TouchableOpacity>
  );
};

export default Tile;
