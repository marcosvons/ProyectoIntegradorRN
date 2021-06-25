import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity, TextInput } from 'react-native';
import {stylesCard} from '../Styles'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FlatList } from 'react-native-gesture-handler';
import DetalleModal from '../Components/DetalleModal';

export default class SearchEditCards extends Component {
  constructor (props){
    super(props);
      this.state={
          importedUser:[],
          showModal: false,
          selectedItem: null,
          filter: '',
          nameFilter: false,
          lastnameFilter: false,
          paisFilter: false,
          colorNameFilter: 'white',
          colorLastnameFilter: 'white',
          colorPaisFilter: 'white',
          comentario: ""
      } 
  }

  async getContactsObject(){
    try{
      const jsonContacts = await AsyncStorage.getItem('@ContactsInfo')
      this.setState({importedUser: JSON.parse(jsonContacts)})
    }catch (error){
      console.log(error)
    }
  }
 
  componentDidMount(){
      this.getContactsObject()
    
  }
  
//   async storeContactsObject(cardImportada){
//     try{
//       const jsonContacts = JSON.stringify(cardImportada)
//       await AsyncStorage.setItem('@ContactsInfo', jsonContacts)
//     }catch(error){
//       console.log(error)
//     }
//   }

  onClose(){
   this.setState({showModal: !this.state.showModal})
  }

  showModal(item){
    this.setState({selectedItem: item, showModal: true})
  }

  nameFilter(){
    this.setState({nameFilter: !this.state.nameFilter}, function(){
      if (this.state.nameFilter === true){
        this.setState({colorNameFilter: 'grey'})
      } else {
        this.setState({colorNameFilter: 'white'})
      }
    })
    
  }

  lastnameFilter(){
    this.setState({lastnameFilter: !this.state.lastnameFilter}, function(){
      if (this.state.lastnameFilter === true){
        this.setState({colorLastnameFilter: 'grey'})
      }else {
        this.setState({colorLastnameFilter: 'white'})
      }    
    })
  
  }

  paisFilter(){
    this.setState({paisFilter: !this.state.paisFilter},
      function (){if (this.state.paisFilter === true){
        this.setState({colorPaisFilter: 'grey'})
      }else {
        this.setState({colorPaisFilter: 'white'})
      }} )
    
  }

  addComment(key){
    var tarjetaModificada = this.state.importedUser.filter((card)=>{
      return key = card.login.uuid
    })
    for (let i=0; i < this.state.importedUser.length; i++){
      // if (key===this.state.importedUser[i].login.uuid){
      //   this.setState(importedUser[i].comentario: this.state.comentario)
      // }
    }
  }

  filter(){
    var search = this.state.filter
    var resultadoBusqueda=[]
      if (this.state.nameFilter === true){
            const resultado1 = this.state.importedUser.filter((card)=>{
                return card.name.first.toLowerCase().includes(search.toLowerCase())
            })
            var resultadoBusqueda = [...resultadoBusqueda, ... resultado1]
      }

      if (this.state.lastnameFilter === true){
          const resultado2 = this.state.importedUser.filter((card)=>{
              return card.name.last.toLowerCase().includes(search.toLowerCase())
          })
         
            var resultadoBusqueda= [...resultadoBusqueda, ... resultado2]
        
      }

      if (this.state.paisFilter === true){
          const resultado3 = this.state.importedUser.filter((card)=>{
              return card.location.city.toLowerCase().includes(search.toLowerCase()) || card.location.country.toLowerCase().includes(search.toLowerCase()) 
          })
            var resultadoBusqueda= [...resultadoBusqueda, ... resultado3]
      }

      this.setState({importedUser: resultadoBusqueda})

  }

   renderItem = ({item}) => {
     return (
      <View style={stylesCard.estiloTarjeta}>
        <Image source={{uri: item.picture.large}} style={{width: 300, height: 300, alignSelf: 'center'}} />
        <Text style={stylesCard.estiloTexto}>{item.name.last}</Text>   
        <Text style={stylesCard.estiloTexto}>{item.name.first}</Text> 
        <Text style={stylesCard.estiloTexto}>{item.email}</Text>
        <Text style={stylesCard.estiloTexto}>{item.dob.date.substr(0,10)} - ({item.dob.age})</Text>
        <Text>Comentario: </Text>
        <TextInput onChangeText={(text)=>this.setState({comentario: text})}></TextInput>
        <TouchableOpacity onPress={() => this.addComment(item.login.uuid)}>
          <Text style={stylesCard.estiloButton}>Agregar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.showModal(item)}>
          <Text style={stylesCard.estiloButton}>Ver detalle</Text>
        </TouchableOpacity>
        
         <DetalleModal showModal={this.state.showModal} 
          onClose={this.onClose.bind(this)}
          value={this.state.selectedItem} /> 

      </View>
     )
   }

  keyExtractor = (item) => item.login.uuid.toString()


  render(){
      return (
        
        
        <View>
            <TouchableOpacity onPress={ () => this.nameFilter()} style={{backgroundColor: this.state.colorNameFilter}}>
              <Text>Filtrar por nombre</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={ () => this.lastnameFilter()} style={{backgroundColor:this.state.colorLastnameFilter}}>
              <Text>Filtrar por apellido</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={ () => this.paisFilter()} style={{backgroundColor:this.state.colorPaisFilter}}>
              <Text>Filtrar por País y Ciudad</Text>
            </TouchableOpacity>
            <TextInput onChangeText={ (text) => this.setState({filter: text})} ></TextInput>
            <TouchableOpacity onPress={() => this.filter()}>
              <Text>Filtrar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.getContactsObject()}>
              <Text>Reestablecer</Text>
            </TouchableOpacity>
            <FlatList 
                data={this.state.importedUser}
                keyExtractor= {this.keyExtractor}
                renderItem = {this.renderItem}
            />
        </View>  

      )
  }

}