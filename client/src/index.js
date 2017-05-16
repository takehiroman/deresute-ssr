import React from 'react';
import ReactDOM from 'react-dom';
import App from './component/App';
import { createStore } from 'redux';
import rootReducer from './reducer'

const store = createStore(rootReducer)
const render = () => {
  ReactDOM.render(
    <App store={store} />,
    document.getElementById('root')
  );
}

store.subscribe(() => {
  render()
})
render()