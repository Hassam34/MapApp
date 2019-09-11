import React, {Component} from 'react';
import AppContainer from '../Navigating/Router'

export default class  App extends Component{
    render(){
        console.disableYellowBox=true
        return( 
         <AppContainer/>
        )
    };  
};
const styles={
    spinnerStyle:{
        flex: 1,
        marginTop:240,
        justifyContent: 'center',
        alignItems:'center'
    }
}