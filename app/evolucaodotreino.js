import React from "react"
import {View, StyleSheet, SafeAreaView, TouchableOpacity, Text} from 'react-native'
import estilo from "./estilo"
import BotoesEvolucaoDoTreino from "./botoesevolucaodotreino"
import { useRouter } from "expo-router";

export default ({ route}) => {
    const router = useRouter();
    const {aluno} = route.params
    return (
        <SafeAreaView style={[style.container, estilo.corLightMenos1]}>
            <View style={[style.areaBotoes]}>
                <TouchableOpacity style={[estilo.botao, estilo.corPrimaria]} onPress={()=>router.push('EVOLUÇÃO CORPORAL', {aluno: aluno})}>
                    <Text style={[estilo.tituloH619px, estilo.textoCorLight]}>EVOLUÇÃO DADOS ANTOPOMÉTRICOS</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[estilo.botao, estilo.corPrimaria]} onPress={()=>router.push('EVOLUÇÃO DOS TESTES', {aluno: aluno})}>
                    <Text style={[estilo.tituloH619px, estilo.textoCorLight]}>EVOLUÇÃO DOS TESTES</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[estilo.botao, estilo.corPrimaria]} onPress={()=>router.push('SELECIONAR EXERCÍCIO', {aluno: aluno})}>
                    <Text style={[estilo.tituloH619px, estilo.textoCorLight]}>EVOLUÇÃO DOS EXERCÍCIOS</Text>
                </TouchableOpacity>


                <TouchableOpacity style={[estilo.botao, estilo.corPrimaria]} onPress={()=>router.push('EVOLUÇÃO PSE', {aluno: aluno})}>
                    <Text style={[estilo.tituloH619px, estilo.textoCorLight]}>EVOLUÇÃO PSE</Text>
                </TouchableOpacity>


                <TouchableOpacity style={[estilo.botao, estilo.corPrimaria]} onPress={()=>router.push('EVOLUÇÃO QTR', {aluno: aluno})}>
                    <Text style={[estilo.tituloH619px, estilo.textoCorLight]}>EVOLUÇÃO QTR</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[estilo.botao, estilo.corPrimaria]} onPress={()=>router.push('EVOLUÇÃO CIT', {aluno: aluno})}>
                    <Text style={[estilo.tituloH619px, estilo.textoCorLight]}>EVOLUÇÃO CIT</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[estilo.botao, estilo.corPrimaria]} onPress={()=>router.push('EVOLUÇÃO STRAIN', {aluno: aluno})}>
                    <Text style={[estilo.tituloH619px, estilo.textoCorLight]}>EVOLUÇÃO STRAIN</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[estilo.botao, estilo.corPrimaria]} onPress={()=>router.push('EVOLUÇÃO MONOTONIA', {aluno: aluno})}>
                    <Text style={[estilo.tituloH619px, estilo.textoCorLight]}>EVOLUÇÃO MONOTONIA</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[estilo.botao, estilo.corPrimaria]} onPress={()=>router.push('EVOLUÇÃO PSE DO EXERCÍCIO', {aluno: aluno})}>
                    <Text style={[estilo.tituloH619px, estilo.textoCorLight]}>EVOLUÇÃO PSE DO EXERCÍCIO</Text>
                </TouchableOpacity>

                </View>
        </SafeAreaView>
    )
}

const style = StyleSheet.create({
    container: {
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    areaBotoes: {
        width: '90%',

    },

})