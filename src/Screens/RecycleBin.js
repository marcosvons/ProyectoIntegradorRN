import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import {stylesCard} from '../Styles'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FlatList } from 'react-native-gesture-handler';
import DetalleModal from '../Components/DetalleModal';

export default class RecycleBin extends Component {
    constructor (props){
      super(props);
        this.state={
            cardsPapelera:[],
            showModal: false,
            selectedItem: null,
        }
    }


    async getRecycleBin(){
        try{
          const jsonContacts = await AsyncStorage.getItem('RecycleBin')
          this.setState({cardsPapelera: JSON.parse(jsonContacts)})
        }catch (error){
          console.log(error)
        }
      }
     
      componentDidMount(){
          this.getRecycleBin()
          .then(()=>{
            console.log(this.state.cardsPapelera)
          })
      }
    
      
      deleteCardCompletely(key){
        let cardsRestantes=this.state.cardsPapelera.filter((card)=>{
          return card.login.uuid !== key;
        })
        this.storeRecycleBin(cardsRestantes)
        this.getRecycleBin()
    
       }
    
       async storeRecycleBin(cardPapelera){
        try{
          const jsonContacts = JSON.stringify(cardPapelera)
          await AsyncStorage.setItem('RecycleBin', jsonContacts)
        }catch(error){
          console.log(error)
        }
      }
    
      onClose(){
       this.setState({showModal: !this.state.showModal})
      }
    
      showModal(item){
        this.setState({selectedItem: item, showModal: true})
      }
    
    
       renderItem = ({item}) => {
         return (
          <View style={stylesCard.estiloTarjeta}>
            <TouchableOpacity  onPress={() => this.deleteCardCompletely(item.login.uuid)}>
              <Text style={{color: 'white'}}>X</Text>
            </TouchableOpacity>
            <Image source={{uri: item.picture.large}} style={{width: 300, height: 300, alignSelf: 'center'}} />
            <Text style={stylesCard.estiloTexto}>{item.name.last}</Text>   
            <Text style={stylesCard.estiloTexto}>{item.name.first}</Text> 
            <Text style={stylesCard.estiloTexto}>{item.email}</Text>
            <Text style={stylesCard.estiloTexto}>{item.dob.date.substr(0,10)} - ({item.dob.age})</Text>
            <TouchableOpacity onPress={() => this.showModal(item)}>
              <Text style={stylesCard.estiloButton}>Ver detalle</Text>
            </TouchableOpacity>
            
            <DetalleModal showModal={this.state.showModal} 
              onClose={this.onClose.bind(this)}
              value={this.state.selectedItem} />
    
          </View>
         )
       }
    
      keyExtractor = (item) => item.login.uuid.toString()
    
      render(){
        return (
    
            <View>
              <FlatList 
                data={this.state.cardsPapelera}
                keyExtractor= {this.keyExtractor}
                renderItem = {this.renderItem}
              />
            </View>  
        );
      }
    
    }