import * as React from 'react';
import DancingLines from '../src/index';

export class App extends React.Component {
  render() {
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
        <DancingLines></DancingLines>
        <h1>Hello, world!</h1>
      </div>
    );
  }
}
