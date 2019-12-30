import React from 'react';
import {View,StyleSheet,TouchableOpacity,FlatList,Alert,TextInput } from 'react-native';
import {List,ListItem,Left,Right,Text,Container,Header,Content,Badge,Button} from 'native-base'
import NetInfo from '@react-native-community/netinfo'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Cards from './card/card';
import firebase from './firebase/config';
import  Loading from './loading';
import {SearchableFlatList} from  'react-native-searchable-list'
class Details extends React.Component{

  constructor(props){

    super(props);
    
    this.state ={
    
      
    count:[{
      id:'',
      length:''
    }],

    loading:false,
    details:true,
    section:false,
    current:'',

    info:[{id:'',doc:''}],
    length:false,
    online:true,
    searchTerm: "",
    searchAttribute: "id",
    ignoreCase: true,
    

    }
  }

  


  componentDidMount(){
    console.disableYellowBox = true;

    NetInfo.addEventListener(connection =>{

      console.log('connection type '+ connection.isConnected)
      console.log('connection '+ connection.isInternetReachable)

      this.setState({
          online: connection.isConnected
      })
  })

  

    
   this.callFirestore();

    
    this.props.navigation.addListener('willFocus',(route)=>{

      this.setState({
        loading:true,
        length:false,
        section:false,
        details:true
      })
      firebase.firestore().collection('details').get().then((snapshot)=>{

        this.setState({
          count:[]
        })

        snapshot.docs.forEach(doc=>{

          console.log(doc)
           console.log(doc.data().id.length)
           this.setState(prev=>{
           return{

                count: prev.count.concat({
    
                    id: doc.id,
                    length: doc.data().id.length})
                }
           });
        })
        this.setState({loading:false})
        console.log(this.state.count)
      })
     
     
  })
 
  // this.props.navigation.addListener('willBlur',(route)=>{
  //     this.setState({
  //         isRender:false
  //     })
  // })

       
    }


    callFirestore = () =>{

      this.setState({
        loading:true
      })
      firebase.firestore().collection('details').get().then((snapshot)=>{
  
        this.setState({
          count:[]
        })
  
        snapshot.docs.forEach(doc=>{
  
          console.log(doc)
           console.log(doc.data().id.length)
           this.setState(prev=>{
           return{
  
                count: prev.count.concat({
    
                    id: doc.id,
                    length: doc.data().id.length})
                }
           });
        })
        this.setState({loading:false})
        console.log(this.state.count)
      })
    }
    componentDidUpdate(){
       
    }
    
    onClick = (id) =>{

      console.log(id)
      this.setState({
        loading:true,
        details:false,
        current:id,

      })

      
      this.callFirestore();

        firebase.firestore().collection('details').doc(id).onSnapshot((query)=>{

          this.setState({
            info:[],
            section:true,
          })
          if(query.data().id.length ===0)
          {
            console.log('succcccccccccccccc')
            this.setState({
              length:true,
              section:false,
            })
          }
          console.log('lnejsdjhsdhf'+query.data().id.length)


          for(i=0;i<query.data().id.length;i++)
          {

            this.setState(prev =>{

              return{
                info: prev.info.concat({
                  id:query.data().id[i],
                  doc:id,
                  length:query.data().id.length
                })
              }
              
            });
          }

          this.setState({loading:false})
          console.log(this.state.info)
        })

    }

    closeDetails=()=>{

      this.callFirestore()
      this.setState({
        section:false,
        details:true,
        length:false
      })
    }

    onDelete = (id)=>{

        console.log(id);
        
        Alert.alert(
          'Alert',
          'Are you sure to Delete?',
          [
              {text:'Yes', onPress: ()=> firebase.firestore().collection('details').doc('Finished').update({id:firebase.firestore.FieldValue.arrayRemove(id)})},
              {text:'No', style:'cancel',onPress:()=> console.log('no')},
          ],
          {cancelable:false}
      );

        //firebase.firestore().collection('details').doc('Finished').update({id:firebase.firestore.FieldValue.arrayRemove(id)})
    }


    render(){

     

      const {loading,details,section,length,online,searchTerm,searchAttribute,ignoreCase} = this.state

        return(
            <View style={{flex:1}}>

                    
               {!online && 
               
               <View style={[styles.container,{justifyContent:"center"}]}>
                           <Cards style={{alignItems:'center'}}> 
                     <Text style={styles.resulttext}>You are offline</Text>                     
                         </Cards>
                </View>
               }
           

                  {loading && <Loading></Loading>}


                  {!loading && details && !length && online &&
                  <View style={styles.container}>
                    <View style={{marginTop:'10%',height:'100%'}}>
                  <FlatList
               style={{marginBottom:'20%'}}
              data={this.state.count}
              renderItem={({item,index})=>(
                <View>               
                <TouchableOpacity onPress={()=>this.onClick(item.id)}>
                <Cards style={{padding:1,width:'90%'}} >
                  <View style={styles.ListItems}>
                   <Text style={{fontStyle:'italic',fontSize:22,fontWeight:'bold'}}>{item.id}</Text>
                      <View style={{marginLeft:'2%'}}>
                           <Badge success>
                     <Text style={{color:'white',fontWeight:'bold'}}>{item.length}</Text>
                          </Badge>
                        </View>
                      <Icon style={{position:'absolute', right:'5%'}} name='arrow-forward' size={24}></Icon>
                   </View>
                  </Cards>               
              </TouchableOpacity>
              </View>

               
            )}
            keyExtractor={(item,index)=>index.toString()}

              >

              </FlatList>
              </View>
              </View>

                  
                  }

                  
              {length && online &&
                  <View style={styles.container}>
                    <View style={{marginTop:20,flexDirection:'row',marginBottom:20,padding:10}}>
                  <View style={{width:'30%',marginRight:10,alignItems:'center',paddingHorizontal:20}}>
                  <Button iconLeft primary rounded style={{padding:10}} 
                  onPress={this.closeDetails}
                  >
                      <Icon name='arrow-back' size={24}></Icon>
                    </Button>
                   </View>
                    <View style={{justifyContent:'center'}}>
                    <Text style={[styles.textContainer,{fontStyle:'italic',fontSize:22 }]}>Results for {this.state.current}</Text>
                    </View>     
                 </View>
                  <Cards style={{padding:10}}>
                    <View style={{alignItems:'center'}}>
                    <Text style={{fontWeight:'bold'}}>No Results</Text>
                    </View>
                   
                  </Cards>
                  </View>
                  } 
              
              {!loading && section && !length && online && !details &&

              <View style={styles.container}>
                
                <View style={{marginTop:20,flexDirection:'row',marginBottom:10,padding:10}}>
                  <View style={{width:'30%',marginRight:10,alignItems:'center',paddingHorizontal:20}}>
                  <Button iconLeft primary rounded style={{padding:10}} 
                  onPress={this.closeDetails}
                  >
                      <Icon name='arrow-back' size={24}></Icon>
                    </Button>
                   </View>
                    <View style={{justifyContent:'center'}}>
                    <Text style={[styles.textContainer,{fontStyle:'italic',fontSize:22 }]}>Results for {this.state.current}</Text>
                    </View>     
                 </View>
                 

             
                
                <View>  
                  <View style={{alignItems:'center',flexDirection:'row',}}>
                    
                  <TextInput
                style={{paddingHorizontal: 10,
                  width:'95%',
                  margin: 10,
                  height: 50,
                  backgroundColor:'white',
                  borderColor: "black",
                  borderWidth:2,
                  borderRadius:15,
                  fontSize: 18}}
                 placeholder={"Search"}
                 onChangeText={searchTerm => this.setState({ searchTerm })} />

                 <Icon name='search' style={{padding:10,position:'absolute',right:'5%'}} size={28} color='grey'></Icon>
                  </View>
               
 
            <SearchableFlatList 
            style={{marginBottom:'30%'}} data={this.state.info} searchTerm={searchTerm}
              searchAttribute={searchAttribute} ignoreCase={ignoreCase} 
              renderItem={({item,index})=>{

                console.log('len '+this.state.length)
    
                
               if(item.doc==='Finished' )
                  {
                    return(
                      <View>      
    
                               
                    <TouchableOpacity onPress={()=> this.onDelete(item.id)} >
                    <Cards style={{padding:7,width:'90%'}} >
                       <View style={{
    
                          width:"95%",
                          margin:5,
                          flexDirection:"row",             
    
                       }}>
                  <Text style={{fontStyle:'italic',fontSize:16,fontWeight:'bold'}}>{index+1}.     {item.id}</Text>
                          <Icon style={{position:'absolute', right:'5%'}} color='red' name='delete' size={24}></Icon>
                       </View>
                       
                      </Cards>               
                  </TouchableOpacity>
     
                  </View>
                      
                    )
                  }
                  else{
    
                    return(
                      <Cards style={{padding:15,elevation:5,borderWidth:1}}>
                  <Text style={{fontSize:16,fontWeight:'bold'}}>{index+1}.     {item.id}</Text>              
                     </Cards>
      
                    )
                  }
                 
                 
              
       
                }}
              keyExtractor={(item,index)=>index.toString()}
    
              />
           
                          
             {/* <FlatList
            style={{marginBottom:'20%'}}
            data={this.state.info}
            renderItem={({item,index})=>{

            console.log('len '+this.state.length)

            
           if(item.doc==='Finished' )
              {
                return(
                  <View>      

                           
                <TouchableOpacity onPress={()=> this.onDelete(item.id)} >
                <Cards style={{padding:7,width:'90%'}} >
                   <View style={{

                      width:"95%",
                      margin:5,
                      flexDirection:"row",             

                   }}>
              <Text style={{fontStyle:'italic',fontSize:16,fontWeight:'bold'}}>{item.id}</Text>
                      <Icon style={{position:'absolute', right:'5%'}} color='red' name='delete' size={24}></Icon>
                   </View>
                   
                  </Cards>               
              </TouchableOpacity>
 
              </View>
                  
                )
              }
              else{

                return(
                  <Cards style={{padding:15,elevation:5,borderWidth:1}}>
              <Text style={{fontSize:16,fontWeight:'bold'}}>{item.id}</Text>              
                 </Cards>
  
                )
              }
             
             
          
   
            }}
          keyExtractor={(item,index)=>index.toString()}

        ></FlatList> 
        */}
        <View style={{height:200}}>

        </View>

         


                </View>
              </View>

              }

          
            
            
           </View>
        );
    }

}

const styles = StyleSheet.create({

    container:{
      flex:1,
    
      backgroundColor:"#AEEE",
      width:'100%'

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

    },
    textContainer:{
      fontWeight:"bold",
      fontSize:30,
      fontStyle:'italic',
   
      
  },


});

export default Details;