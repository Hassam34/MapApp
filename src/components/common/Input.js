import React from 'react';
import {Text,View, TextInput} from 'react-native';

const Input =({placeholder,label,value,onChangeText,secureTextEntry}) =>{
    return(
        <View style={styles.viewStyle}>  
            <Text style={styles.textStyle}>
                {label}
            </Text>

            <TextInput
                secureTextEntry={secureTextEntry}
                placeholder={placeholder}
                style={styles.inputStyles}
                value={value}
                autoCorrect={false}
                onChangeText={onChangeText}
            />
        </View>
    );
}
const styles={
    inputStyles:{
        lineHeight:23,
        fontSize:16,
        paddingRight:5,
        paddingLeft:5,
        color:'#000',
        flex:2
    },
    viewStyle:{
        alignItem:'center',
        flex:1,
        flexDirection:'row',
        height:40
    },
    textStyle:{
         marginTop:7,
         paddingLeft:20,
         fontSize:18,
         flex:1
        
    }
};

export  {Input};