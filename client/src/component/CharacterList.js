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

class CharacterList extends React.Component {
    constructor(props){
        super(props)
        this.countTotal = this.countTotal.bind(this);
    }

    componentDidMount(){
        this.props.store.dispatch(requestData())
        axios.get('/api/characters')
        .then(response => {
            const _characterArray = response.data
            this.props.store.dispatch(receiveDataSuccess(_characterArray))
        })
        .catch(err => {
            console.error(new Error(err))
            this.props.store.dispatch(receiveDataFailed())
        })
    }
    

    countTotal(){
        const elems = document.getElementsByTagName('input');
        for(let id = 0;id < elems.length;id++){
        elems[id].checked?this.props.store.dispatch(countup()):this.props.store.dispatch(countdown())
        }
    }
    render(){
    const { isFetching,characterArray } = this.props.store.getState().characters
    const total = $("input:checked").length;
    return (
    <MuiThemeProvider>
    <div >
    {
        isFetching
        ? <h2>now loading</h2>
        :<div >
        
                <p>あなたは{Math.round(total/characterArray.length*1000)/10}%({total}/{characterArray.length})%のSSRを所持しています</p>

                    <GridList
                     cellHeight={200}
                     style={styles.gridList}
                     cols={4}
                     >
                        {characterArray.map(character => (
                        <GridTile
                         actionIcon={ <Checkbox labelStyle={{color: 'white'}} iconStyle={{fill: 'white'}} value={character.charaid} onTouchTap={() => this.countTotal()} onClick={() => this.countTotal()}/>}
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
}

export default CharacterList