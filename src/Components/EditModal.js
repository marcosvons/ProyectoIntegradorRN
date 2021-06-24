import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Modal, TextInput } from 'react-native';
import {stylesModal} from '../Styles'

export default class EditModal extends Component {
    
    constructor (props){
        super(props);
          this.state={
            importedUsers: [],
            // modifiedCard: []
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

      async storeContactsObject(cardsImportadas){
        try{
          const jsonContacts = JSON.stringify(cardsImportadas)
          await AsyncStorage.setItem('@ContactsInfo', jsonContacts)
        }catch(error){
          console.log(error)
        }
      }

    // editCard(cardInfo){
    //     const name= document.querySelector('.name').value
    //     const lastname= document.querySelector('.lastname').value
    //     const comment= document.querySelector('.comment').value

        

    //     this.getContactsObject()
    //     .then(()=>{
    //         const modifyCard = this.state.importedUsers.filter((card)=>{
    //             return card.login.uuid === cardInfo.login.uuid
    //         })
    //         modifyCard[0].name.first = name
    //         modifyCard[0].name.last = lastname            
            
    //         this.setState({modifiedCard: modifyCard})

    //         let cardsRestantes=this.state.importedUsers.filter((card)=>{
    //             return card.login.uuid !== cardInfo.login.uuid;
    //           })
    //         var newCollection = [...cardsRestantes, ... modifyCard]
    //           this.storeContactsObject(newCollection)
    //           this.getContactsObject()
    //     })
    // }

    render(){
        return(
            <Modal visible={this.props.showModal}
            transparent={true}
            animationType='fade'>
            <View style={stylesModal.modalContainer}>
                <View style={stylesModal.estiloModal}>
                    <TouchableOpacity style={stylesModal.positionCloseButton}
                        onPress={this.props.onClose.bind(this) }>
                            <Text style={stylesModal.closeButtonModal}>X</Text>
                    </TouchableOpacity>
                    {this.props.value && 
                    <>
                    <Text style={stylesModal.estiloTexto}>Editar nombre: 
                        <TextInput placeholder={this.props.value.name.first}
                            className='name'></TextInput>
                    </Text>
                    </>
                    }
                    <TouchableOpacity onPress={this.editCard(this.props.value)}>
                        <Text>Guardar cambios</Text>
                    </TouchableOpacity>
                </View>

            </View>

        </Modal>
        )
    }
}
