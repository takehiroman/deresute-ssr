import React, { Component } from 'react';
import CharacterList from '../container'

class App extends Component {

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>デレステSSR所持率</h2>
        </div>
        <p className="App-intro">
          デレステのSSR所持率出すやつ
        </p>
          <CharacterList />
      </div>
    );
  }
}

export default App;
