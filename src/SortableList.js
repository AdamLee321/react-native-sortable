import React, { memo } from 'react';
import { View, Text } from 'react-native';
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
      style={{ backgroundColor: 'blue' }}
    >
      {children.map((child) => {
        console.log('Rendering child:', child.props.id);
        return (
          <View style={{ height: SIZE, width: SIZE, backgroundColor: 'red' }}>
            <Text>{child.props.id}</Text>
          </View>
        );
      })}
    </Animated.ScrollView>
  );
};

export default memo(SortableList);
