import React, { Component } from 'react';
import { Text, View, Button, Image, Alert, ScrollView, TextInput, StyleSheet, Touchable, TouchableOpacity, Modal } from 'react-native';
import {stylesCard, stylesModal} from '../Styles'

export default class CardContainerImported extends Component {
  constructor (props){
    super(props);
      this.state={
          showModal: false,
          selectedItem: null,
      }
  }

  


  render(){
    return (
        <View style={stylesCard.estiloTarjeta}>


            <TouchableOpacity style={{color: 'white'}}onPress={this.props.delete.bind(this, this.props.id)}>X</TouchableOpacity>
            <Image source={{uri: this.props.picture}} style={{width: 300, height: 300, alignSelf: 'center'}} />
            <Text style={stylesCard.estiloTexto}>{this.props.lastname}</Text>   
            <Text style={stylesCard.estiloTexto}>{this.props.name}</Text> 
            <Text style={stylesCard.estiloTexto}>{this.props.email}</Text>
            <Text style={stylesCard.estiloTexto}>{this.props.fnac} - ({this.props.edad})</Text>
            <TouchableOpacity style={stylesCard.estiloButton}
                onPress={ () => this.setState({showModal: true, selectedItem: this.props})}>Ver detalle</TouchableOpacity>
            
            
            <Modal visible={this.state.showModal}
                transparent={true}
                animationType='fade'>
                <View style={stylesModal.modalContainer}>
                    <View style={stylesModal.estiloModal}>
                        <TouchableOpacity style={stylesModal.closeButtonModal}
                            onPress={() => this.setState({showModal: false}) }>X</TouchableOpacity>
                        {this.state.selecteditem &&
                        <>
                        <Text style={stylesModal.estiloTexto}>{this.props.direccion.street.name} {this.props.direccion.street.number}</Text>
                        <Text style={stylesModal.estiloTexto}>{this.props.direccion.city} {this.props.direccion.state}</Text>
                        <Text style={stylesModal.estiloTexto}>{this.props.direccion.country}</Text>
                        <Text style={stylesModal.estiloTexto}>{this.props.direccion.postcode}</Text>
                        <Text style={stylesModal.estiloTexto}>{this.props.register}</Text>
                        <Text style={stylesModal.estiloTexto}>{this.props.telefono}</Text>
                        <Text style={stylesModal.estiloTexto}>Informacion adicional: </Text>
                        </>
                        }
                    </View>

                </View>

            </Modal>


        </View>
    );
  }

}
