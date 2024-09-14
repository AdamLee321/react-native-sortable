import React, { memo } from 'react';
import Animated, {
  useAnimatedRef,
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import Item from './Item';
import { useSortableConfig } from './Config';

const SortableList = ({ children, editing, tiles, onDragEnd }) => {
  const { COL, SIZE } = useSortableConfig();

  console.log('SortableList COL:', COL, 'SIZE:', SIZE);

  const scrollY = useSharedValue(0);
  const scrollView = useAnimatedRef();
  const positions = useSharedValue(
    children.reduce(
      (acc, child, index) => ({ ...acc, [child.props.id]: index }),
      {}
    )
  );

  const onScroll = useAnimatedScrollHandler({
    onScroll: ({ contentOffset: { y } }) => {
      scrollY.value = y;
    },
  });

  console.log('Rendering SortableList with:', {
    COL,
    SIZE,
    childrenCount: children.length,
  });

  return (
    <Animated.ScrollView
      onScroll={onScroll}
      ref={scrollView}
      contentContainerStyle={{
        height: Math.ceil(children.length / COL) * SIZE,
      }}
      showsVerticalScrollIndicator={false}
      bounces={false}
      scrollEventThrottle={16}
      style={{ backgroundColor: 'lightgray' }}
    >
      {children.map((child) => {
        console.log('Rendering child:', child.props.id);
        return (
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
        );
      })}
    </Animated.ScrollView>
  );
};

export default memo(SortableList);
