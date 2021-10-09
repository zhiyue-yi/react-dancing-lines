import * as React from 'react';
import DancingLines from '../src/index';

export function App() {
  return (
    <div
      style={{
        height: '100vh',
        width: '100vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
      }}
    >
      <DancingLines backgroundColor="rgb(8,5,16)"></DancingLines>
      <h1>Hello, world!</h1>
    </div>
  );
}
