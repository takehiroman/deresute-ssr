import React from 'react'
import axios from 'axios'
import { requestData,receiveDataSuccess,receiveDataFailed,countup,countdown } from '../action'
import Checkbox from 'material-ui/Checkbox';
import { Image } from 'material-ui-image'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {GridList, GridTile} from 'material-ui/GridList';
import $ from 'jquery';


const styles = {
  gridList: {
    width: 1200,
    height: 620,
    overflowY: 'auto',
  }
};

const CharacterList = ({ store }) => {
    const { isFetching,characterArray } = store.getState().characters
    const total = $("input:checked").length;

    const handleFetchData = () => {
        //store.dispatch(requestData())
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

    

    const countTotal = () => {
        const elems = document.getElementsByTagName('input');
        for(let id = 0;id < elems.length;id++){
        elems[id].checked?store.dispatch(countup()):store.dispatch(countdown())
        }
    }

    return (
    <MuiThemeProvider>
    <div >
    {
        isFetching
        ? <h2>now loading</h2>
        :<div >
        {handleFetchData()}
                <p>あなたは{Math.round(total/characterArray.length*1000)/10}%({total}/{characterArray.length})%のSSRを所持しています</p>
                    <GridList
                     cellHeight={200}
                     style={styles.gridList}
                     cols={4}
                     >
                        {characterArray.map(character => (
                        <GridTile
                         actionIcon={ <Checkbox labelStyle={{color: 'white'}} iconStyle={{fill: 'white'}} value={character.charaid} onTouchTap={() => countTotal()} onClick={() => countTotal()}/>}
                         title={character.name}
                         key={character._id}
                         >
                            <Image src={character.imgurl} alt=""  /> 
                        </GridTile>
                    ))}
                </GridList>
        </div>
        }
        </div>
        </MuiThemeProvider>
    )
}

export default CharacterList