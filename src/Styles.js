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
        width: '75%',
        margin: 20,
        borderWidth: 5,
        borderColor: 'green',        
    },
    estiloTexto: {
        color: 'white',
        fontSize: 32,
        alignSelf: 'center'
    },
    estiloButton: {
        color: 'white'
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
        height: 100,
        width: 200,
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
        position: 'absolute',
        right: 20,
        top: 10,
        fontSize: 15
    }
})

export {stylesCard, stylesMenu, stylesModal}