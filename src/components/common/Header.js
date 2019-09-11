import React from 'react';
import {Text, View} from 'react-native';
const Header =(props)=>{
    return(
         <View style={styles.viewStyle}>
           <Text style={styles.textStyle}>{props.headerText}</Text>
         </View>
    );  
};
const styles ={
    viewStyle: {
        backgroundColor:'#F8F8F8',
        justifyContents:'center',
        alignItems:'center',
        height:50,
        paddingTop:10,
        shadowColor:'#000',
        shadowOffset:{width:0,height:2},
        shadowOpacity:1.9,
        elevation: 2,
        position:'relative',
        // borderBottomWidth:3,
        // borderColor:'11111',
        // borderWidth:2,
       
    },
    textStyle: {
        fontSize:20
    }  
};
export {Header};