import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity, TextInput } from 'react-native';
import {stylesCard} from '../Styles'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FlatList } from 'react-native-gesture-handler';
import EditModal from '../Components/EditModal';

export default class SearchEditCards extends Component {
  constructor (props){
    super(props);
      this.state={
          importedUser:[],
          showModal: false,
          selectedItem: null,
          nameFilter: "",
          lastnameFilter: "",
          paisFilter: "",
          resultadosBusqueda:[]
      } 
  }

  async getContactsObject(){
    try{
      const jsonContacts = await AsyncStorage.getItem('@ContactsInfo')
      this.setState({importedUser: JSON.parse(jsonContacts)})
    }catch (error){
      console.log(error)
    }
  }
 
  componentDidMount(){
      this.getContactsObject()
    
  }
  
//   async storeContactsObject(cardImportada){
//     try{
//       const jsonContacts = JSON.stringify(cardImportada)
//       await AsyncStorage.setItem('@ContactsInfo', jsonContacts)
//     }catch(error){
//       console.log(error)
//     }
//   }

  onClose(){
   this.setState({showModal: !this.state.showModal})
  }

  showModal(item){
    this.setState({selectedItem: item, showModal: true})
  }


  filter(){
      if (this.state.nameFilter !== ""){
        var nombreFiltrado = this.state.nameFilter
            const resultado1 = this.state.importedUser.filter((card)=>{
                return card.name.first.toLowerCase() ===nombreFiltrado.toLowerCase()
            })
            console.log(resultado1)
        if (resultado1.length > 0){
            console.log('existo')
            this.setState({resultadosBusqueda: resultado1})
        }
      }

      console.log(this.state.resultadosBusqueda)

      if (this.state.lastnameFilter !== ""){
        var apellidoFiltrado = this.state.lastnameFilter
          const resultado2 = this.state.importedUser.filter((card)=>{
              return card.name.last.toLowerCase() === apellidoFiltrado.toLowerCase()
          })
          if (resultado2.length != 0){
            var resultadoBusqueda= [...this.state.resultadosBusqueda, ... resultado2]
            this.setState({resultadosBusqueda: resultadoBusqueda})
        }
      }

      if (this.state.paisFilter !== ""){
        var paisFiltrado = this.state.paisFilter
          const resultado3 = this.state.importedUser.filter((card)=>{
              return card.location.city.toLowerCase() === paisFiltrado.toLowerCase() || card.location.country.toLowerCase() === paisFiltrado.toLowerCase()
          })
          if (resultado3.length != 0){
            var resultadoBusqueda= [...this.state.resultadosBusqueda, ... resultado3]
            this.setState({resultadosBusqueda: resultadoBusqueda})
        }
      }

      this.setState({importedUser: this.state.resultadosBusqueda})

  }

   renderItem = ({item}) => {
     return (
      <View style={stylesCard.estiloTarjeta}>
        <Image source={{uri: item.picture.large}} style={{width: 300, height: 300, alignSelf: 'center'}} />
        <Text style={stylesCard.estiloTexto}>{item.name.last}</Text>   
        <Text style={stylesCard.estiloTexto}>{item.name.first}</Text> 
        <Text style={stylesCard.estiloTexto}>{item.email}</Text>
        <Text style={stylesCard.estiloTexto}>{item.dob.date.substr(0,10)} - ({item.dob.age})</Text>
        <TouchableOpacity onPress={() => this.showModal(item)}>
          <Text style={stylesCard.estiloButton}>Agregar comentario</Text>
        </TouchableOpacity>
        
        {/* <EditModal showModal={this.state.showModal} 
          onClose={this.onClose.bind(this)}
          value={this.state.selectedItem}
          editCard={this.editCard.bind(this)} /> */}

      </View>
     )
   }

  keyExtractor = (item) => item.login.uuid.toString()


  render(){
      return (
        
        
        <View>
            <Text>Filtrar por nombre</Text>
            <TextInput onChangeText={(text)=>this.setState({nameFilter: text})} ></TextInput>
            <Text>Filtrar por apellido</Text>
            <TextInput onChangeText={(text)=>this.setState({lastnameFilter: text})}></TextInput>
            <Text>Filtrar por País y Ciudad</Text>
            <TextInput onChangeText={(text)=>this.setState({paisFilter: text})}></TextInput>
            <TouchableOpacity onPress={() => this.filter()}><Text>Filtrar</Text></TouchableOpacity>
            <FlatList 
                data={this.state.importedUser}
                keyExtractor= {this.keyExtractor}
                renderItem = {this.renderItem}
            />
        </View>  

      )
  }

}