import React from 'react'
import axios from 'axios'
import Checkbox from 'material-ui/Checkbox';
import { Image } from 'material-ui-image'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {GridList, GridTile} from 'material-ui/GridList';

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
        //this.countTotal = this.countTotal.bind(this);
        this.props = props
    }

    componentDidMount(){
        this.props.requestData()
        axios.get('/api/characters')
        .then(response => {
            const _characterArray = response.data
            console.log(_characterArray)
            this.props.receiveDataSuccess(_characterArray)
        })
        .catch(err => {
            console.error(new Error(err))
            this.props.receiveDataFailed()
        })
    }
    
/*
    countTotal(){
        const elems = document.getElementsByTagName('input');
        for(let id = 0;id < elems.length;id++){
        elems[id].checked?this.props.store.dispatch(countup()):this.props.store.dispatch(countdown())
        }
    }
*/
    render(){
    console.log(this.props)
    return (
    <MuiThemeProvider>
    <div >
    {
        this.props.isFetching
        ? <h2>now loading</h2>
        :<div >
        


                    <GridList
                     cellHeight={200}
                     style={styles.gridList}
                     cols={4}
                     >
                        {this.props.characterList.map(character => (
                        <GridTile
                         actionIcon={ <Checkbox labelStyle={{color: 'white'}} iconStyle={{fill: 'white'}} value={character.charaid} />}
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