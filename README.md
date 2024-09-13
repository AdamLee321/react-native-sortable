# react-native-sortable-dynamic

![ScreenRecording2024-09-13at16 16 14-ezgif com-video-to-gif-converter](https://github.com/user-attachments/assets/f5f0681c-2ebf-45e7-a329-970c93383944)

`react-native-sortable-dynamic` is a highly customizable, drag-and-drop library for creating sortable grid and list layouts in React Native. It provides smooth animations and supports reordering items in a dynamic, flexible layout. Ideal for creating dashboards, photo galleries, task boards, and more, with easy-to-use configuration options for both grid and list layouts.

## Features

- 🖱️ **Drag-and-drop**: Easily reorder grid and list items using intuitive gestures.
- 🖼️ **Grid & List Support**: Configurable for both grid and list views.
- 🧩 **Flexible Layout**: Customize columns, margins, and item sizes to fit your needs.
- 🛠️ **Editable Mode**: Toggle between editing and non-editing modes to enable/disable reordering.
- ⚡ **Smooth Animations**: Built using `react-native-reanimated` for seamless and performant animations.
- 🔐 **Lock Items**: Mark specific items as non-reorderable or non-draggable.
- 🧩 **Dynamic Layout Configuration**: Easily switch between grid and list views by configuring the layout dynamically.

## Installation

First, install the package:

```bash
npm install react-native-sortable-dynamic
# or
yarn add react-native-sortable-dynamic
```

You'll also need to install dependencies like react-native-reanimated and react-native-gesture-handler if you haven't already:

```bash
npm install react-native-reanimated react-native-gesture-handler
# or
yarn add react-native-reanimated react-native-gesture-handler
```

Follow the setup instructions for react-native-reanimated and react-native-gesture-handler.

## Usage

```
import React from 'react';
import { Text, View } from 'react-native';
import { SortableListProvider, SortableList, Tile } from 'react-native-sortable-dynamic';

const tiles = [
  { id: 1, text: 'Tile 1' },
  { id: 2, text: 'Tile 2' },
  { id: 3, text: 'Tile 3' },
  { id: 4, text: 'Tile 4' },
];

const App = () => {
  return (
    <SortableListProvider config={{ MARGIN: 10, COL: 2 }}>
      <SortableList tiles={tiles} onDragEnd={(positions) => console.log(positions)}>
        {tiles.map(tile => (
          <Tile key={tile.id} id={tile.id}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'red' }}>
              <Text style={{ color: 'white', fontSize: 20 }}>{tile.text}</Text>
            </View>
          </Tile>
        ))}
      </SortableList>
    </SortableListProvider>
  );
};

export default App;
```

## Roadmap

✅ Support for grid layouts
✅ Support for list layouts
🔜 Add more customization options for animations and gestures
🔜 Provide support for lists

License
This project is licensed under the MIT License. See the LICENSE file for details.

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
