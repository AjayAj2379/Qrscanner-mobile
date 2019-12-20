import React, { Component, Fragment } from 'react';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {View,Text,Button,StyleSheet,Dimensions} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import firebase from 'react-native-firebase'



class Qrcode extends React.Component{
   
  
   
    constructor(props) {
        super(props);
      
       
        this.state = {
            scan: true,
             ScanResult: false,
            result: null,
            heights:Math.round (Dimensions.get('window').height),
                    
        };      

    }
    
    componentDidMount(){

        firebase.firestore().collection('food').add({name:'ajay'}).then(()=>{console.log('succs')})
        
        console.log("cdm");
        console.log(Dimensions.get('window').height)
        console.log(this.state.heights)
        Dimensions.addEventListener('change',dims=>{

           
            let h= Math.round (Dimensions.get('window').height);
            console.log(h);
            console.log(dims.window.height)
            this.setState({
              heights: h
            })
         });
       
    }

 
    onSuccess=(e)=>{
        console.log(e);
        this.setState({
            scan: false,
            ScanResult: true,
            result: e.data
        })
            
        

      
    }

    render(){
        const { scan, ScanResult, result,heights  } = this.state
        return(
            <View style={styles.container}>
                        
                 

                   {scan &&
                   <View style={styles.container}>
                    <View style={{marginTop:heights-(heights- (heights)*10/100), borderColor:'transparent',borderWidth:1 }}>
                   <Text style={styles.textContainer}>QR code Scanner</Text>
                   </View>
                   <View style={{flex:1}}>
                    <QRCodeScanner
                   
                    topViewStyle={{marginBottom:10}}
                    cameraStyle={{height: heights>500?"65%":"85%"  , width: heights>500?"60%":"35%", alignSelf: 'center', justifyContent: 'center',}}
                            reactivate={true}
                            showMarker={false}
                           
                            ref={(node) => { this.scanner = node }}
                            onRead={this.onSuccess}
                            topContent={
                                <View>
                                     <Text style={{fontWeight:"bold"}}>

                                Place the Qrcode with in the Squares
                                    </Text>
                                    <Icon name="error" size={20}></Icon>

                                </View>
                               
                            }
                           
                           
                        
                        />
                        </View>
                        </View>}

                        {ScanResult && 
                        <View style={styles.container} >
                      <Text>{result}</Text>
                        </View>

                        }

                      
          
            </View>
        );
    }
}

const styles =StyleSheet.create({

    container:{
        flex:1,
        justifyContent:'center',
        alignItems:"center",
        backgroundColor:"#AFEEEE"

    },
    textContainer:{
        fontWeight:"bold",
        fontSize:30
    },
   
    rectangleContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent'
      },
      rectangle: {
        
      
        borderWidth: 2,
        borderColor: 'red',
        backgroundColor: 'transparent'
      }
})

export default Qrcode;