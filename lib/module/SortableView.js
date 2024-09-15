"use strict";

import React from 'react';
import SortableListProvider from "./Config.js";
import SortableContainer from "./SortableContainer.js";

/**
 * SortableView Component
 *
 * This component combines the configuration provider and the sortable container into a single component
 * to simplify usage. It provides an interface for managing the layout, editing mode, and the reordering
 * of items within a grid or list.
 *
 * Props:
 * @param {object} config - Configuration options such as `MARGIN` and `COL` for customizing the layout.
 * @param {Array} data - Array of data objects to render and reorder. Each object should have a unique `id`.
 * @param {boolean} editing - Whether the list is in editing mode, enabling drag-and-drop functionality.
 * @param {function} onDragEnd - Callback function called with the updated positions when the drag ends.
 * @param {function} renderItem - Function to render each item inside the sortable view. Receives an object containing `item` and `index`.
 * @param {function} onPress - Function to handle the press event on an item.
 * @param {function} onLongPress - Function to handle the long press event on an item.
 * @param {object} itemStyle - Custom style to apply to each SortableItem.
 * @param {object} itemProps - Additional props to be passed to each SortableItem.
 *
 * Usage:
 * <SortableView
 *   config={{ MARGIN: 10, COL: 2 }}
 *   data={dataArray}
 *   editing={isEditing}
 *   onDragEnd={handleDragEnd}
 *   renderItem={({ item }) => <YourCustomComponent item={item} />}
 *   onPress={handlePress}
 *   onLongPress={handleLongPress}
 *   itemStyle={{backgroundColor: 'blue'}}
 *   itemProps={{disabled: true}}
 * />
 */
import { jsx as _jsx } from "react/jsx-runtime";
const SortableView = ({
  config,
  data,
  editing,
  onDragEnd,
  renderItem,
  onPress,
  onLongPress,
  itemStyle,
  itemProps
}) => {
  return /*#__PURE__*/_jsx(SortableListProvider, {
    config: config,
    children: /*#__PURE__*/_jsx(SortableContainer, {
      editing: editing,
      data: data,
      onDragEnd: positions => {
        onDragEnd(positions);
      },
      renderItem: renderItem,
      onPress: onPress,
      onLongPress: onLongPress,
      style: itemStyle,
      ...itemProps
    })
  });
};
export default SortableView;
//# sourceMappingURL=SortableView.js.map