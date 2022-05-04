import React from 'react';

const ColorContext = React.createContext({
  color: '',
  setColor: (value: string) => {}
});

export { ColorContext };