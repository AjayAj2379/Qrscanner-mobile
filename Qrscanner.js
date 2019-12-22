import React, { Component, Fragment } from 'react';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {View,Text,Button,StyleSheet,Dimensions} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import firebase from './firebase/config';




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

            firebase.firestore().collection('ah').onSnapshot((query)=>{
        const list=[];
      
        query.forEach(doc=>{
          const {title,complete} = doc.data();
          list.push({
            id:doc.id,
            title,
            complete
          });
          console.log(doc)
          console.log(doc.data().name)
        });
      
        console.log(list)
      })
        
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


    // firebase.firestore().collection('ah').onSnapshot((query)=>{
    //     const list=[];
      
    //     query.forEach(doc=>{
    //       const {title,complete} = doc.data();
    //       list.push({
    //         id:doc.id,
    //         title,
    //         complete
    //       });
    //       console.log(doc)
    //       console.log(doc.data().name)
    //     });
      
    //     console.log(list)
    //   })
  
    render(){
        const { scan, ScanResult, result,heights  } = this.state
        return(
            <View style={styles.container}>
                        
                 

                   {scan &&
                   <View style={styles.container}>
                    <View style={{marginTop:heights-(heights- (heights)*10/100), 
                    borderColor:'transparent',
                    borderWidth:1,
                    elevation:5,
                    backgroundColor:'#AFEEEF',
                    padding:10 }}>
                   <Text style={styles.textContainer}>QR CODE SCANNER</Text>
                   </View>
                   <View style={{flex:1}}>
                    <QRCodeScanner
                   
                    topViewStyle={{marginBottom:10}}
                    cameraStyle={{height: heights>500?"75%":"85%"  , width: heights>500?"70%":"35%", alignSelf: 'center', justifyContent: 'center',}}
                            reactivate={true}
                            showMarker={false}
                           
                            ref={(node) => { this.scanner = node }}
                            onRead={this.onSuccess}
                           
                           
                           
                        
                        />
                        </View>
                        </View>}

                        {ScanResult && 
                        <View style={styles.container} >
                            <Text>Rc Number : {result}</Text>
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
        fontSize:30,
        fontStyle:'italic',
     
        
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