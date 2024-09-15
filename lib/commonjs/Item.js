"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _reactNativeReanimated = _interopRequireWildcard(require("react-native-reanimated"));
var _reactNativeGestureHandler = require("react-native-gesture-handler");
var _reactNativeSafeAreaContext = require("react-native-safe-area-context");
var _Config = require("./Config.js");
var _jsxRuntime = require("react/jsx-runtime");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
/**
 * Item Component
 *
 * This component represents a draggable item in the sortable grid. It manages the gesture handling
 * and animations needed to drag and reorder the item within the grid.
 *
 * Props:
 * @param {React.ReactNode} children - The content to render inside the item.
 * @param {object} positions - Shared value that contains the current positions of all items.
 * @param {number} id - Unique identifier for the item.
 * @param {function} onDragEnd - Callback function triggered when dragging ends.
 * @param {object} scrollView - Reference to the scroll view for scrolling during drag.
 * @param {object} scrollY - Shared value representing the current scroll position.
 * @param {boolean} editing - Whether the list is in editing mode.
 * @param {boolean} draggable - Whether the item is draggable (default: true).
 * @param {Array} tiles - Array of tile items used to check reorderable state.
 */const Item = ({
  children,
  positions,
  id,
  onDragEnd,
  scrollView,
  scrollY,
  editing,
  draggable = true,
  tiles
}) => {
  // Get safe area insets for accurate height calculation
  const inset = (0, _reactNativeSafeAreaContext.useSafeAreaInsets)();
  const containerHeight = _reactNative.Dimensions.get('window').height - inset.top - inset.bottom;

  // Get the configuration for columns and size
  const {
    COL,
    SIZE,
    MARGIN
  } = (0, _Config.useSortableConfig)();

  // Calculate content height based on the number of items
  const contentHeight = Object.keys(positions.value).length / COL * SIZE;
  const isGestureActive = (0, _reactNativeReanimated.useSharedValue)(false); // Whether the item is being actively dragged

  // Calculate initial position of the item
  const position = (0, _Config.getPosition)(positions.value[id], COL, SIZE);
  const translateX = (0, _reactNativeReanimated.useSharedValue)(position.x);
  const translateY = (0, _reactNativeReanimated.useSharedValue)(position.y);

  // Effect to reset isGestureActive when not in editing mode
  (0, _react.useEffect)(() => {
    if (!editing) {
      isGestureActive.value = false;
    }
  }, [editing, isGestureActive]);

  // React to changes in the positions object
  (0, _reactNativeReanimated.useAnimatedReaction)(() => positions.value[id],
  // Track changes to this item's position
  newOrder => {
    if (!isGestureActive.value) {
      const pos = (0, _Config.getPosition)(newOrder, COL, SIZE);
      translateX.value = (0, _reactNativeReanimated.withTiming)(pos.x, _Config.animationConfig);
      translateY.value = (0, _reactNativeReanimated.withTiming)(pos.y, _Config.animationConfig);
    }
  });

  // Gesture handler for dragging
  const onGestureEvent = (0, _reactNativeReanimated.useAnimatedGestureHandler)({
    onStart: (_, ctx) => {
      if (editing && draggable) {
        // Store the starting position
        ctx.x = translateX.value;
        ctx.y = translateY.value;
        isGestureActive.value = false; // TODO: Set to false when grouping is implemented
      }
    },
    onActive: ({
      translationX,
      translationY
    }, ctx) => {
      if (editing && draggable) {
        // Calculate new position
        translateX.value = ctx.x + translationX;
        translateY.value = ctx.y + translationY;

        // Calculate new order based on position
        const newOrder = (0, _Config.getOrder)(translateX.value, translateY.value, Object.keys(positions.value).length - 1, COL, SIZE);
        const oldOrder = positions.value[id];
        if (newOrder !== oldOrder) {
          // Find the item to swap positions with
          const idToSwap = Object.keys(positions.value).find(key => positions.value[key] === newOrder);

          // Only swap if the target item is reorderable
          const targetItem = tiles.find(tile => tile.id === Number(idToSwap));
          if (idToSwap && targetItem?.reorderable !== false) {
            const newPositions = {
              ...positions.value
            };
            newPositions[id] = newOrder;
            newPositions[idToSwap] = oldOrder;
            positions.value = newPositions;
          }
        }

        // Handle scrolling during drag
        const lowerBound = scrollY.value;
        const upperBound = lowerBound + containerHeight - SIZE;
        const maxScroll = contentHeight - containerHeight;
        const leftToScrollDown = maxScroll - scrollY.value;

        // Scroll up
        if (translateY.value < lowerBound) {
          const diff = Math.min(lowerBound - translateY.value, lowerBound);
          scrollY.value -= diff;
          (0, _reactNativeReanimated.scrollTo)(scrollView, 0, scrollY.value, false);
          ctx.y -= diff;
          translateY.value = ctx.y + translationY;
        }
        // Scroll down
        if (translateY.value > upperBound) {
          const diff = Math.min(translateY.value - upperBound, leftToScrollDown);
          scrollY.value += diff;
          (0, _reactNativeReanimated.scrollTo)(scrollView, 0, scrollY.value, false);
          ctx.y += diff;
          translateY.value = ctx.y + translationY;
        }
      }
    },
    onEnd: () => {
      if (draggable) {
        // Snap the item back into its place when the drag ends
        const newPosition = (0, _Config.getPosition)(positions.value[id], COL, SIZE);
        translateX.value = (0, _reactNativeReanimated.withTiming)(newPosition.x, _Config.animationConfig, () => {
          isGestureActive.value = false; // Set gesture to inactive
          (0, _reactNativeReanimated.runOnJS)(onDragEnd)(positions.value); // Call onDragEnd on the JS thread
        });
        translateY.value = (0, _reactNativeReanimated.withTiming)(newPosition.y, _Config.animationConfig);
      }
    }
  });

  // Animated style for the item
  const style = (0, _reactNativeReanimated.useAnimatedStyle)(() => {
    const zIndex = isGestureActive.value ? 100 : 0; // Bring the item to front when active
    const scale = editing && isGestureActive.value ? (0, _reactNativeReanimated.withSpring)(1.05) : (0, _reactNativeReanimated.withSpring)(1); // Slightly enlarge the item when dragging
    return {
      position: 'absolute',
      top: 0,
      left: 0,
      width: SIZE,
      height: SIZE,
      margin: MARGIN,
      zIndex,
      transform: [{
        translateX: translateX.value
      }, {
        translateY: translateY.value
      }, {
        scale
      }]
    };
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNativeReanimated.default.View, {
    style: style,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNativeGestureHandler.PanGestureHandler, {
      enabled: editing,
      onGestureEvent: onGestureEvent,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNativeReanimated.default.View, {
        style: _reactNative.StyleSheet.absoluteFill,
        children: children
      })
    })
  });
};
var _default = exports.default = Item;
//# sourceMappingURL=Item.js.map