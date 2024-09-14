"use strict";

import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { SIZE } from "./Config.js";
import { jsx as _jsx } from "react/jsx-runtime";
const styles = StyleSheet.create({
  container: {
    width: SIZE,
    height: SIZE
  }
});
const Tile = ({
  onPress,
  onLongPress,
  activeOpacity = 0.7,
  children
}) => {
  return /*#__PURE__*/_jsx(TouchableOpacity, {
    style: styles.container,
    onPress: onPress,
    onLongPress: onLongPress,
    activeOpacity: activeOpacity,
    children: children
  });
};
export default Tile;
//# sourceMappingURL=Tile.js.map