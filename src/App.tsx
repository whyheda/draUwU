import React from 'react';
import { Canvas } from './components/Canvas';
import { ColorContext } from './components/context';

function App() {

  const [color, setColor] = React.useState<string>('#000000');

  const value = React.useMemo(
    () => ({ color, setColor }), 
    [color]
  );

  return (
    <ColorContext.Provider value={value}>
      <Canvas />
    </ColorContext.Provider>
  )
}

export { App }