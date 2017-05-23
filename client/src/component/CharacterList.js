import React from 'react'
import axios from 'axios'
import { requestData,receiveDataSuccess,receiveDataFailed } from '../action'
import Checkbox from 'material-ui/Checkbox';
import { Col } from 'react-bootstrap';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const styles = {
    block: {
        maxwidth: 275,
    }
}

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
            <ul>
                {characterArray.map(character => (
                    <Col md={4} key={character._id}>
                    <Checkbox style={styles.checkbox} label={`${character.name}`} />
                    <img src={character.imgurl} alt="" width="270" height="160" />
                    </Col>
                ))}
            </ul>
        </div>
        }
        </div>
        </MuiThemeProvider>
    )
}

export default CharacterList