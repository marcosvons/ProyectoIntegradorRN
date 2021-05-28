import React, { Component } from 'react';
import CardContainer from './Components/CardContainer'
import Menu from './Components/Menu'
import { Text, View, Button, Image, Alert, ScrollView, TextInput, StyleSheet, Touchable, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default class App extends Component {
  constructor (props){
    super(props);
      this.state={
        users: [],
        importedUsers: [],

      }
  }

  componentDidMount(){
    fetch("https://randomuser.me/api/?results=10")
      .then(r => r.json())
      .then((resultado)=>{
        this.setState({users: resultado.results})
      })
      .catch((e)=>{console.log(e)})
  }

  async storeContactsObject(){
    try{
      const jsonContacts = JSON.stringify(this.stateusers)
      await AsyncStorage.setItem('@ContactsInfo', jsonContacts)
    }catch(error){
      console.log(error)
    }
  }

  async getContactsObject(){
    try{
      const jsonContacts = await AsyncStorage.getItem('@ContactsInfo')
      this.setState({importedUsers: JSON.parse(jsonContacts)})
    }catch{
      console.log(error)
    }
  }

  render(){
    return (
      <View>
        <Menu />
        <ScrollView>
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
                    /* onDelete={this.eliminarTarjeta.bind(this)}  */
                  
                  />
              )
            })
          }
        </ScrollView>
      </View>
    );
  }

}

