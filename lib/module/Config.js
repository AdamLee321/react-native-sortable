"use strict";

import { Dimensions } from 'react-native';
import { Easing } from 'react-native-reanimated';
import React, { createContext, useContext } from 'react';

// Get screen width to calculate dynamic sizes
import { jsx as _jsx } from "react/jsx-runtime";
const {
  width
} = Dimensions.get('window');

// Default configuration for the sortable grid/list
const defaultConfig = {
  MARGIN: 10,
  // Default margin between items
  COL: 2,
  // Default number of columns
  SIZE: width / 2 - 10 // Default size for each item, calculated based on the number of columns and margin
};

// Create a Context for the sortable grid/list configuration
const ConfigContext = /*#__PURE__*/createContext(defaultConfig);

// Custom hook to use the sortable configuration context
export const useSortableConfig = () => useContext(ConfigContext);

// Configuration for animation settings
export const animationConfig = {
  easing: Easing.inOut(Easing.ease),
  duration: 350
};

// Helper function to calculate the item's position based on its index
// Used to position items in a grid layout
export const getPosition = (position, COL, SIZE) => {
  'worklet';

  // Necessary for Reanimated 2 to run this function on the UI thread
  return {
    x: position % COL === 0 ? 0 : SIZE * (position % COL),
    y: Math.floor(position / COL) * SIZE
  };
};

// Helper function to determine the new order of items during drag-and-drop
export const getOrder = (tx, ty, max, COL, SIZE) => {
  'worklet';

  // Necessary for Reanimated 2 to run this function on the UI thread
  const x = Math.round(tx / SIZE) * SIZE;
  const y = Math.round(ty / SIZE) * SIZE;
  const row = Math.max(y, 0) / SIZE;
  const col = Math.max(x, 0) / SIZE;
  return Math.min(row * COL + col, max);
};

/**
 * SortableConfigProvider component
 *
 * Wrap your sortable grid/list components with this provider to set custom configuration.
 * This provider allows for overriding default settings like margin and the number of columns.
 *
 * @param {Object} config - Custom configuration to override the default settings.
 * @param {number} config.MARGIN - Margin between items.
 * @param {number} config.COL - Number of columns in the grid.
 * @param {React.ReactNode} children - Child components that will use this configuration.
 *
 * Usage:
 *
 * <SortableConfigProvider config={{ MARGIN: 15, COL: 3 }}>
 *   <YourSortableComponent />
 * </SortableConfigProvider>
 */
const SortableConfigProvider = ({
  children,
  config
}) => {
  // Merge custom config with the default configuration
  const mergedConfig = {
    ...defaultConfig,
    ...config
  };

  // Recalculate SIZE based on COL and MARGIN
  mergedConfig.SIZE = width / mergedConfig.COL - mergedConfig.MARGIN;
  return /*#__PURE__*/_jsx(ConfigContext.Provider, {
    value: mergedConfig,
    children: children
  });
};
export default SortableConfigProvider;
//# sourceMappingURL=Config.js.map