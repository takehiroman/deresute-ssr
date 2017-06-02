import { combineReducers } from 'redux'
import {
    COUNTUP,COUNTDOWN,REQUEST_DATA,RECEIVE_DATA_SUCCESS,RECEIVE_DATA_FAILD
} from './action'

const initialState = {
    characters: {
        isFetching: false,
        characterArray: [],
    },
    counters:{
        count:0,
    }
}
const countReducer = (state = initialState.counters,action) => {
    let count = state.count;
    switch(action.type){
        case COUNTUP:
            return {
                ...state,
                count:count + action.count
            };
        case COUNTDOWN:
            return{
                ...state,
                count:count + action.count
            }
        default:
            return state;
    }
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
  counters : countReducer,
})

export default rootReducer
