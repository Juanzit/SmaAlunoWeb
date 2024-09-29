import React from "react"
import {Text, View, StyleSheet, SafeAreaView, TouchableOpacity} from 'react-native'
import estilo from "../estilo"
import { AntDesign } from '@expo/vector-icons'; 
import InputTexto from "../inputtexto";
import Botao from "../botao";
import {useFonts} from 'expo-font'
import { useRouter } from "expo-router";

export default ({}) => {
    const router = useRouter();
    const [fontsLoaded] = useFonts({
        'Montserrat': require('../../assets/Montserrat-Light.ttf'),
    })
    return (
        <SafeAreaView style={[style.container, estilo.textoCorLightMenos1]}>
            <View style={[style.conteudos]}>
            <Text style={[estilo.textoCorSecundaria, estilo.textoP16px, style.Montserrat]}>Informe o email associado a sua conta para redefinir sua senha.</Text>
            </View>
            <InputTexto texto='CÓDIGO'></InputTexto>
            <View style={{marginTop: '60%'}}>
            <TouchableOpacity style={[estilo.botao, estilo.corPrimaria]} onPress={()=>router.push('./recuperarsenhatela4.js')}>
                <Text style={[estilo.textoCorLight, estilo.tituloH619px]}> PROSSEGUIR</Text>
            </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const style = StyleSheet.create({
    container: {
        height: '100%',
        paddingHorizontal: '5%'
    },
    conteudos: {
        marginTop: '20%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: '10%',
    },
    Montserrat: {
        fontFamily: 'Montserrat'
    }

})