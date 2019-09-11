import React from 'react';
import {TouchableOpacity,Text, ToastAndroid} from 'react-native';


const Button=(props) => {
    return(
        <TouchableOpacity onPress={props.onPress} style={styles.buttonStyle}>
            <Text style={styles.textStyle}>{props.children}</Text>
        </TouchableOpacity>
    );
};
const styles={
    textStyle:{
        alignSelf:'center',
        color:'#007aff',
        paddingTop:10,
        paddingBottom:10,
        fontSize:18,
        fontWeight:'bold'
    },
    buttonStyle:{
        flex:1,
        alignSelf:'stretch',
        borderColor:'#007aff',
        backgroundColor:'BCFAA92',
        borderWidth:1,
        marginLeft:5,
        marginRight:5,
        borderRadius:5,
    
    }
}

export {Button};