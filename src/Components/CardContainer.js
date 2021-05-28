import React, { Component } from 'react';
import { Text, View, Button, Image, Alert, ScrollView, TextInput, StyleSheet, Touchable, TouchableOpacity } from 'react-native';
import {stylesCard} from '../Styles'

export default class CardContainer extends Component {
  constructor (props){
    super(props);
      this.state={
      }
  }

  


  render(){
    return (
        <View style={stylesCard.estiloTarjeta}>
            <Image source={{uri: this.props.picture}} />
            <Text style={stylesCard.estiloTexto}>{this.props.lastname}</Text>   
            <Text style={stylesCard.estiloTexto}>{this.props.name}</Text> 
            <Text style={stylesCard.estiloTexto}>{this.props.email}</Text>
            <Text style={stylesCard.estiloTexto}>{this.props.fnac} - ({this.props.edad})</Text>
        </View>
    );
  }

}

