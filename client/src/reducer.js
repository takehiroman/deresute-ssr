import { combineReducers } from 'redux'
import {
    REQUEST_DATA,RECEIVE_DATA_SUCCESS,RECEIVE_DATA_FAILD
} from './action'

const initialState = {
    characters: {
        isFetching: false,
        characterArray: [],
    },
}

const charactersReducer = (state = initialState.characters,action) => {
    switch(action.type){
    case REQUEST_DATA:
        return{
            ...state,
            isFetching: true
        }
    case RECEIVE_DATA_SUCCESS:
        return{
            ...state,
            isFetching:false,
            characterArray: action.characterArray,
        }
    case RECEIVE_DATA_FAILD:
        return{
            ...state,
            isFetching: false,
        }
    default:
        return state
    }
}

const rootReducer = combineReducers({
  characters: charactersReducer,
})

export default rootReducer
