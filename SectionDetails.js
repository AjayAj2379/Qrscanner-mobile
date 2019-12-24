import React from 'react';
import {View,FlatList} from 'react-native';
import { Container, Header, Content, List, ListItem, Text } from 'native-base';
import Cards from './card/card'



class SectionDetails extends React.Component{

    constructor(props){
        super(props);

        this.state={

            values:[
                {name:'Simon Mignolet',class:'fsdfsf',key:'4'},
                {name:'d',class:'fsdfsf',key:'3'},
                {name:'adasdad',class:'fsdfsf',key:'2'},
                {name:'dd',class:'fsdfsf',key:'1'},
                {name:'d',class:'fsdfsf',key:'11'},
                {name:'ad',class:'fsdfsf',key:'12'},
                {name:'ooiad',class:'fsdfsf',key:'13'},
                {name:'dadhjhjh',class:'fsdfsf',key:'14'},
                {name:'dadjkhjh',class:'fsdfsf',key:'15'},
                {name:'dahjd',class:'fsdfsf',key:'16'},
                {name:'dahhjd',class:'fsdfsf',key:'157'},
                {name:'dadjhjkh',class:'fsdfsf',key:'166'},
                {name:'dadkjkjkjkk',class:'fsdfsf',key:'178'},
                {name:'dadbjjjjhjhjjjj',class:'fsdfsf',key:'144'},
                {name:'dadhhjkjhjh',class:'fsdfsf',key:'17'},
                {name:'dadkuiuiuuu',class:'fsdfsf',key:'18'},
        ]
        }

    }

    componentDidMount(){


    }

    render()
    {

        return(
            <View style={{flex:1}}>
             <List>

            <FlatList
            data={this.state.values}
            renderItem={({item,index})=>(
                <Cards style={{padding:1,elevation:5,borderWidth:1}}>
                <ListItem>
                    <Text style={{fontSize:16,fontWeight:'bold'}}>{item.name}</Text>
                </ListItem>
                </Cards>
               
            )}
            keyExtractor={(item,index)=>index.toString()}
           
            ></FlatList>
          
          </List>
      

            </View>
        )
    }
}

export default SectionDetails