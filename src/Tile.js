import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useSortableConfig } from './Config';

const Tile = ({ onPress, onLongPress, activeOpacity = 0.7, children }) => {
  const { SIZE } = useSortableConfig();

  const containerStyle = {
    width: SIZE,
    height: SIZE,
    backgroundColor: 'rgba(0, 0, 255, 0.2)',
  };

  return (
    <TouchableOpacity
      style={containerStyle}
      onPress={onPress}
      onLongPress={onLongPress}
      activeOpacity={activeOpacity}
    >
      {children}
    </TouchableOpacity>
  );
};

export default Tile;
