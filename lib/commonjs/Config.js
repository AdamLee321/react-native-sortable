"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useSortableConfig = exports.getPosition = exports.getOrder = exports.default = exports.animationConfig = void 0;
var _reactNative = require("react-native");
var _reactNativeReanimated = require("react-native-reanimated");
var _react = _interopRequireWildcard(require("react"));
var _jsxRuntime = require("react/jsx-runtime");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
// Get screen width to calculate dynamic sizes
const {
  width
} = _reactNative.Dimensions.get('window');

// Default configuration for the sortable grid/list
const defaultConfig = {
  MARGIN: 10,
  // Default margin between items
  COL: 2,
  // Default number of columns
  SIZE: width / 2 - 10 // Default size for each item, calculated based on the number of columns and margin
};

// Create a Context for the sortable grid/list configuration
const ConfigContext = /*#__PURE__*/(0, _react.createContext)(defaultConfig);

// Custom hook to use the sortable configuration context
const useSortableConfig = () => (0, _react.useContext)(ConfigContext);

// Configuration for animation settings
exports.useSortableConfig = useSortableConfig;
const animationConfig = exports.animationConfig = {
  easing: _reactNativeReanimated.Easing.inOut(_reactNativeReanimated.Easing.ease),
  duration: 350
};

// Helper function to calculate the item's position based on its index
// Used to position items in a grid layout
const getPosition = (position, COL, SIZE) => {
  'worklet';

  // Necessary for Reanimated 2 to run this function on the UI thread
  return {
    x: position % COL === 0 ? 0 : SIZE * (position % COL),
    y: Math.floor(position / COL) * SIZE
  };
};

// Helper function to determine the new order of items during drag-and-drop
exports.getPosition = getPosition;
const getOrder = (tx, ty, max, COL, SIZE) => {
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
exports.getOrder = getOrder;
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
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(ConfigContext.Provider, {
    value: mergedConfig,
    children: children
  });
};
var _default = exports.default = SortableConfigProvider;
//# sourceMappingURL=Config.js.map