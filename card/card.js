import React from 'react';
import {View,StyleSheet,Text} from 'react-native';

const Cards = props =>{
    
    return (
     <View style={{...styles.card, ...props.style}}>
        {props.children}
     </View>
    );

};

const styles = StyleSheet.create({

    card:{
        alignSelf:'center',        
        elevation:10,  
        borderWidth:5,
        width:'90%',
        backgroundColor:'white',
        margin:10,
        padding:20,
        borderColor:'white',
        borderRadius:10,
    }
})

export default Cards;