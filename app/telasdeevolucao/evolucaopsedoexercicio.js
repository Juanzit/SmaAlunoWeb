import React, {useState, useEffect, useCallback} from "react"
import {Text, View, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import estilo from "../estilo"
import RadioBotao from "../radiobotao"
import {VictoryChart, VictoryLine, VictoryTheme, VictoryVoronoiContainer, VictoryLabel, VictoryAxis} from "victory-native"
import {useFonts} from 'expo-font'
import { doc, setDoc, collection,getDocs, query,where ,addDoc, getFirestore, getDoc } from "firebase/firestore"; 
import { firebase, firebaseBD } from "../configuracoes/firebaseconfig/config"
import { Entypo } from '@expo/vector-icons'; 
import Spinner from "react-native-loading-spinner-overlay"
import NetInfo from '@react-native-community/netinfo';
import BotaoSelect from "../botaoselect"
import { alunoLogado } from "../home"
import moment from 'moment';
import { useRouter } from "expo-router";

export default ({route}) => {
  const router = useRouter();
  const {aluno} = route.params
    const [arrayNomeExercicio, setArrayExercicio] = useState([]);
    const [carregandoDados, setCarregandoDados] = useState(true);
    const [conexao, setConexao] = useState(true)

    useEffect (() => {
      const unsubscribe = NetInfo.addEventListener(state => {
        setConexao(state.type === 'wifi' || state.type === 'cellular')

      })

      return () => {
        unsubscribe()
      }
    })
    const getExercicios = async () => {
      const db = getFirestore()
      const diariosRef = collection(db, "Academias", aluno.Academia, "Alunos",`${aluno.email}`, 'Diarios');

      const querySnapshot = await getDocs(diariosRef);
    
      const promises = [];
      querySnapshot.forEach((doc) => {
        const exerciciosRef = collection(doc.ref, "Exercicios");
        const promise = getDocs(exerciciosRef).then((exerciciosSnapshot) => {
          const exercicios = exerciciosSnapshot.docs.map((exercicioDoc) => {
            return {
              nome: exercicioDoc.data().Nome.exercicio,
              tipo: exercicioDoc.data().tipo
            };
          });
          return exercicios;
        });
        promises.push(promise);
      });
    
      const arraysNomeExercicio = await Promise.all(promises);
      const newArrayNomeExercicio = arraysNomeExercicio.flat();
    
      setArrayExercicio(newArrayNomeExercicio);
      setCarregandoDados(false);
    };
    useEffect(() => {
      getExercicios();
    }, []);
  
    console.log('aluno ', aluno)
    return (
      <ScrollView style={[estilo.corLightMenos1, {height: '100%'} ]}>
        <SafeAreaView style={[estilo.container]}>
          {conexao ? <View style={[styles.conteudo, estilo.centralizado]}>
            <Text style={[{fontSize: 20, marginBottom: '10%'}, estilo.textoCorSecundaria, styles.Montserrat]}>Selecione o exercício que deseja visualizar a evolução.</Text>
            {carregandoDados ? 
             <Spinner
             visible={carregandoDados}
             textContent={'Carregando dados...'}
             textStyle={[estilo.textoCorLight, estilo.textoP16px]}
           />: 
            <View>
       {arrayNomeExercicio.map((exercicio) => {
  return exercicio.tipo === 'força' || exercicio.tipo == 'aerobico' ? (
    <TouchableOpacity
      style={[
        styles.botaoExercicio,
        estilo.corLight,
        estilo.sombra,
      ]}
      onPress={() =>
        navigation.navigate("Evolução PSE do Exercício", {
          nome: exercicio.nome,
          tipo: exercicio.tipo, 
          aluno: aluno,
        })
      }
    >
      <Text
        style={[
          estilo.textoP16px,
          styles.Montserrat,
          estilo.textoCorSecundaria,
          { marginLeft: "5%", marginTop: "auto", marginBottom: "auto" },
        ]}
      >
        Exercício {exercicio.nome} ({exercicio.tipo == 'aerobico' ? 'Pse Borg' : 'Pse Omni'})
      </Text>
    </TouchableOpacity>
  ) : null;
            })}
          </View>
            }
          </View>: <ModalSemConexao />}
        </SafeAreaView>
      </ScrollView>
    );
  }
const styles = StyleSheet.create({
    container: {
        marginBottom: '5%',
        height: '100%'
    },
    Montserrat: {
        fontFamily: 'Montserrat'
    },
    conteudo: {
        marginVertical: '15%',
        width: '95%'
    },
    botaoExercicio: {
        width: '95%',
        height: 60,
        marginTop: '1%'
        
    }
});