import React from 'react';
import App from './component/App';
import {Provider} from 'react-redux'
import Store from './store'

class Rootes extends React.Component{
    constructor(props){
        super(props)
        this.store = Store()
    }

    render(){
        return(
        <Provider store={this.store}>
            <App  />
        </Provider>
        )
    }


}

export default Rootes