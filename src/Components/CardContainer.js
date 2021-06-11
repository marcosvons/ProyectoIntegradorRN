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
      <TouchableOpacity onPress={this.props.import.bind(this, this.props.id)}>
        <View style={stylesCard.estiloTarjeta}>
            <Image source={{uri: this.props.picture}} style={{width: 300, height: 300, alignSelf: 'center'}} />
            <Text style={stylesCard.estiloTexto}>{this.props.lastname}</Text>   
            <Text style={stylesCard.estiloTexto}>{this.props.name}</Text> 
            <Text style={stylesCard.estiloTexto}>{this.props.email}</Text>
            <Text style={stylesCard.estiloTexto}>{this.props.fnac} - ({this.props.edad})</Text>
        </View>
      </TouchableOpacity>
    );
  }

}

