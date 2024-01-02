# xHooks

A complete and lightweight collection of React hooks.

## Installation

```bash
npm install @peiofour/xhooks
```

## Usage

```jsx
import React from 'react'
import { useToggle } from '@peiofour/xhooks'

const App = () => {
  const [isOn, toggleIsOn] = useToggle(false)

  return (
    <div>
      <button onClick={toggleIsOn}>{isOn ? 'ON' : 'OFF'}</button>
    </div>
  )
}
```
