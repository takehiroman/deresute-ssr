import React from 'react'
import axios from 'axios'
import { requestData,receiveDataSuccess,receiveDataFailed,countup,countdown } from '../action'
import Checkbox from 'material-ui/Checkbox';
import { Image } from 'material-ui-image'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {GridList, GridTile} from 'material-ui/GridList';


const styles = {

  gridList: {
    width: 900,
    height: 1220,
    overflowY: 'auto',
  }
  
};

const CharacterList = ({ store }) => {
    const { isFetching,characterArray } = store.getState().characters
    const { count,check } = store.getState().counters

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

    const countUp = () => {
        const elems = document.getElementsByTagName("input");
        for(let i = 0;i <= characterArray.length;i++){
            if(elems[i].checked === true){
                store.dispatch(countup())
                break;
            }
            else if(elems[i].checked === false){
                store.dispatch(countdown())
                break;
            }
        }
    }

    
    return (
    <MuiThemeProvider>
    <div >
    {
        isFetching
        ? <h2>now loading</h2>
        :<div >
                <button onClick={() => handleFetchData()}>fetch</button>
                <p>あなたは{Math.round(count/characterArray.length*1000)/10}%({count}/{characterArray.length})%のSSRを所持しています</p>
                    <GridList
                     cellHeight={200}
                     style={styles.gridList}
                     cols={3}
                     >
                        {characterArray.map(character => (
                        <GridTile
                         actionIcon={<Checkbox labelStyle={{color: 'white'}} iconStyle={{fill: 'white'}}  onCheck={() => countUp()} />}
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