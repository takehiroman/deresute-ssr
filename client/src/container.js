import {connect} from 'react-redux'
import {requestData,receiveDataSuccess,receiveDataFailed} from './action' 
import CharacterListComp from './component/CharacterList'

const mapStateToProps = (state) => {
    return{
        characterList:state.characters.characterArray,
        isFetching:state.characters.isFetching
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        requestData:() => {
            dispatch(requestData())
        },
        receiveDataSuccess:(characterArray) => {
            dispatch(receiveDataSuccess(characterArray))
        },
        receiveDataFailed:() => {
            dispatch(receiveDataFailed())
        }
    }
}

const CharacterList = connect(
    mapStateToProps,
    mapDispatchToProps
)(CharacterListComp)

export default CharacterList