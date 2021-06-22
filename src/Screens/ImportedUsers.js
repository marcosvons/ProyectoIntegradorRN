import React, { Component } from 'react';
import { Text, View, Button, Image, Alert, ScrollView, TextInput, StyleSheet, Touchable, TouchableOpacity, Modal } from 'react-native';
import CardContainerImported from '../Components/CardContainerImported';
import {stylesCard, stylesModal} from '../Styles'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FlatList } from 'react-native-gesture-handler';

export default class importedUsers extends Component {
  constructor (props){
    super(props);
      this.state={
          importedUsers:[],
          showModal: false,
          selectedItem: null,
      }
  }

  async getContactsObject(){
    try{
      const jsonContacts = await AsyncStorage.getItem('@ContactsInfo')
      this.setState({importedUsers: JSON.parse(jsonContacts)})
    }catch (error){
      console.log(error)
    }
  }
 
  componentDidMount(){
      this.getContactsObject()
      console.log(this.state.importedUsers)
  }

  
  deleteImportedCard(key){
    let cardsRestantes=this.state.importedUsers.filter((card)=>{
      return card[0].login.uuid !== key;
    })
    this.setState({importedUsers: cardsRestantes })
   }

   renderItem = ({item}) => {
     return (
      <View style={stylesCard.estiloTarjeta}>


      <TouchableOpacity style={{color: 'white'}} onPress={this.deleteImportedCard(item.id)}>X</TouchableOpacity>
      <Image source={{uri: item.picture}} style={{width: 300, height: 300, alignSelf: 'center'}} />
      <Text style={stylesCard.estiloTexto}>{item[0].name.last}</Text>   
      <Text style={stylesCard.estiloTexto}>{item[0].name.first}</Text> 
      <Text style={stylesCard.estiloTexto}>{item[0].email}</Text>
      <Text style={stylesCard.estiloTexto}>{item[0].dob.date.substr(0,10)} - ({item[0].dob.age})</Text>
      <TouchableOpacity style={stylesCard.estiloButton}
          onPress={ () => this.setState({showModal: true, selectedItem: this.props})}>Ver detalle</TouchableOpacity>
      
      
      <Modal visible={this.state.showModal}
          transparent={true}
          animationType='fade'>
          <View style={stylesModal.modalContainer}>
              <View style={stylesModal.estiloModal}>
                  <TouchableOpacity style={stylesModal.closeButtonModal}
                      onPress={() => this.setState({showModal: false}) }>X</TouchableOpacity>
                  {this.state.selecteditem &&
                  <>
                  <Text style={stylesModal.estiloTexto}>{item[0].location.street.name} {item.location.street.number}</Text>
                  <Text style={stylesModal.estiloTexto}>{item[0].location.city} {item.location.state}</Text>
                  <Text style={stylesModal.estiloTexto}>{item[0].location.country}</Text>
                  <Text style={stylesModal.estiloTexto}>{item[0].location.postcode}</Text>
                  <Text style={stylesModal.estiloTexto}>{item[0].registered.date.substr(0,10)}</Text>
                  <Text style={stylesModal.estiloTexto}>{item[0].phone}</Text>
                  <Text style={stylesModal.estiloTexto}>Informacion adicional: </Text>
                  </>
                  }
              </View>

          </View>

      </Modal>


  </View>
     )
   }

  render(){
    return (
        <ScrollView style={stylesCard.contenedor} >
          {
            this.state.importedUsers.map((user)=>{
              return(
                  <CardContainerImported
                    key={ user[0].login.uuid} 
                    id= {user[0].login.uuid}
                    name={ user[0].name.first }
                    lastname= { user[0].name.last }
                    picture={ user[0].picture.large }
                    email= {user[0].email}
                    fnac={ user[0].dob.date.substr(0,10) }
                    edad= {user[0].dob.age}
                    direccion= {user[0].location}
                    register={user[0].registered.date.substr(0,10)}
                    telefono= {user[0].phone}
                    delete={this.deleteImportedCard.bind(this)}                  
                  />
              )
            })
          }
        
        <View>
          <FlatList 
            data={this.state.importedUsers}
            keyExtractor= {this.keyExtractor}
            renderItem = {this.renderItem}
          />
        </View>

        </ScrollView>

        
    );
  }

}