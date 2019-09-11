import React from 'react';
import {View,Text} from'react-native';

const CardSection = (props) => {
    return(
        <View style={styles.conatinerStyle}>
            {props.children}
        </View>
    )
};

const styles={
    conatinerStyle:{
        borderBottomWidth:1,
        borderColor:'#ddd',
       // backgroundColor:'1111',
        padding:1,
        justifyContent:'flex-start',
        marginTop:2,
        flexDirection:'row',
        position:'relative'
    }
};

export {CardSection};