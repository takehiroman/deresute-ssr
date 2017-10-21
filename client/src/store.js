import {createStore} from 'redux'
import rootReducer from './reducer'

export default () => {
    const store = createStore(rootReducer)
    console.log(store.getState());
    return store
}