import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useSortableConfig } from './Config';

/**
 * Tile Component
 *
 * This component represents a single tile in the sortable grid. It is designed to be flexible and
 * allows for user interactions such as press and long press. The size of each tile is dynamically
 * adjusted based on the configuration provided by `SortableListProvider`.
 *
 * Props:
 * @param {function} onPress - Callback function called when the tile is pressed.
 * @param {function} onLongPress - Callback function called when the tile is long-pressed.
 * @param {number} activeOpacity - The opacity of the tile when it is pressed. Default is 0.7.
 * @param {React.ReactNode} children - The content to render inside the tile.
 *
 * Usage:
 *
 * <Tile onPress={handlePress} onLongPress={handleLongPress}>
 *   <Text>Tile Content</Text>
 * </Tile>
 */

const Tile = ({ onPress, onLongPress, activeOpacity = 0.7, children }) => {
  // Get the size of the tile from the sortable config context
  const { SIZE } = useSortableConfig();

  // Define the style for the tile, ensuring that its size is consistent across the grid
  const containerStyle = {
    width: SIZE,
    height: SIZE,
  };

  return (
    <TouchableOpacity
      style={containerStyle}
      onPress={onPress}
      onLongPress={onLongPress}
      activeOpacity={activeOpacity} // Control the opacity when the tile is pressed
    >
      {children}
    </TouchableOpacity>
  );
};

export default Tile;
