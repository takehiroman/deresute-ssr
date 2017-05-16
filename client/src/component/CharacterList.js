import React from 'react'
import axios from 'axios'
import { requestData,receiveDataSuccess,receiveDataFailed } from '../action'

const CharacterList = ({ store }) => {
    const { isFetching,characterArray } = store.getState().characters

    const handleFetchData = () => {
        store.dispatch(requestData())
        axios.get('/api/characters')
        .then(response => {
            const _characterArray = response.data
            store.dispatch(receiveDataSuccess(_characterArray))
        })
        .catch(err => {
            console.error(new Error(err))
            store.dispatch(receiveDataFailed())
        })
    }

    return (
    <div>
    {
        isFetching
        ? <h2>now loading</h2>
        :<div>
                <button onClick={() => handleFetchData()}>fetch</button>
            <ul>
                {characterArray.map(character => (
                    <li key={character._id}>
                    
                    <input type="checkbox" value={character.charaid} />{`${character.name}`}
                    <br/>
                    <img src={character.imgurl} alt="" />
                    </li>
                ))}
            </ul>
        </div>
        }
        </div>
    )
}

export default CharacterList