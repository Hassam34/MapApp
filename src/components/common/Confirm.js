import React from 'react';
import {View,Modal,Text, StyleSheet} from 'react-native';
import {CardSection} from './CardSection'
import {Button} from './Button';

const Confirm =({children, onAccept, onDecline,visible})=>{
    return(<Modal
                visible={visible}
                transparent={false}
                animationType='slide'
                onRequestClose={()=>{}}
                >
                    <View style={styles.containerStyle}>
                        <CardSection style={styles.cardSectionStyle} >
                                <Text style={styles.textStyle}>{children}</Text>
                        </CardSection>
                        <CardSection>
                                <Button onPress={onAccept}>Yes</Button>
                                <Button onPress={onDecline}>No</Button>
                        </CardSection>
                    </View>   
            </Modal>)
}
const styles= StyleSheet.create({
      
    containerStyle:{
            backgroundColor:'rgba(0,0,0,0.75)',
             position:'relative',
            flex:1,
            justifyContent:'center',
            
    },
    cardSectionStyle:{
        justifyContent:'center'
    },
    textStyle:{
            flex:1,
            textAlign:'center',
            fontSize:20,
            lineHeight:40,
            color:'white'
    }
    
})
export {Confirm};