import React from 'react';
import {View,StyleSheet,TouchableOpacity } from 'react-native';
import {List,ListItem,Left,Right,Text,Container,Header,Content,Badge} from 'native-base'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Cards from './card/card'

class Details extends React.Component{
    componentDidMount(){

        console.log('detais')
    }
    componentDidUpdate(){
        console.log('cdu')
    }
    // componentWillUpdate(){
    //     console.log('cwu')
    // }


    render(){

        return(
            <View style={styles.container}>
            <TouchableOpacity>
              <Cards style={{padding:1}} >
                <View style={styles.ListItems}>
                    <Text style={{fontStyle:'italic',fontSize:22,fontWeight:'bold'}}>WC1</Text>
                    <View style={{marginLeft:'2%'}}>
                         <Badge success>
                            <Text style={{color:'white',fontWeight:'bold'}}>2</Text>
                        </Badge>
                      </View>
                    <Icon style={{position:'absolute', right:'5%'}} name='arrow-forward' size={24}></Icon>
                 </View>
                </Cards>               
            </TouchableOpacity>

            <TouchableOpacity>
              <Cards style={{padding:1}} >
                <View style={styles.ListItems}>
                    <Text style={{fontStyle:'italic',fontSize:22,fontWeight:'bold'}}>BEMCO</Text>
                    <View style={{marginLeft:'2%'}}>
                         <Badge success>
                            <Text style={{color:'white',fontWeight:'bold'}}>2</Text>
                        </Badge>
                      </View>
                    <Icon style={{position:'absolute', right:'5%'}} name='arrow-forward' size={24}></Icon>
                 </View>
                </Cards>               
            </TouchableOpacity>        

            <TouchableOpacity>
              <Cards style={{padding:1}} >
                <View style={styles.ListItems}>
                    <Text style={{fontStyle:'italic',fontSize:22,fontWeight:'bold'}}>HYD</Text>
                    <View style={{marginLeft:'2%'}}>
                         <Badge success>
                            <Text style={{color:'white',fontWeight:'bold'}}>2</Text>
                        </Badge>
                      </View>
                    <Icon style={{position:'absolute', right:'5%'}} name='arrow-forward' size={24}></Icon>
                 </View>
                </Cards>               
            </TouchableOpacity>
            
            <TouchableOpacity>
              <Cards style={{padding:1}} >
                <View style={styles.ListItems}>
                    <Text style={{fontStyle:'italic',fontSize:22,fontWeight:'bold'}}>HAB</Text>
                      <View style={{marginLeft:'2%'}}>
                         <Badge success>
                            <Text style={{color:'white',fontWeight:'bold'}}>2</Text>
                        </Badge>
                      </View>
                    <Icon style={{position:'absolute', right:'5%'}} name='arrow-forward' size={24}></Icon>
                 </View>
                </Cards>               
            </TouchableOpacity>

            <TouchableOpacity>
              <Cards style={{padding:1}} >
                <View style={styles.ListItems}>
                    <Text style={{fontStyle:'italic',fontSize:22,fontWeight:'bold'}}>QC</Text>
                    <View style={{marginLeft:'2%'}}>
                         <Badge success>
                            <Text style={{color:'white',fontWeight:'bold'}}>2</Text>
                        </Badge>
                      </View>
                    <Icon style={{position:'absolute', right:'5%'}} name='arrow-forward' size={24}></Icon>
                 </View>
                </Cards>               
            </TouchableOpacity>
           
            
            
           </View>
        );
    }

}

const styles = StyleSheet.create({

    container:{
        padding:10,
        flex: 1, 
        justifyContent: "flex-start",
        backgroundColor:"white",
        marginTop:'10%' 
       

    },

    ListItems:{
        width:"95%",
        backgroundColor:"#cde1f9",
        margin:5,
        padding:10,
        flexDirection:"row",
        alignItems:"center",
        textAlign:"center",
        justifyContent:"center"

    }


});

export default Details;