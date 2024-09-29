import React from 'react'
import {Text, View, SafeAreaView, StyleSheet, Dimensions, TouchableOpacity} from 'react-native'
import estilo from '../../../estilo'
import { Entypo } from '@expo/vector-icons'; 
import { useRouter } from "expo-router";

const height = Dimensions.get('window').height
export default ({}) => {
    const router = useRouter();
        return (
            <View style={[estilo.corLightMenos1, style.container]}>
                <View style={[style.bolinha, estilo.corSuccess]}>
                    <Entypo name="check" size={150} color="white" />
                </View>
                <Text style={[estilo.centralizado, estilo.textoP16px, estilo.textoCorSecundaria]}>Avaliação marcada com sucesso!</Text>
                <TouchableOpacity style={[estilo.corSuccess, style.botaoConfirma, estilo.centralizado]} onPress={()=> router.push('../home')}>
            <Text style={[estilo.textoCorLight, estilo.tituloH427px]}>CONCLUIR</Text>
        </TouchableOpacity>
            </View>
        )
}

const style = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
    },
    bolinha: {
        width: 200,
        height: 200,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: '25%',
        marginBottom: '25%'
    },
    botaoConfirma: {
        marginTop: '30%',
        width: '50%',
        alignItems: 'center',
        padding: 5,
        borderRadius: 10,
    }
})