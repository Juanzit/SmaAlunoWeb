import React from "react"
import {Text, Pressable, StyleSheet, View} from 'react-native'
import estilo from "./estilo"
export default props => {
    return (
        <Pressable style={[estilo.corLightMenos1, style.botao, estilo.sombra]}
        >
            <Text 
            style={[estilo.tituloH619px, estilo.textoCorPrimaria]}>{props.texto}</Text>
        </Pressable>

    )
}

const style = StyleSheet.create({
    botao: {
        paddingHorizontal: 3,
        paddingVertical: 5,
        alignItems: 'center',
        width: '70%',
        borderRadius: 30,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginVertical: '10%',
        borderWidth: 3,
        borderColor: '#0066FF'
    },
})
