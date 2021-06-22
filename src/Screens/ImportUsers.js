import React, { Component } from 'react';
import { getCardsInfo } from '../api/RandomUsers';
import { Text, View, Button, Image, Alert, ScrollView, TextInput, StyleSheet, Touchable, TouchableOpacity } from 'react-native';
import CardContainer from '../Components/CardContainer';
import {stylesCard} from '../Styles'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class ImportUsers extends Component {
  constructor (props){
    super(props);
      this.state={
        users: [],
        importedUsers: [],

      }
  }

  componentDidMount(){
    getCardsInfo(10)
    .then ( (cardsInfo) => {
      this.setState({users: cardsInfo})
    })
  }

 
  async storeContactsObject(cardImportada){
    try{
      const jsonContacts = JSON.stringify(cardImportada)
      await AsyncStorage.setItem('@ContactsInfo', jsonContacts)
    }catch(error){
      console.log(error)
    }
  }


  importCard(key){
    let cardImportada=this.state.users.filter((card)=>{
      return card.login.uuid === key;
    })
    this.state.importedUsers.push(cardImportada)
    this.setState({
      importedUsers: this.state.importedUsers
    })
    console.log(this.state.importedUsers)
    this.storeContactsObject(this.state.importedUsers)
    let cardsRestantes=this.state.users.filter((card)=>{
      return card.login.uuid !== key;
    })
    this.setState({users: cardsRestantes })
   }


  render(){
    return (
      <ScrollView style={stylesCard.contenedor} >
      {
        this.state.users.map((user)=>{
          return(
              <CardContainer
                key={ user.login.uuid} 
                id= {user.login.uuid}
                name={ user.name.first }
                lastname= { user.name.last }
                picture={ user.picture.large }
                email= {user.email}
                fnac={ user.dob.date.substr(0,10) }
                edad= {user.dob.age}
                direccion= {user.location}
                register={user.registered.date.substr(0,10)}
                telefono= {user.phone}
                import={this.importCard.bind(this)}
                /* onDelete={this.eliminarTarjeta.bind(this)}  */
              
              />
          )
        })
      }
    </ScrollView>
    );
  }

}