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


  render(){
    return (
        <ScrollView style={stylesCard.contenedor} >
          {
            this.state.importedUsers.map((user)=>{
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
                   
                    /* onDelete={this.eliminarTarjeta.bind(this)}  */
                  
                  />
              )
            })
          }
        </ScrollView>
    );
  }

}