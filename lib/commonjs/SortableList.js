"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNativeReanimated = _interopRequireWildcard(require("react-native-reanimated"));
var _Item = _interopRequireDefault(require("./Item.js"));
var _Config = require("./Config.js");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const SortableList = ({
  children,
  editing,
  tiles,
  onDragEnd
}) => {
  const {
    COL,
    SIZE
  } = (0, _Config.useSortableConfig)();
  const scrollY = (0, _reactNativeReanimated.useSharedValue)(0);
  const scrollView = (0, _reactNativeReanimated.useAnimatedRef)();
  const positions = (0, _reactNativeReanimated.useSharedValue)(children.reduce((acc, child, index) => ({
    ...acc,
    [child.props.id]: index
  }), {}));
  const onScroll = (0, _reactNativeReanimated.useAnimatedScrollHandler)({
    onScroll: ({
      contentOffset: {
        y
      }
    }) => {
      scrollY.value = y;
    }
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNativeReanimated.default.ScrollView, {
    onScroll: onScroll,
    ref: scrollView,
    contentContainerStyle: {
      height: Math.ceil(children.length / COL) * SIZE
    },
    showsVerticalScrollIndicator: false,
    bounces: false,
    scrollEventThrottle: 16,
    children: children.map(child => /*#__PURE__*/(0, _jsxRuntime.jsx)(_Item.default, {
      id: child.props.id,
      positions: positions,
      editing: editing,
      draggable: child.props.draggable,
      reorderable: child.props.reorderable,
      tiles: tiles,
      onDragEnd: onDragEnd,
      scrollView: scrollView,
      scrollY: scrollY,
      children: child
    }, child.props.id))
  });
};
var _default = exports.default = /*#__PURE__*/(0, _react.memo)(SortableList);
//# sourceMappingURL=SortableList.js.map