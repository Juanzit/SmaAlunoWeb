import React, { useState, useEffect } from "react"
import { Text, View, TouchableOpacity, StyleSheet, SafeAreaView, Dimensions, Alert } from 'react-native'
import estilo from "../../../estilo"
import { Foundation } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { doc, setDoc, collection, addDoc, updateDoc } from "firebase/firestore";
import { firebase, firebaseBD } from "../../../configuracoes/firebaseconfig/config"
import { alunoLogado, academiaDoAluno } from "../index";
import { useFonts } from "expo-font"
import NetInfo from '@react-native-community/netinfo';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { useRouter } from "expo-router";

const height = Dimensions.get('window').height
export default ({ route }) => {
  const router = useRouter();
  const { diario, ficha, aluno } = route.params
  console.log('Diario na seleção do treino ', diario)
  const [fontsLoaded] = useFonts({
    'Montserrat': require('../../../../assets/Montserrat-Light.ttf'),
  })

  const [conexao, setConexao] = useState(true)
  const [detalhamento, setDetalhamento] = useState({})


  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
     setConexao(state.type === 'wifi' || state.type === 'cellular')
    })

    return () => {
      unsubscribe()
    }
  }, [])


  const handleNavegacaoFicha = () => {
    const fichaAExiste = ficha.Exercicios.some(exercicio => exercicio.ficha === "A");

    if (fichaAExiste) {
      diario.maneiraDeTreino = "Ficha"
      router.push('../selecaodotreino/escolhafichas', { diario: diario, ficha, aluno })
    }else{
      diario.maneiraDeTreino = "Ficha"
      router.push('../telafichadetreino/fichadetreino', { diario: diario, ficha, aluno })
    }
  }

  const handleNavegacaoDiario = () => {
    const fichaAExiste = ficha.Exercicios.some(exercicio => exercicio.ficha === "A");

    if (!detalhamento.Exercicios) detalhamento.Exercicios = []

    if (fichaAExiste) {
      diario.maneiraDeTreino = "Diario";
      console.log('Aa')
      for (let i = 0; i < ficha.Exercicios.length; i++) {
        detalhamento.Exercicios[i] = {}
        router.push('../selecaodotreino/escolhafichas', { diario: diario, ficha, aluno, detalhamento });
      }
    } else{
      diario.maneiraDeTreino = 'Diario'
      console.log('Aa')
      for (let i = 0; i < ficha.Exercicios.length; i++) {
        detalhamento.Exercicios[i] = {}
        router.push('Diario', { diario: diario, ficha, aluno, detalhamento });
      }
    }
  }

  return (
    <SafeAreaView style={[estilo.corLightMenos1, style.container]}>
      {!conexao ?
        <TouchableOpacity onPress={() => {
          Alert.alert(
            "Modo Offline",
            "Atualmente, o seu dispositivo está sem conexão com a internet. Por motivos de segurança, o aplicativo oferece funcionalidades limitadas nesse estado. Durante o período offline, os dados são armazenados localmente e serão sincronizados com o banco de dados assim que uma conexão estiver disponível."
          );
        }} style={[estilo.centralizado, { marginTop: '10%', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }]}>
          <Text style={[estilo.textoP16px, estilo.textoCorDisabled]}>MODO OFFLINE - </Text>
          <AntDesign name="infocirlce" size={20} color="#CFCDCD" />
        </TouchableOpacity>
        : null}
        {
          ficha ? 
          <>
                <Text style={[estilo.textoP16px, style.textoEscolha, estilo.centralizado, style.Montserrat]}>Por onde gostaria de treinar? Não se esqueça de responder o formulário PSE para cadastrar sua presença.</Text>
      <View style={[style.areaBotoes, estilo.centralizado]}>
        <TouchableOpacity style={[estilo.corPrimaria, style.containerBotao]} onPress={() => { handleNavegacaoFicha() }}>
          <View style={{ height: '80%' }}>
            <Foundation name="clipboard-notes" size={100} color='#FFF' />
          </View>
          <Text style={[estilo.textoCorLight, estilo.tituloH619px]}>FICHA</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[estilo.corPrimaria, style.containerBotao]} onPress={() => { handleNavegacaoDiario() }}>
          <View style={{ height: '80%' }}>
            <Ionicons name="checkbox-outline" size={100} color="#FFF" />
          </View>
          <Text style={[estilo.textoCorLight, estilo.tituloH619px]}>DIÁRIO</Text>
        </TouchableOpacity>

      </View>
          </>
          :
          <>
                <Text style={[estilo.textoP16px, style.textoEscolha, estilo.centralizado, style.Montserrat]}>Sua ficha ainda não foi lançada.</Text>
      <View style={[style.areaBotoes, estilo.centralizado]}>
        <TouchableOpacity style={[estilo.corPrimaria, style.containerBotao]} onPress={() => { router.push('Home') }}>
          <View style={{ height: '80%' }}>
            <Entypo name="back" size={100} color="#FFF" />
          </View>
          <Text style={[estilo.textoCorLight, estilo.tituloH619px]}>VOLTAR</Text>
        </TouchableOpacity>

      </View>
          
          </>
          
          }
    </SafeAreaView>
  )
}

const style = StyleSheet.create({
  container: {
    height: height,
  },
  textoEscolha: {
    textAlign: 'left',
    marginTop: '30%',
    marginBottom: 10,
    width: '80%'
  },
  areaBotoes: {
    flexDirection: 'row'
  },
  containerBotao: {
    margin: 10,
    width: 150,
    height: 150,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 10,
    elevation: 10
  },
  Montserrat: {
    fontFamily: 'Montserrat'
  }
})