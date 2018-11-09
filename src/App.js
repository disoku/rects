import React, { Component } from 'react';
import RectanglesRotator from './components/RectanglesRotator';
import './App.css';
import 'antd/dist/antd.css';

class App extends Component {
  render() {
    return (
      <div className='App'>
        <RectanglesRotator />
      </div>
    );
  }
}

export default App;
