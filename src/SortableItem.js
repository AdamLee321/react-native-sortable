import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useSortableConfig } from './Config';

/**
 * SortableItem Component
 *
 * This component represents a single item in the sortable grid or list. It is designed to be flexible
 * and supports various user interactions, including press and long press events. The size of each item
 * is dynamically adjusted based on the configuration provided by the `SortableConfigProvider`.
 *
 * Props:
 * Accepts all TouchableOpacity props, including but not limited to:
 * @param {function} onPress - Callback function called when the item is pressed.
 * @param {function} onLongPress - Callback function called when the item is long-pressed.
 * @param {number} activeOpacity - The opacity of the item when it is pressed. Default is 0.7.
 * @param {object} style - Additional style for the item.
 * @param {React.ReactNode} children - The content to render inside the item.
 * @param {...object} rest - Other TouchableOpacity props such as `accessible`, `accessibilityLabel`, etc.
 *
 * Usage:
 *
 * <SortableItem onPress={handlePress} onLongPress={handleLongPress} accessibilityLabel="Custom Item">
 *   <Text>Item Content</Text>
 * </SortableItem>
 */
const SortableItem = ({
  onPress,
  onLongPress,
  activeOpacity = 0.7,
  children,
  style,
  ...rest
}) => {
  // Get the size of the item from the sortable config context
  const { SIZE } = useSortableConfig();

  // Define the style for the item, ensuring that its size is consistent across the grid or list
  const containerStyle = {
    width: SIZE,
    height: SIZE,
  };

  return (
    <TouchableOpacity
      style={[containerStyle, style]}
      onPress={onPress}
      onLongPress={onLongPress}
      activeOpacity={activeOpacity}
      {...rest} // Spread any additional TouchableOpacity props
    >
      {children}
    </TouchableOpacity>
  );
};

export default SortableItem;
