"use strict";

import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useSortableConfig } from "./Config.js";
import { jsx as _jsx } from "react/jsx-runtime";
const Tile = ({
  onPress,
  onLongPress,
  activeOpacity = 0.7,
  children
}) => {
  const {
    SIZE
  } = useSortableConfig();
  const containerStyle = {
    width: SIZE,
    height: SIZE
  };
  return /*#__PURE__*/_jsx(TouchableOpacity, {
    style: containerStyle,
    onPress: onPress,
    onLongPress: onLongPress,
    activeOpacity: activeOpacity,
    children: children
  });
};
export default Tile;
//# sourceMappingURL=Tile.js.map