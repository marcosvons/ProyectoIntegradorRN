import 'react-native-gesture-handler';
import React, { Component } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import ImportUsers from './Screens/ImportUsers'
import ImportedUsers from './Screens/ImportedUsers'
import Menu from './Components/Menu'
import {
  Text, 
  View, 
  Button, 
  Image, 
  Alert,
  ScrollView, 
  TextInput, 
  StyleSheet, 
  Touchable, 
  TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();

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

  async storeContactsObject(cardImportada){
    try{
      const jsonContacts = JSON.stringify(cardImportada)
      await AsyncStorage.setItem('@ContactsInfo', jsonContacts)
    }catch(error){
      console.log(error)
    }
  }

  async getContactsObject(){
    try{
      const jsonContacts = await AsyncStorage.getItem('@ContactsInfo')
      this.setState({importedUsers: JSON.parse(jsonContacts)})
    }catch(error){
      console.log(error)
    }
  }

  importCard(key){
    let cardImportada=this.state.users.filter((card)=>{
      return card.login.uuid === key;
    })
    // this.state.importedUsers.push(cardImportada)
    this.getContactsObject()
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
      <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Menu' component={Menu} options={{title: 'Menu'}} ></Stack.Screen>
        <Stack.Screen name='ImportUsers' component={ImportUsers} options={{title: 'Importar usuarios'}} ></Stack.Screen>
        <Stack.Screen name='ImportedUsers' component={ImportedUsers} options={{title: 'Ver usuarios importados'}} ></Stack.Screen>
        {/* <Stack.Screen name='EditCards' component={} options={{title: ''}} ></Stack.Screen>
        <Stack.Screen name='RecycleBin' component={} options={{title: ''}} ></Stack.Screen>
        <Stack.Screen name='About' component={} options={{title: ''}} ></Stack.Screen> */}
      </Stack.Navigator>
      </NavigationContainer>
    );
  }

}

