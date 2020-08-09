# React Dancing Lines

react-dancing-lines is a simple react wrapper for a website effect, originally created by [何问起 hovertree.com](http://hovertree.com/hvtart/bjae/onxw4ahp.htm).

It is a cool cursor effect to be used in the web front page and it would be even greater if I can use it in React as a component! So I tweaked a bit the code and now you can use it as a React component!

Demo Website: [https://yizhiyue.me/react-dancing-lines/](https://yizhiyue.me/react-dancing-lines/)

![demo for react dancing lines](example/demo.png)

## Installation

`npm install react-dancing-lines --save`

## Usage

Just include the DancingLines component in your own components and that's it!

```javascript
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
      <DancingLines></DancingLines>
      <h1>Hello, world!</h1>
    </div>
  );
}
```
