import React, { Component, Fragment,useEffect } from 'react';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {View,StyleSheet,Dimensions,ScrollView,ActivityIndicator} from 'react-native'
import AsyncStorage  from '@react-native-community/async-storage'
import Icon from 'react-native-vector-icons/MaterialIcons'
import firebase from './firebase/config';
import Cards from './card/card'
import Loading from './loading'
import { Container, Header, Content, Card, CardItem, Text, Body,Button,Toast } from "native-base";




class Qrcode extends React.Component{
   
  
   
    constructor(props) {
        super(props);
      console.log('constr')
     
        this.state = {
            scan: true,
            ScanResult: false,
            unKnown:false,
            loading:false,
            result: null,
            heights:Math.round (Dimensions.get('window').height),
            places :[],
            RcNumber:'',
            MemberNumber:'',
            LotNumbr:'',
            W_C:'',
            section:'',
            length:'',
            quantity:'',
            weight:'',
            operation:'',
            bemco:false,
            hyd:false,
            qc:true,
            hab:false
                    
        };    
        
      

    }
    
    
    
  componentDidMount(){

    //     firebase.firestore().collection('values').onSnapshot((query)=>{
    //     const list=[];
    //     console.log(query);
      
    //     query.forEach(doc=>{
    //       const {title,complete} = doc.data();
    //       this.setState({
    //           result:doc.id
    //       })
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
        
    // this.setState({loading:true})
    // firebase.firestore().collection('values').doc('12').onSnapshot((query)=>{
     
    //     console.log(query.data());
    //     let values = query.data();
    //     this.setState({
                
    //         RcNumber:values.RcNumber,
    //         MemberNumber:values.MemberNo,
    //         LotNumbr:values.LotNumber,
    //         W_C:values.W_C,
    //         section:values.Section,
    //         length:values.Length,
    //         quantity:values.Qty,
    //         weight:values.Weight,
    //         operation:values.operation,
    //         bemco:values.BEMCO,
    //         hyd:values.HYD,
    //         qc:values.Qc,
    //         hab:values.HAB,
    //         loading:false

    //     })
        
    // })

        console.log("cdm");
        console.log(Dimensions.get('window').height)
        console.log(this.state.heights)
       
       
    }

 
    onSuccess=(e)=>{
        console.log(e);
        this.setState({
            scan: false,
            
            result: e.data
        })

        console.log(e)
        console.log(e.data)
            let id = e.data
        this.setState({loading:true})
        
    firebase.firestore().collection('values').doc(id).onSnapshot((query)=>{
        
         console.log(query)
         if(query.exists)
         {
            console.log(query.data());
            let values = query.data();
            this.setState({
                ScanResult: true, 
                RcNumber:values.RcNumber,
                MemberNumber:values.MemberNo,
                LotNumbr:values.LotNumber,
                W_C:values.W_C,
                section:values.Section,
                length:values.Length,
                quantity:values.Qty,
                weight:values.Weight,
                operation:values.operation,
                bemco:values.BEMCO,
                hyd:values.HYD,
                qc:values.Qc,
                hab:values.HAB,
                loading:false
    
            })
            
         }
         else{

            this.setState({
                unKnown:true,
                loading:false,
                

            })

         }
               
            })
    
    
        
      
    }

    scanAgain=()=>{
        console.log('called');
        this.setState({

            scan:true,
            ScanResult:false,
            unKnown:false,
            
        })
    }



  
    render(){
    
        const { scan, ScanResult, result,heights,bemco,hyd,hab,loading,qc,unKnown  } = this.state

        return(
           <View style={{flex:1}}>
           
           {loading &&
         <Loading></Loading>
                    
           }
                 {unKnown && !loading &&
                    <View style={styles.container}>
                           <Cards style={{alignItems:'center'}}> 
                     <Text style={styles.resulttext}>{result}</Text>   
                     <Text style={styles.resulttext}>This item is not in database</Text>                     
                         </Cards>

                         <Cards>
                              <View style={{alignItems:'center'}}> 
                                 <Button rounded onPress={this.scanAgain}>
                                      <Text>
                                          Click to Scan again
                                      </Text>
                                  </Button>
                              </View>
                                  
                              </Cards>
                 </View>
                 }       
                 

                   {scan && !loading &&
                   <View style={styles.container}>
                    <View style={{marginTop:'5%', 
                    borderColor:'transparent',
                    borderWidth:1,
                    borderRadius:10,
                    elevation:5,
                    backgroundColor:'white',
                    padding:20,
                    marginBottom:20 }}>
                   <Text style={styles.textContainer}>QR CODE SCANNER</Text>
                   </View>
                   
                   <View style={{flex:1}}>
                    <QRCodeScanner
                   
            
                    cameraStyle={{height:"75%"  , width: "70%", alignSelf: 'center', justifyContent: 'center',}}
                            reactivate={true}
                            showMarker={false}
                           
                            ref={(node) => { this.scanner = node }}
                            onRead={this.onSuccess}
                           
                           
                           
                        
                        />
                        
                        </View>
                        </View>}

                        {ScanResult && !loading && 

                                <View style={styles.container,{width:'100%',backgroundColor:'white'}}>
                                <View style={{flex:1,margin:'10%',alignItems:'center',marginTop:'5%'}}>
                                    <Text style={[styles.textContainer,{fontStyle:'normal',fontSize:24 }]}>Results for {this.state.RcNumber}</Text>
                                </View>
                                <ScrollView>

                               <Cards style={{alignItems:"flex-start",backgroundColor:'seashell'}}>
                                <View style={{marginLeft:'10%'}}>
                                    <Text style={styles.resulttext} >Rc No : <Text style={[styles.resulttext,{color:'#6A5ACD'}]}>{this.state.RcNumber}</Text> </Text>
                                    <Text style={styles.resulttext} >Member no : <Text style={[styles.resulttext,{color:'#6A5ACD'}]}>{this.state.MemberNumber}</Text></Text>
                                    <Text style={styles.resulttext} >Lot No : <Text style={[styles.resulttext,{color:'#6A5ACD'}]}>{this.state.LotNumbr}</Text></Text>
                                    <Text style={styles.resulttext} >Length : <Text style={[styles.resulttext,{color:'#6A5ACD'}]}>{this.state.length}</Text></Text>
                                    <Text style={styles.resulttext} >Quantity : <Text style={[styles.resulttext,{color:'#6A5ACD'}]}>{this.state.quantity}</Text></Text>
                                    <Text style={styles.resulttext} >Weight : <Text style={[styles.resulttext,{color:'#6A5ACD'}]}>{this.state.weight}</Text></Text>
                                    <Text style={styles.resulttext} >Operation : <Text style={[styles.resulttext,{color:'#6A5ACD'}]}>{this.state.operation}</Text></Text>
                                    <Text style={styles.resulttext} >Section : <Text style={[styles.resulttext,{color:'#6A5ACD'}]}>{this.state.section}</Text></Text>
                                    <Text style={styles.resulttext} >W/C : <Text style={[styles.resulttext,{color:'#6A5ACD'}]}>{this.state.W_C}</Text></Text>

                                </View>
                               
                              </Cards>

                              <Cards style={{alignItems:'center',backgroundColor:'seashell'}}>
                              <View style={{margin:10,}}>
                                  <Text style={[styles.resulttext,{fontStyle:'normal'}]}> Move to </Text>
                              </View>
                              <View style={{width:'100%',flexDirection:'row',justifyContent:'space-around'}}>
                              <View >
                              <Button success disabled={!bemco} rounded>
                                  <Text>
                                      BEMCO
                                  </Text>
                              </Button>
                              </View>
                              <View>
                              <Button success rounded disabled={!hyd}>
                                  <Text>
                                     HYD
                                  </Text>
                              </Button>
                              </View>
                              <View>
                              <Button 
                              success
                               rounded 
                               disabled={!hab}
                              
                               >
                                  <Text>
                                      HAB
                                  </Text>
                              </Button>
                              </View>
                              <View>
                              <Button success rounded disabled={!qc}>
                                  <Text>
                                     QC
                                  </Text>
                              </Button>
                              </View>
                              </View>
                              </Cards>

                              <Cards>
                              <View style={{alignItems:'center'}}> 
                                 <Button rounded onPress={this.scanAgain}>
                                      <Text>
                                          Click to Scan again
                                      </Text>
                                  </Button>

                              </View>
                                  
                              </Cards>
                                   

                                
                                <View style={{height:150}}>
                                </View>
                                                                     
                                </ScrollView>
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
        backgroundColor:"#AEEE"

    },
    textContainer:{
        fontWeight:"bold",
        fontSize:30,
        fontStyle:'italic',
     
        
    },

    resulttext:{
        fontSize:18,
        fontWeight:'bold',
        fontStyle:'italic',
        marginBottom:5

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