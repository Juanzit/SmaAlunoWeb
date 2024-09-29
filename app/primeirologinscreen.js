import React from "react"
import { Text, SafeAreaView, StyleSheet, TouchableOpacity } from "react-native"
import Logo from './logo'
import estilo from "./estilo"
import Botao from "./botao"
import { novoAluno } from "./cadastroscreen"
import { useRouter } from "expo-router";

export default ({}) => {
    const router = useRouter();
    return (
        <SafeAreaView 
        style={style.container}>
            <Logo/>
            <Text 
            style= {[estilo.tituloH427px, estilo.textoCorSecundaria, style.tituloAlinhado]}>Boas vindas, {novoAluno.getNome()} !</Text>
            <Text 
            style={[estilo.textoCorDanger, estilo.textoP16px, style.textoAlinhado]}
             numberOfLines={2}
             >Para montarmos o seu treino precisamos de informações.</Text>
            <TouchableOpacity style={[style.botaoPARQANAMNESE, estilo.corSecundaria]} onPress={() => router.push('./parq')} >
                <Text style={[estilo.textoCorLightMais1, estilo.tituloH619px]}>PAR-Q E ANAMNESE</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const style = StyleSheet.create({
    container: {
        marginVertical: '5%'
    },
    tituloAlinhado: {
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: '5%'
    },
    textoAlinhado: {
        marginLeft: '5%',
        marginTop: '15%',
        textDecorationLine: 'underline',
    },

    botaoPARQANAMNESE: {
        width: '90%',
        height: 60,
        marginTop: '15%',
        marginLeft: 'auto',
        marginRight: 'auto',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center'
    }

})