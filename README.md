# react-native-sortable-dynamic

![ScreenRecording2024-09-13at16 16 14-ezgif com-resize](https://github.com/user-attachments/assets/01f5e3e7-7046-4d7a-8658-6ba10978fe83)

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

### Step 1: Install the package

```bash
npm install react-native-sortable-dynamic
```

#### or

```bash
yarn add react-native-sortable-dynamic
```

### Step 2: Install dependencies

You'll also need to install dependencies like react-native-reanimated and react-native-gesture-handler if you haven't already:

```bash
npm install react-native-reanimated react-native-gesture-handler
```

#### or

```bash
yarn add react-native-reanimated react-native-gesture-handler
```

### Step 3: Additional setup

1. **Reanimated Setup**: Follow the [react-native-reanimated installation guide](https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/installation/) to properly set up `react-native-reanimated`. This includes updating the `babel.config.js` file:

   ```js
   // babel.config.js
   module.exports = {
     presets: ['module:metro-react-native-babel-preset'],
     plugins: [
       'react-native-reanimated/plugin', // Add this line
     ],
   };
   ```

2. **Gesture Handler Setup**: Follow the [react-native-gesture-handler installation guide](https://docs.swmansion.com/react-native-gesture-handler/docs/) to set up `react-native-gesture-handler` correctly.

3. **Android Specific Configuration**:

   - If you're using this library on Android, make sure to wrap the root component with `GestureHandlerRootView`.
   - Update `MainActivity.java` to enable gesture handling:

   ```java
   import com.facebook.react.ReactActivity;
   import com.facebook.react.ReactActivityDelegate;
   import com.facebook.react.ReactRootView;
   import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView; // Add this import

   public class MainActivity extends ReactActivity {
     @Override
     protected ReactActivityDelegate createReactActivityDelegate() {
       return new ReactActivityDelegate(this, getMainComponentName()) {
         @Override
         protected ReactRootView createRootView() {
           return new RNGestureHandlerEnabledRootView(MainActivity.this); // Modify this line
         }
       };
     }
   }
   ```

4. **iOS Specific Configuration**:

   - For iOS, ensure that you run `pod install` in the `ios` directory of your project after installing the dependencies:

   ```bash
   cd ios
   pod install
   ```

## Usage

### Basic Example

Here's a simple example of how to use `react-native-sortable-dynamic` in your React Native project:

```jsx
import React, { useState } from 'react';
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
  { id: 4, text: 'Tile 4' },
];

const App = () => {
  const [enableEditing, setEnableEditing] = useState(false);

  return (
    <SortableListProvider config={{ MARGIN: 10, COL: 2 }}>
      <SortableList
        tiles={tiles}
        editing={enableEditing}
        onDragEnd={(positions) => console.log(positions)}
      >
        {tiles.map((tile) => (
          <Tile
            key={tile.id}
            id={tile.id}
            onLongPress={() => setEnableEditing(!enableEditing)}
          >
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'red',
              }}
            >
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

### Props

#### `SortableListProvider`

| Prop     | Type     | Description                                                                                       |
| -------- | -------- | ------------------------------------------------------------------------------------------------- |
| `config` | `object` | Configuration options such as `MARGIN` and `COL`. Use this to dynamically adjust the grid layout. |

#### `SortableList`

| Prop        | Type       | Description                                                           |
| ----------- | ---------- | --------------------------------------------------------------------- |
| `tiles`     | `array`    | Array of items to be rendered and sorted.                             |
| `editing`   | `boolean`  | If true, allows items to be dragged and reordered.                    |
| `onDragEnd` | `function` | Callback function that receives updated positions when the drag ends. |

#### `Tile`

| Prop            | Type       | Description                                                   |
| --------------- | ---------- | ------------------------------------------------------------- |
| `onPress`       | `function` | Function called when the tile is pressed.                     |
| `onLongPress`   | `function` | Function called when the tile is long-pressed.                |
| `activeOpacity` | `number`   | The opacity of the tile when it is pressed. Default is `0.7`. |

## Roadmap

- ✅ Support for grid layouts
- 🔜 Support for list layouts
- 🔜 Add more customization options for animations and gestures
- 🔜 Improve accessibility and performance

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.
