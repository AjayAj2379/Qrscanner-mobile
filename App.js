import React, { Component, Fragment } from 'react';
import QRCodeScanner from 'react-native-qrcode-scanner';
import Icon from 'react-native-vector-icons/MaterialIcons'
import Sample from './sample'
import Qrcode from './Qrscanner'
import { Container, Header, Content, Button, Text,Tab,Tabs } from 'native-base';
import Details from './Details';
import SectionDetails from './SectionDetails';
import {createAppContainer,createSwitchNavigator} from 'react-navigation'
import {createBottomTabNavigator} from 'react-navigation-tabs'
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs'
import {
    TouchableOpacity,  
    StatusBar,
    Linking,
    View
} from 'react-native';

const AppContainer = createMaterialBottomTabNavigator({

    Qr:{
        screen:Qrcode
    },
    Details:Details
},{
    initialRouteName: 'Qr',
    activeColor: '#f0edf6',
    inactiveColor: '#3e2465',
    barStyle: { backgroundColor: '#694fad' },
})

const Navigator = createAppContainer(AppContainer)

class App extends React.Component{

  render(){

    return(
        
        <View style={{flex:1}}>
     
     {/* <Tabs>
         <Tab 
        activeTextStyle={{fontStyle:'italic',fontWeight:'bold',fontSize:20,color:'white'}}
        textStyle={{fontSize:20,color:'white'}}
         heading = 'Qrcode'>
            <Qrcode></Qrcode>
         </Tab>

         <Tab
          activeTextStyle={{fontStyle:'italic',fontWeight:'bold',fontSize:20,color:'white'}}
        textStyle={{fontSize:20,color:'white'}} 
         heading= 'Details'>

         <Details></Details>

         </Tab>
     </Tabs> */}
     <Navigator></Navigator>

        </View>
    
        
    );
}
}

 export default App;