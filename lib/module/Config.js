"use strict";

import { Dimensions } from 'react-native';
import { Easing } from 'react-native-reanimated';
import React, { createContext, useContext } from 'react';
import { jsx as _jsx } from "react/jsx-runtime";
const {
  width
} = Dimensions.get('window');
const defaultConfig = {
  MARGIN: 10,
  COL: 2,
  SIZE: width / 2 - 10 // Calculated based on COL and MARGIN
};
const ConfigContext = /*#__PURE__*/createContext(defaultConfig);
export const useSortableConfig = () => useContext(ConfigContext);
export const animationConfig = {
  easing: Easing.inOut(Easing.ease),
  duration: 350
};
export const getPosition = (position, COL, SIZE) => {
  'worklet';

  return {
    x: position % COL === 0 ? 0 : SIZE * (position % COL),
    y: Math.floor(position / COL) * SIZE
  };
};
export const getOrder = (tx, ty, max, COL, SIZE) => {
  'worklet';

  const x = Math.round(tx / SIZE) * SIZE;
  const y = Math.round(ty / SIZE) * SIZE;
  const row = Math.max(y, 0) / SIZE;
  const col = Math.max(x, 0) / SIZE;
  return Math.min(row * COL + col, max);
};
const SortableListProvider = ({
  children,
  config
}) => {
  const mergedConfig = {
    ...defaultConfig,
    ...config
  };
  mergedConfig.SIZE = width / mergedConfig.COL - mergedConfig.MARGIN;
  return /*#__PURE__*/_jsx(ConfigContext.Provider, {
    value: mergedConfig,
    children: children
  });
};
export default SortableListProvider;
//# sourceMappingURL=Config.js.map