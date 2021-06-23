import {StyleSheet} from 'react-native';

const stylesCard = StyleSheet.create({
    contenedor: {
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap',
        alignContent: 'stretch'

    },
    estiloTarjeta: {
        backgroundColor: 'black',
        alignSelf: 'center',
        width: '90%',
        margin: 10,
        borderWidth: 5,
        borderColor: 'grey',   
        padding: 5     
    },
    estiloTexto: {
        color: 'white',
        fontSize: 25,
        alignSelf: 'center'
    },
    estiloButton: {
        color: 'white',
        padding: 5,
        fontSize: 15
    }
})

const stylesMenu = StyleSheet.create({
    estiloMenu: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignSelf: 'center'

    },
    estiloTexto: {
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 10,
        borderStyle: 'solid',
        width: 200,
        padding: 5
    }
})

const stylesModal = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.3)'
    },
    estiloModal: {
        height: 300,
        width: 400,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        elevation: 20,
        shadowColor: 'black',
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: 'black'   
    },
    estiloTexto: {
        fontSize: 20
    },
    closeButtonModal: {
        fontSize: 35
    },
    positionCloseButton: {
    }
})

export {stylesCard, stylesMenu, stylesModal}