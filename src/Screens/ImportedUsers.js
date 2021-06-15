import React, { Component } from 'react';
import { Text, View, Button, Image, Alert, ScrollView, TextInput, StyleSheet, Touchable, TouchableOpacity } from 'react-native';
import CardContainer from '../Components/CardContainer';
import {stylesCard} from '../Styles'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class importedUsers extends Component {
  constructor (props){
    super(props);
      this.state={
          importedUsers:[]
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
            this.state.importedUsers.map((user)=>{
              return(
                  <CardContainer
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