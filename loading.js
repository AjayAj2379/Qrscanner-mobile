import React from 'react';
import {View,ActivityIndicator,StyleSheet} from 'react-native';
import Cards from './card/card'

const Loading = (props) =>{

    return (
        <View style={[styles.container,{backgroundColor:'#AEEE'}]}> 
        <Cards style={{backgroundColor:'seashell',width:'40%'}}>
        <ActivityIndicator size='large'></ActivityIndicator>

        </Cards>
       
        </View>
    )
}

const styles = StyleSheet.create({

    container:{
        flex:1,
        justifyContent:'center',
        alignItems:"center",
        backgroundColor:"#AEEE"

    },
})

export default Loading;