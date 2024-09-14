import React, { memo } from 'react';
import Animated, {
  useAnimatedRef,
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import Item from './Item';
import { useSortableConfig } from './Config';

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
 */

const SortableList = ({ children, editing, tiles, onDragEnd }) => {
  // Get the configuration for columns and size from context
  const { COL, SIZE } = useSortableConfig();

  // Shared values to track scrolling and item positions
  const scrollY = useSharedValue(0); // Current scroll position
  const scrollView = useAnimatedRef(); // Reference to the scroll view
  const positions = useSharedValue(
    children.reduce(
      (acc, child, index) => ({ ...acc, [child.props.id]: index }),
      {}
    )
  );

  // Scroll event handler to update scrollY shared value
  const onScroll = useAnimatedScrollHandler({
    onScroll: ({ contentOffset: { y } }) => {
      scrollY.value = y;
    },
  });

  return (
    <Animated.ScrollView
      onScroll={onScroll}
      ref={scrollView}
      contentContainerStyle={{
        // Calculate the total height needed for the scroll view content
        height: Math.ceil(children.length / COL) * SIZE,
      }}
      showsVerticalScrollIndicator={false}
      bounces={false}
      scrollEventThrottle={16} // Control scroll event frequency
    >
      {/* Render each child wrapped in an Item component */}
      {children.map((child) => (
        <Item
          key={child.props.id}
          id={child.props.id}
          positions={positions}
          editing={editing}
          draggable={child.props.draggable}
          reorderable={child.props.reorderable}
          tiles={tiles}
          onDragEnd={onDragEnd}
          scrollView={scrollView}
          scrollY={scrollY}
        >
          {child}
        </Item>
      ))}
    </Animated.ScrollView>
  );
};

export default memo(SortableList);
