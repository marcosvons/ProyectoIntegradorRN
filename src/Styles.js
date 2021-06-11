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

export {stylesCard, stylesMenu}