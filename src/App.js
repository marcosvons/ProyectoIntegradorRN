import 'react-native-gesture-handler';
import React, { Component } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import ImportUsers from './Screens/ImportUsers'
import ImportedUsers from './Screens/ImportedUsers'
import Menu from './Components/Menu'

const Stack = createStackNavigator();

export default class App extends Component {
  constructor (props){
    super(props);
      this.state={

      }
  }


  render(){
    return (
      <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Menu' component={Menu} options={{title: 'Menu'}} ></Stack.Screen>
        <Stack.Screen name='ImportUsers' component={ImportUsers} options={{title: 'Seleccione las tarjetas a importar'}} ></Stack.Screen>
        <Stack.Screen name='ImportedUsers' component={ImportedUsers} options={{title: 'Tarjetas importadas'}} ></Stack.Screen>
        {/* <Stack.Screen name='EditCards' component={} options={{title: ''}} ></Stack.Screen>
        <Stack.Screen name='RecycleBin' component={} options={{title: ''}} ></Stack.Screen>
        <Stack.Screen name='About' component={} options={{title: ''}} ></Stack.Screen> */}
      </Stack.Navigator>
      </NavigationContainer>
    );
  }

}

