import React, { Component } from 'react';
import { getCardsInfo } from '../api/RandomUsers';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import {stylesCard} from '../Styles'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FlatList } from 'react-native-gesture-handler';


export default class ImportUsers extends Component {
  constructor (props){
    super(props);
      this.state={
        users: [],
        importedUsers: [],
        seleccion: []
      }
  }

  componentDidMount(){
    getCardsInfo(10)
    .then ( (cardsInfo) => {
      this.setState({users: cardsInfo})
    })
  }

 
  async storeContactsObject(cardsImportadas){
    try{
      const jsonContacts = JSON.stringify(cardsImportadas)
      await AsyncStorage.setItem('@ContactsInfo', jsonContacts)
    }catch(error){
      console.log(error)
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

async importCard(key){
  var nuevoArrayUsuariosImportados=[]
    await this.getContactsObject() 
    var cardImportada=this.state.users.filter((card)=>{
      return card.login.uuid === key;
    })
    var nuevoArrayUsuariosImportados = [...this.state.importedUsers, ... cardImportada]
    await this.storeContactsObject(nuevoArrayUsuariosImportados)
    let cardsRestantes=this.state.users.filter((card)=>{
      return card.login.uuid !== key;
    })
    this.setState({users: cardsRestantes }) 
}

   renderItem = ({item}) => {
      return (
        <TouchableOpacity onPress={()=> this.importCard(item.login.uuid)}>
        <View style={stylesCard.estiloTarjeta}>
            <Image source={{uri: item.picture.large}} style={{width: 300, height: 300, alignSelf: 'center'}} />
            <Text style={stylesCard.estiloTexto}>{item.name.last}</Text>   
            <Text style={stylesCard.estiloTexto}>{item.name.first}</Text> 
            <Text style={stylesCard.estiloTexto}>{item.email}</Text>
            <Text style={stylesCard.estiloTexto}>{item.dob.date.substr(0,10) } - ({item.dob.age})</Text>
        </View>
      </TouchableOpacity>
      )
    }

    keyExtractor = (item) => item.login.uuid.toString()

  render(){
    return (

      <View>
          <FlatList 
            data={this.state.users}
            keyExtractor= {this.keyExtractor}
            renderItem = {this.renderItem}
          />
        </View>  

    );
  }

}