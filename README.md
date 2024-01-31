# xHooks

A complete and lightweight collection of React hooks, without any dependencies (except React, of course).


## Installation

```bash
npm install xhooks
```
or

```bash
yarn add xhooks
```
or

```bash
pnpm install xhooks
```

## Hooks

- [useBoolean](#useboolean)
- [useClickAnywhere](#useclickanywhere)
- [useClickAway](#useclickaway)
- [useCopyToClipboard](#usecopytoclipboard)
- [useDarkMode](#usedarkmode)
- [useDefaultState](#usedefaultstate)
- [useGeolocation](#usegeolocation)
- [useLocalStorage](#uselocalstorage)
- [useMediaQuery](#usemediaquery)
- [useMousePosition](#usemouseposition)
- [usePrevious](#useprevious)
- [useSessionStorage](#usesessionstorage)
- [useWindowScroll](#usewindowscroll)
- [useWindowSize](#usewindowsize)
- [useWindowResize](#usewindowresize)

### useBoolean

A simple hook that returns a boolean value and its setters. It's useful for managing boolean states.

```tsx
import { useBoolean } from "path-to-hooks";

const MyComponent = () => {
  const [value, setValue, setTrue, setFalse, toggle] = useBoolean(true);

  // Example: Toggle boolean state on button click
  return (
    <div>
      <p>Current value: {value.toString()}</p>
      <button onClick={toggle}>Toggle</button>
    </div>
  );
};
```

- **Parameters:**

  - `initialValue`: (Optional) The initial value of the boolean state.

- **Returns:**

  - `value: boolean`: The current boolean value.
  - `setValue: (value: boolean) => void`: Sets the boolean value.
  - `setTrue: () => void`: Sets the value to `true`.
  - `setFalse: () => void`: Sets the value to `false`.
  - `toggle: () => void`: Toggles the boolean value.

### useClickAnywhere

A hook that fires a callback when the user clicks anywhere on the document.

```tsx
import { useClickAnywhere } from "path-to-hooks";

const MyComponent = () => {
  useClickAnywhere(() => {
    // Example: Close a dropdown when clicking anywhere on the document
    console.log("Document clicked!");
  });

  // Other component logic
};
```

- **Parameters:**

  - `callback: () => void`: The callback function to be executed on document click.

### useClickAway

A hook that fires a callback when the user clicks outside of the given ref element.

```tsx
import { useClickAway } from "path-to-hooks";

const MyComponent = () => {
  const ref = useRef(null);

  useClickAway(ref, () => {
    // Example: Close a modal when clicking outside of it
    console.log("Clicked outside the modal!");
  });

  // Other component logic
  return <div ref={ref}>Click outside of this element</div>;
};
```

- **Parameters:**

  - `ref: React.MutableRefObject`: The ref object of the element to be excluded from the click event.
  - `callback: () => void`: The callback function to be executed on click outside of the given element.

### useCopyToClipboard

A hook that copies the text to the clipboard and sets the `isCopied` state to `true` for a given timeout.

```tsx
import { useCopyToClipboard } from "path-to-hooks";

const MyComponent = () => {
  const [copyToClipboard, isCopied] = useCopyToClipboard(2000);

  const handleCopy = () => {
    copyToClipboard("Text to be copied");
    // Example: Show a tooltip indicating successful copy
    console.log("Text copied!");
  };

  // Other component logic
};
```

- **Parameters:**

  - `timeout: number`: (Optional) The timeout in milliseconds after which the `isCopied` state will be set to `false`. Default: `1500`.

- **Returns:**
  - `copyToClipboard: (text: string) => void`: The function that copies the text to the clipboard.
  - `isCopied: boolean`: The boolean state that indicates whether the text has been copied or not.

### useDarkMode

A hook that manages the state of dark mode.

```tsx
import { useDarkMode } from 'path-to-hooks';

const MyComponent = () => {
  const [toggle, enable, disable, isDarkMode] = useDarkMode();

  // Example: Toggle dark mode on button click
  return (
    <div>
      <p>Dark Mode: {isDarkMode ? 'Enabled' : 'Disabled'}</p>
      <button onClick={toggle}>Toggle Dark Mode</button>
    </div>
  );
};
```

- **Returns:**
  - `toggle: () => void`: Toggles the dark mode state.
  - `enable: () => void`: Enables the dark mode state.
  - `disable: () => void`: Disables the dark mode state.
  - `isDarkMode: boolean`: The boolean state that indicates whether the dark mode is enabled or not.


### useDefaultState

A hook that functions similar to `useState`, with the added capability to receive a defaultValue and potentially an initialState.

```tsx
import { useDefaultState } from 'path-to-hooks';

const MyComponent = () => {
  const [value, setValue] = useDefaultState('defaultValue', 'initialValue');

  // Example: Update state on button click
  return (
    <div>
      <p>Current Value: {value}</p>
      <button onClick={() => setValue('New Value')}>Update Value</button>
    </div>
  );
};
```

- **Parameters:**
  - `defaultValue: TValue`: The default value of the state.
  - `initialValue: TValue`: (Optional) The initial value of the state.
- **Returns:**
  - `value: TValue`: The current value of the state.
  - `setValue: (value: TValue) => void`: The function that sets the value of the state.

### useGeolocation

A hook that returns the current location.

```tsx
import { useGeolocation } from 'path-to-hooks';

const MyComponent = () => {
  const { loading, error, data } = useGeolocation();

  // Example: Display location information
  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && (
        <p>
          Latitude: {data.coords.latitude}, Longitude: {data.coords.longitude}
        </p>
      )}
    </div>
  );
};
```

- **Returns:**
  - `loading: boolean`: The boolean state that indicates whether the location is being fetched or not.
  - `error: PositionError | null`: The error object if the location fetching fails.
  - `data: Position | null`: The location object if the location fetching succeeds.

### useLocalStorage

A hook that returns the current value of local storage.

```tsx
import { useLocalStorage } from 'path-to-hooks';

const MyComponent = () => {
  const [value, setValue] = useLocalStorage('myKey', 'defaultValue');

  // Example: Store and retrieve data in/from local storage
  return (
    <div>
      <p>Stored Value: {value}</p>
      <button onClick={() => setValue('New Value')}>Update Value</button>
    </div>
  );
};
```

- **Parameters:**
  - `key: string`: The key of the local storage item.
  - `defaultValue: string`: (Optional) The default value of the local storage item.
- **Returns:**
  - `value: string`: The current value of the local storage item.
  - `setValue: (value: string) => void`: The function that sets the value of the local storage item.


### useMediaQuery

A hook that takes in a media query string and utilizes the matchMedia API to check whether it corresponds to the present document.

```tsx
import { useMediaQuery } from 'path-to-hooks';

const MyComponent = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');

  // Example: Display a different component based on the screen size
  return <div>{isMobile ? <MobileComponent /> : <DesktopComponent />}</div>;
};
```

- **Parameters:**
  - `query: string`: The media query string.
- **Returns:**
  - `matches: boolean`: The boolean state that indicates whether the media query matches the present document or not.



### useMousePosition

A hook that returns the current value of the mouse position.

```tsx
import { useMousePosition } from 'path-to-hooks';

const MyComponent = () => {
  const { x, y } = useMousePosition();

  // Example: Display mouse coordinates
  return <p>Mouse Position: X={x}, Y={y}</p>;
};
```

- **Returns:**
  - `x: number`: The current value of the mouse X position.
  - `y: number`: The current value of the mouse Y position.


### usePrevious

A hook that returns the previous value of the given state.

```tsx
import { usePrevious } from 'path-to-hooks';
import { useState } from 'react';

const MyComponent = () => {
  const [value, setValue] = useState(0);
  const previousValue = usePrevious(value);

  // Example: Display previous value
  return (
    <div>
      <p>Current Value: {value}</p>
      <p>Previous Value: {previousValue}</p>
      <button onClick={() => setValue(value + 1)}>Increment</button>
    </div>
  );
};
```

- **Parameters:**
  - `state: TValue`: The state whose previous value is to be returned.
- **Returns:**
  - `previousValue: TValue`: The previous value of the given state.


### useSessionStorage

A hook that returns the current value of the session storage.

```tsx
import { useSessionStorage } from 'path-to-hooks';

const MyComponent = () => {
  const [value, setValue] = useSessionStorage('myKey', 'defaultValue');

  // Example: Store and retrieve data in/from session storage
  return (
    <div>
      <p>Stored Value: {value}</p>
      <button onClick={() => setValue('New Value')}>Update Value</button>
    </div>
  );
};
```

- **Parameters:**
  - `key: string`: The key of the session storage item.
  - `defaultValue: string`: (Optional) The default value of the session storage item.
- **Returns:**
  - `value: string`: The current value of the session storage item.
  - `setValue: (value: string) => void`: The function that sets the value of the session storage item.

### useWindowScroll

A hook that returns the current value of the window scroll position.

```tsx
import { useWindowScroll } from 'path-to-hooks';

const MyComponent = () => {
  const { scrollX, scrollY } = useWindowScroll();

  // Example: Display scroll position
  return <p>Scroll Position: X={scrollX}, Y={scrollY}</p>;
};
```

- **Returns:**
  - `scrollX: number`: The current value of the window scroll X position.
  - `scrollY: number`: The current value of the window scroll Y position.

### useWindowSize

A hook that returns the current value of the window size.

```tsx
import { useWindowSize } from 'path-to-hooks';

const MyComponent = () => {
  const { width, height } = useWindowSize();

  // Example: Display window size
  return <p>Window Size: Width={width}, Height={height}</p>;
};
```

- **Returns:**
  - `width: number`: The current value of the window width.
  - `height: number`: The current value of the window height.


### useWindowResize

A hook that fires a callback when the window is resized.

```tsx
import { useWindowResize } from 'path-to-hooks';
import { useState } from 'react';


const MyComponent = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);

  useWindowResize(() => {
    // Example: Update window size on resize
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  });

  return <p>Window Size: Width={width}, Height={height}</p>;
}

```

- **Parameters:**
  - `callback: () => void`: The callback function to be executed on window resize.

