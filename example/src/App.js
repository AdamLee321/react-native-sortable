import React, { useState, useCallback } from 'react';
import { Text, View } from 'react-native';
import {
  SortableListProvider,
  SortableList,
  Tile,
} from 'react-native-sortable-dynamic';

const tiles = [
  { id: 1, text: 'Tile 1' },
  { id: 2, text: 'Tile 2' },
  { id: 3, text: 'Tile 3' },
  { id: 4, text: 'Tile 4', reorderable: false },
  { id: 5, text: 'Tile 5', draggable: false },
  { id: 6, text: 'Tile 6', draggable: false, reorderable: false },
  { id: 7, text: 'Tile 7' },
  { id: 8, text: 'Tile 8' },
  { id: 9, text: 'Tile 9' },
  { id: 10, text: 'Tile 10' },
  { id: 11, text: 'Tile 11' },
  { id: 12, text: 'Tile 12' },
  { id: 13, text: 'Tile 13' },
  { id: 14, text: 'Tile 14' },
];

const App = () => {
  const [enableEditing, setEnableEditing] = useState(false);

  const handleLongPress = useCallback(() => {
    setEnableEditing((prev) => !prev);
  }, []);

  const renderItem = useCallback(
    (tile, index) => (
      <Tile
        editing={enableEditing}
        draggable={tile.draggable}
        reorderable={tile.reorderable}
        onLongPress={handleLongPress}
        key={`${tile.id}-${index}`}
        id={tile.id}
      >
        <View
          style={[
            {
              backgroundColor: 'red',
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 5,
            },
            { opacity: enableEditing ? 0.5 : 1 },
          ]}
        >
          <Text style={{ color: 'white', fontSize: 40 }}>{tile.text}</Text>
        </View>
      </Tile>
    ),
    [enableEditing, handleLongPress]
  );

  return (
    <SortableListProvider config={{ MARGIN: 10, COL: 2 }}>
      <SortableList
        editing={enableEditing}
        tiles={tiles}
        onDragEnd={(positions) => console.log(positions)}
      >
        {tiles.map((tile, index) => renderItem(tile, index))}
      </SortableList>
    </SortableListProvider>
  );
};
