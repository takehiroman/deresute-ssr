import React from 'react'
import axios from 'axios'
import { requestData,receiveDataSuccess,receiveDataFailed } from '../action'
import Checkbox from 'material-ui/Checkbox';
import { GridList, GridTile } from 'material-ui/GridList';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

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
    <MuiThemeProvider>
    <div>
    {
        isFetching
        ? <h2>now loading</h2>
        :<div>
                <button onClick={() => handleFetchData()}>fetch</button>
            <GridList cellHeight={1} >
            <ul>
                {characterArray.map(character => (
                    <GridTile cols={1.0}>
                    <p key={character._id}>    
                    <Checkbox value={character.charaid} label={`${character.name}`} />
                    <img src={character.imgurl} alt="" width="80" height="100" />
                    </p>
                    </GridTile>
                ))}
            </ul>
            </GridList>
        </div>
        }
        </div>
        </MuiThemeProvider>
    )
}

export default CharacterList