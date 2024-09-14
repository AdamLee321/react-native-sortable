"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useSortableConfig = exports.getPosition = exports.getOrder = exports.animationConfig = exports.SortableListProvider = void 0;
var _reactNative = require("react-native");
var _reactNativeReanimated = require("react-native-reanimated");
var _react = _interopRequireWildcard(require("react"));
var _jsxRuntime = require("react/jsx-runtime");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const {
  width
} = _reactNative.Dimensions.get('window');
const defaultConfig = {
  MARGIN: 10,
  COL: 2,
  SIZE: width / 2 - 10 // Calculated based on COL and MARGIN
};
const ConfigContext = /*#__PURE__*/(0, _react.createContext)(defaultConfig);
const useSortableConfig = () => (0, _react.useContext)(ConfigContext);
exports.useSortableConfig = useSortableConfig;
const animationConfig = exports.animationConfig = {
  easing: _reactNativeReanimated.Easing.inOut(_reactNativeReanimated.Easing.ease),
  duration: 350
};
const getPosition = (position, COL, SIZE) => {
  'worklet';

  return {
    x: position % COL === 0 ? 0 : SIZE * (position % COL),
    y: Math.floor(position / COL) * SIZE
  };
};
exports.getPosition = getPosition;
const getOrder = (tx, ty, max, COL, SIZE) => {
  'worklet';

  const x = Math.round(tx / SIZE) * SIZE;
  const y = Math.round(ty / SIZE) * SIZE;
  const row = Math.max(y, 0) / SIZE;
  const col = Math.max(x, 0) / SIZE;
  return Math.min(row * COL + col, max);
};
exports.getOrder = getOrder;
const SortableListProvider = ({
  children,
  config
}) => {
  const mergedConfig = {
    ...defaultConfig,
    ...config
  };
  mergedConfig.SIZE = width / mergedConfig.COL - mergedConfig.MARGIN;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(ConfigContext.Provider, {
    value: mergedConfig,
    children: children
  });
};
exports.SortableListProvider = SortableListProvider;
//# sourceMappingURL=Config.js.map