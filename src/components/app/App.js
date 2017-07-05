import React, {Component} from 'react'
import './App.css'
import {default as Tree } from '../tree/container'


class App extends Component {

  render() {
    return (
      <div className="App">
        <Tree/>
      </div>
    )
  }
}

export default App
