import React, { memo } from 'react';
import Animated, {
  useAnimatedRef,
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import SortableItemWrapper from './SortableItemWrapper';
import SortableItem from './SortableItem';
import { useSortableConfig } from './Config';

/**
 * SortableContainer Component
 *
 * This component renders a scrollable grid or list of items that can be reordered using drag-and-drop gestures.
 * It manages the layout and drag-and-drop logic for the items, providing the necessary props
 * to each child `SortableItemWrapper` component to enable dragging, scrolling, and reordering functionality.
 *
 * Props:
 * @param {Array} data - Array of data objects to render and reorder. Each object should have a unique `id`.
 * @param {boolean} editing - Whether the container is in editing mode, enabling drag-and-drop functionality.
 * @param {function} onDragEnd - Callback function called with the updated positions when a drag ends.
 * @param {function} renderItem - Function to render the content of each item inside the sortable container. Receives an object containing `item` and `index`.
 * @param {function} onPress - Function to handle the press event on a sortable item.
 * @param {function} onLongPress - Function to handle the long press event on a sortable item.
 * @param {object} itemStyle - Custom style to apply to each SortableItem.
 * @param {...object} itemProps - Additional props to be passed to each SortableItem.
 *
 * Usage:
 * <SortableContainer
 *   data={dataArray}
 *   editing={isEditing}
 *   onDragEnd={handleDragEnd}
 *   renderItem={({ item }) => <YourCustomComponent item={item} />}
 *   onPress={handlePress}
 *   onLongPress={handleLongPress}
 *   accessible={true}
 * />
 */
const SortableContainer = ({
  data,
  editing,
  onDragEnd,
  renderItem,
  onPress,
  onLongPress,
  itemStyle,
  ...itemProps
}) => {
  // Get the configuration for columns and size from context
  const { COL, SIZE } = useSortableConfig();

  // Shared values to track scrolling and item positions
  const scrollY = useSharedValue(0); // Current scroll position
  const scrollView = useAnimatedRef(); // Reference to the scroll view
  const positions = useSharedValue(
    data.reduce((acc, item, index) => ({ ...acc, [item.id]: index }), {})
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
        height: Math.ceil(data.length / COL) * SIZE,
      }}
      showsVerticalScrollIndicator={false}
      bounces={false}
      scrollEventThrottle={16} // Control scroll event frequency
    >
      {/* Render each item using the SortableItemWrapper and SortableItem components */}
      {data.map((item, index) => (
        <SortableItemWrapper
          key={item.id.toString()}
          id={item.id.toString()}
          positions={positions}
          editing={editing}
          draggable={item.draggable}
          reorderable={item.reorderable}
          data={data}
          onDragEnd={onDragEnd}
          scrollView={scrollView}
          scrollY={scrollY}
        >
          {/* Render each sortable item using SortableItem */}
          <SortableItem
            id={item.id.toString()}
            draggable={item.draggable}
            reorderable={item.reorderable}
            onPress={() => onPress && onPress(item)}
            onLongPress={() => onLongPress && onLongPress(item)}
            style={itemStyle}
            {...itemProps}
          >
            {renderItem({ item: item, index })}
          </SortableItem>
        </SortableItemWrapper>
      ))}
    </Animated.ScrollView>
  );
};

export default memo(SortableContainer);
