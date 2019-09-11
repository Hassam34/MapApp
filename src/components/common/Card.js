import React from 'react';
import {View}  from 'react-native';

const Card = (props) =>{
    return(
        <View style={styles.containerStyle}>
            {props.children}
        </View>
    );
};
const styles = {
    containerStyle:{
        borderWidth:3,
        borderColor:'#dddd',
        borderRadius:5,
        borderBottomWidth:1,
        shadowColor:'#0000',
        shadowOpacity:3,
        shadowRadius:5,
        opacity:3,
        elevation:1,
        marginTop:5,
        marginRight:10,
        marginLeft:10
    }
      
};
export {Card};
