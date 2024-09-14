"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _Config = require("./Config.js");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const styles = _reactNative.StyleSheet.create({
  container: {
    width: _Config.SIZE,
    height: _Config.SIZE
  }
});
const Tile = ({
  onPress,
  onLongPress,
  activeOpacity = 0.7,
  children
}) => {
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.TouchableOpacity, {
    style: styles.container,
    onPress: onPress,
    onLongPress: onLongPress,
    activeOpacity: activeOpacity,
    children: children
  });
};
var _default = exports.default = Tile;
//# sourceMappingURL=Tile.js.map