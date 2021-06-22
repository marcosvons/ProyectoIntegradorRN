import React, {Component} from 'react'
import { Text, View, Button, Image, Alert, ScrollView, TextInput, StyleSheet, Touchable, TouchableOpacity } from 'react-native';
import {stylesMenu} from '../Styles'

export default class Menu extends Component{
    constructor (){
        super();
            this.state={

            }
    }

    render(){
        return(
            <View style={stylesMenu.estiloMenu}>
                <TouchableOpacity style={stylesMenu.estiloTexto} onPress={() => this.props.navigation.navigate('ImportUsers')}>Importar tarjetas</TouchableOpacity>
                <TouchableOpacity style={stylesMenu.estiloTexto} onPress={() => this.props.navigation.navigate('ImportedUsers')}>Tarjetas importadas</TouchableOpacity>
                <TouchableOpacity style={stylesMenu.estiloTexto}>Buscar / Editar tarjetas</TouchableOpacity>
                <TouchableOpacity style={stylesMenu.estiloTexto}>Papelera de Reciclaje</TouchableOpacity>
                <TouchableOpacity style={stylesMenu.estiloTexto}>Acerca de</TouchableOpacity>
            </View>
        );
    }
}