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
/**
 * SortableList Component
 *
 * This component renders a scrollable list of items that can be reordered using drag-and-drop gestures.
 * It manages the overall layout of the items and provides the necessary props to each child `Item` component
 * to enable dragging, scrolling, and reordering functionality.
 *
 * Props:
 * @param {React.ReactNode[]} children - The list of items to render inside the sortable list.
 * @param {boolean} editing - Whether the list is in editing mode, enabling drag-and-drop.
 * @param {Array} tiles - Array of tile data to manage the reordering state.
 * @param {function} onDragEnd - Callback function called with the updated positions when the drag ends.
 *
 * Usage:
 *
 * <SortableList editing={isEditing} tiles={tiles} onDragEnd={handleDragEnd}>
 *   {tiles.map((tile) => (
 *     <YourTileComponent key={tile.id} id={tile.id} />
 *   ))}
 * </SortableList>
 */const SortableList = ({
  children,
  editing,
  tiles,
  onDragEnd
}) => {
  // Get the configuration for columns and size from context
  const {
    COL,
    SIZE
  } = (0, _Config.useSortableConfig)();

  // Shared values to track scrolling and item positions
  const scrollY = (0, _reactNativeReanimated.useSharedValue)(0); // Current scroll position
  const scrollView = (0, _reactNativeReanimated.useAnimatedRef)(); // Reference to the scroll view
  const positions = (0, _reactNativeReanimated.useSharedValue)(children.reduce((acc, child, index) => ({
    ...acc,
    [child.props.id]: index
  }), {}));

  // Scroll event handler to update scrollY shared value
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
      // Calculate the total height needed for the scroll view content
      height: Math.ceil(children.length / COL) * SIZE
    },
    showsVerticalScrollIndicator: false,
    bounces: false,
    scrollEventThrottle: 16 // Control scroll event frequency
    ,
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