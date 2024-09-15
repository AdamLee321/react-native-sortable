import React, { useState, useCallback } from 'react';
import { Text, View } from 'react-native';
import { SortableView } from 'react-native-sortable-dynamic'; // Adjust the import to match the library's main export

// Sample data for the sortable list
const data = [
  { id: 1, text: '1' },
  { id: 2, text: '2' },
  { id: 3, text: '3' },
  { id: 4, text: '4', reorderable: false },
  { id: 5, text: '5', draggable: false },
  { id: 6, text: '6', draggable: false, reorderable: false },
  { id: 7, text: '7' },
  { id: 8, text: '8' },
  { id: 9, text: '9' },
  { id: 10, text: '10' },
  { id: 11, text: '11' },
  { id: 12, text: '12' },
  { id: 13, text: '13' },
  { id: 14, text: '14' },
];

const App = () => {
  const [enableEditing, setEnableEditing] = useState(false);

  const handleLongPress = useCallback(() => {
    setEnableEditing((prev) => !prev);
  }, []);

  const renderItem = useCallback(
    ({ item, index }) => {
      // Set default values for draggable and reorderable
      const isDraggable = item.draggable !== false;
      const isReorderable = item.reorderable !== false;

      return (
        <View
          key={`${item.id}-${index}`}
          style={[
            {
              backgroundColor: 'red',
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 5,
              margin: 10, // Use the margin to separate items
              // Apply opacity based on editing mode and item properties
              opacity: enableEditing && isDraggable && isReorderable ? 0.5 : 1,
            },
          ]}
        >
          <Text style={{ color: 'white', fontSize: 40 }}>{item.text}</Text>
        </View>
      );
    },
    [enableEditing]
  );

  return (
    <SortableView
      config={{ MARGIN: 10, COL: 2 }}
      data={data}
      editing={enableEditing}
      onDragEnd={(positions) => console.log(positions)}
      renderItem={renderItem}
      onPress={handleLongPress}
      onLongPress={handleLongPress}
    />
  );
};

export default App;
