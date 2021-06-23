import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import {stylesCard} from '../Styles'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FlatList } from 'react-native-gesture-handler';
import DetalleModal from '../Components/DetalleModal';

export default class ImportedUsers extends Component {
  constructor (props){
    super(props);
      this.state={
          importedUser:[],
          showModal: false,
          selectedItem: null,
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

  
  deleteImportedCard(key){
    let cardsRestantes=this.state.importedUser.filter((card)=>{
      return card.login.uuid !== key;
    })
    this.storeContactsObject(cardsRestantes)
    this.getContactsObject()
   }

   async storeContactsObject(cardImportada){
    try{
      const jsonContacts = JSON.stringify(cardImportada)
      await AsyncStorage.setItem('@ContactsInfo', jsonContacts)
    }catch(error){
      console.log(error)
    }
  }

  onClose(){
   this.setState({showModal: !this.state.showModal})
  }

  showModal(item){
    this.setState({selectedItem: item, showModal: true})
  }


   renderItem = ({item}) => {
     return (
      <View style={stylesCard.estiloTarjeta}>
        <TouchableOpacity  onPress={() => this.deleteImportedCard(item.login.uuid)}>
          <Text style={{color: 'white'}}>X</Text>
        </TouchableOpacity>
        <Image source={{uri: item.picture.large}} style={{width: 300, height: 300, alignSelf: 'center'}} />
        <Text style={stylesCard.estiloTexto}>{item.name.last}</Text>   
        <Text style={stylesCard.estiloTexto}>{item.name.first}</Text> 
        <Text style={stylesCard.estiloTexto}>{item.email}</Text>
        <Text style={stylesCard.estiloTexto}>{item.dob.date.substr(0,10)} - ({item.dob.age})</Text>
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
          <FlatList 
            data={this.state.importedUser}
            keyExtractor= {this.keyExtractor}
            renderItem = {this.renderItem}
          />
        </View>  
    );
  }

}