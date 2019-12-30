import React, { Component, Fragment,useEffect } from 'react';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {View,StyleSheet,Dimensions,ScrollView,ActivityIndicator,Alert,AsyncStorage,PermissionsAndroid,NativeModules} from 'react-native'
import NetInfo from '@react-native-community/netinfo'
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
            
                RcNumber:'',
                MemberNumber:'',
                LotNumbr:'',
                W_C:'',
                section:'',
                length:'',
                quantity:'',
                weight:'',
                operation:'',
                area:'',
                bemco:false,
                hyd:false,
                qc:true,
                hab:false,
                finish:false,
                workcentre:'',
            
            scan: true,
            ScanResult: false,
            unKnown:false,
            loading:false,
            result: null,
            isRender:true,
            heights:Math.round (Dimensions.get('window').height),
            places :[],
            online:true,
            currentSection:'',
                    
        };    
        
      
    
    }
    
    componentDidMount(){
            //Get element from the firestore on scanning with the ID

            // NetInfo.fetch().then(conn =>{

            //     console.log(conn.type);
            //     console.log(conn.isConnected)
            // })
            this.setState({
                isRender:true
            })
            console.disableYellowBox = true;
            
            NetInfo.addEventListener(connection =>{

                console.log('connection type '+ connection.isConnected)
                console.log('connection '+ connection.isInternetReachable)

                this.setState({
                    online: connection.isConnected
                })
            })

            let id='12321';
            console.log('fssfsf')
            this.props.navigation.addListener('willFocus',(route)=>{

                this.setState({
                    isRender:true
                })
            })
           
            this.props.navigation.addListener('willBlur',(route)=>{
                this.setState({
                    isRender:false
                })
            })
      
              //   

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
            console.log('dfdfdffd')
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
                    finish:values.finish,
                    workcentre: values.workcentre,          
                   loading:false,
                   
       
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


        showToast = (section,id) =>{
            console.log('show toast');

            Alert.alert(
                'Alert',
                'Are you sure to move to '+section+'?',
                [
                    {text:'Yes', onPress: ()=> this.changeSection(section,id)},
                    {text:'No', style:'cancel',onPress:()=> console.log('no')},
                ],
                {cancelable:false}
            );

            
        }

    changeSection = (section,id) =>{

            console.log('changeSection '+section,id)
          //Selecting the ID present in an array (BEMCO,HYD,HAB,QC,WC)
   
         firebase.firestore().collection('details').where('id','array-contains',this.state.RcNumber).get().then((snapshot)=>{
   
            snapshot.docs.forEach(doc=>{

                this.setState({
                    currentSection:doc.id
                })
                console.log(doc.id,doc.data())

            })
        }).then(()=>{
            console.log(section,id)

            if(section==='BEMCO')
            {
                firebase.firestore().collection('values').doc(id).update({BEMCO:false}).then(()=>{
                    console.log('current section '+this.state.currentSection)
                    console.log('call rempve')
                    this.removeArray(section,id)
                }).then(()=>{
                    console.log('current section '+this.state.currentSection)
                    console.log('call add')
                    this.addArray(section,id)
                })
            
            }
            else if (section ==='HYD')
            {
                firebase.firestore().collection('values').doc(id).update({HYD:false}).then(()=>{
                    console.log('current section '+this.state.currentSection)
                    console.log('call rempve')
                    this.removeArray(section,id)
                }).then(()=>{
                    console.log('current section '+this.state.currentSection)
                    console.log('call add')
                    this.addArray(section,id)
                })
            }
    
            else if(section==='HAB')
            {
                firebase.firestore().collection('values').doc(id).update({HAB:false}).then(()=>{
                    console.log('current section '+this.state.currentSection)
                    console.log('call rempve')
                    this.removeArray(section,id)
                }).then(()=>{
                    console.log('current section '+this.state.currentSection)
                    console.log('call add')
                    this.addArray(section,id)
                })
            }
            else if(section==='QC')
            {
                firebase.firestore().collection('values').doc(id).update({Qc:false,finish:true}).then(()=>{
                    console.log('current section '+this.state.currentSection)
                    console.log('call rempve')
                    this.removeArray(section,id)
                }).then(()=>{
                    console.log('current section '+this.state.currentSection)
                    console.log('call add')
                    this.addArray(section,id)
                })
            }
            else if(section==='Finished')
            {
                firebase.firestore().collection('values').doc(id).update({finish:false}).then(()=>{
                    console.log('current section '+this.state.currentSection)
                    console.log('call rempve')
                    this.removeArray(section,id)
                }).then(()=>{
                    console.log('current section '+this.state.currentSection)
                    console.log('call add')
                    this.addArray(section,id)
                })
            }
        })
        

       
       

      
        
    }

    addArray = (section,id) =>{

 // // //Add the element in the array
            console.log('add Array to '+section )
            const  refer = firebase.firestore().collection('details').doc(section)
            .update({id: firebase.firestore.FieldValue.arrayUnion(id)}).then(()=>{

                this.setState({
                    currentSection:section
                })
                    alert('Moved to '+section)

                console.log(this.state.currentSection)
            })

                
    }           

    removeArray = (section,id) =>{
console.log('remove array to'+this.state.currentSection)
// //Remove the element in the array
console.log(id)

        const  ref = firebase.firestore().collection('details').doc(this.state.currentSection).
        update({id: firebase.firestore.FieldValue.arrayRemove(id)})      
    }


  
    render(){
    
        const { scan, ScanResult, result,heights,loading,unKnown ,RcNumber,bemco,hyd,hab,qc,isRender,finish,online } = this.state

        return(
           <View style={{flex:1}}>


               {!online && 
               
               <View style={styles.container}>
                           <Cards style={{alignItems:'center'}}>    
                     <Text style={styles.resulttext}>You are offline</Text>                     
                         </Cards>
                </View>
               }
           
           {loading &&
         <Loading></Loading>
                    
           }
                 {unKnown && !loading && online &&
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
                 

                   {scan && !loading && isRender && online &&
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
                            reactivateTimeout={2000}
                            showMarker={false}
                           
                            ref={(node) => { this.scanner = node }}
                            onRead={this.onSuccess}
                           
                           
                           
                        
                        />
                        
                        </View>
                        </View>}

                        {ScanResult && !loading && online &&

                                <View style={styles.container,{width:'100%',backgroundColor:'white'}}>
                                <View style={{flex:1,margin:'10%',alignItems:'center',marginTop:'5%'}}>
                                    <Text style={[styles.textContainer,{fontStyle:'normal',fontSize:18 }]}>Results for {this.state.RcNumber}</Text>
                                </View>
                                <ScrollView>

                               <Cards style={{alignItems:"flex-start",backgroundColor:'seashell'}}>
                                <View style={{marginLeft:0}}>
                                    <Text style={styles.resulttext} >Rc No : <Text style={[styles.resulttext,{color:'#6A5ACD'}]}>{this.state.RcNumber}</Text> </Text>
                                    <Text style={styles.resulttext} >Member no : <Text style={[styles.resulttext,{color:'#6A5ACD'}]}>{this.state.MemberNumber}</Text></Text>
                                    <Text style={styles.resulttext} >Lot No : <Text style={[styles.resulttext,{color:'#6A5ACD'}]}>{this.state.LotNumbr}</Text></Text>
                                    <Text style={styles.resulttext} >Length : <Text style={[styles.resulttext,{color:'#6A5ACD'}]}>{this.state.length}</Text></Text>
                                    <Text style={styles.resulttext} >Quantity : <Text style={[styles.resulttext,{color:'#6A5ACD'}]}>{this.state.quantity}</Text></Text>
                                    <Text style={styles.resulttext} >Weight : <Text style={[styles.resulttext,{color:'#6A5ACD'}]}>{this.state.weight}</Text></Text>
                                    <Text style={styles.resulttext} >Operation : <Text style={[styles.resulttext,{color:'#6A5ACD'}]}>{this.state.operation}</Text></Text>
                                    <Text style={styles.resulttext} >Section : <Text style={[styles.resulttext,{color:'#6A5ACD'}]}>{this.state.section}</Text></Text>
                                    <Text style={styles.resulttext} >W/C : <Text style={[styles.resulttext,{color:'#6A5ACD'}]}>{this.state.W_C}</Text></Text>
                                    <Text style={styles.resulttext} >Work Sections : <Text style={[styles.resulttext,{color:'#6A5ACD'}]}>{this.state.workcentre}</Text></Text>

                                </View>
                               
                              </Cards>

                              <Cards style={{alignItems:'center',backgroundColor:'seashell'}}>
                              <View style={{margin:10,}}>
                                  <Text style={[styles.resulttext,{fontStyle:'normal'}]}> Move to </Text>
                              </View>
                              <View style={{width:'100%',flexDirection:'row',justifyContent:'space-around'}}>
                              <View >
                              <Button
                              onPress={()=>this.showToast('BEMCO', RcNumber)} 
                              success disabled={!bemco} rounded>
                                  <Text>
                                      BEMCO
                                  </Text>
                              </Button>
                              </View>
                              <View>
                              <Button 
                               onPress={()=>this.showToast('HYD',RcNumber)} 
                              success rounded disabled={!hyd}>
                                  <Text>
                                     HYD
                                  </Text>
                              </Button>
                              </View>
                              <View>
                              <Button 
                               onPress={()=>this.showToast('HAB',RcNumber)} 
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
                              <Button
                               onPress={()=>this.showToast('QC',RcNumber)} 
                              success rounded disabled={!qc}>
                                  <Text>
                                     QC
                                  </Text>
                              </Button>
                              </View>
                              </View>
                              </Cards>

                              <Cards>
                                  <View style={{alignItems:'center'}}>
                                      <Button rounded warning disabled={!finish}
                                      onPress={()=>this.showToast('Finished',RcNumber)}
                                      >
                                          <Text>Move to finish</Text>
                                      </Button>
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