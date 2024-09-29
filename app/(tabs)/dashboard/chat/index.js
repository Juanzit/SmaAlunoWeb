import React, {useState, useEffect} from "react"
import { Text, SafeAreaView, StyleSheet, TouchableOpacity, Image, ScrollView } from "react-native"
import Logo from '../../../logo'
import estilo from "../../../estilo"
import { FontAwesome5 } from '@expo/vector-icons'; 
import {firebase, firebaseBD} from '../../../configuracoes/firebaseconfig/config'
import { collection,setDoc,doc, getDocs, getDoc,getFirestore, where , query , addDoc, updateDoc, orderBy} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from '@firebase/storage';
import { alunoLogado } from "../index";
import Conversas from "./conversas";
import Spinner from "react-native-loading-spinner-overlay";
import NetInfo from "@react-native-community/netinfo"
import ModalSemConexao from "../modalsemconexao";
import * as Notification from "expo-notifications"
import { useRouter } from "expo-router";

export default ({route}) => {
    const router = useRouter();
    const {aluno} = route.params
    const [imageUrl, setImageUrl] = useState(null);
    const [loading, setLoading] = useState(true)
    const [professores, setProfessores] = useState([])
    const [carregandoProfessores, setCarregandoProfessores] = useState(false)
    const [conexao, setConexao] = useState(true)

    useEffect (() => {
      const unsubscribe = NetInfo.addEventListener(state => {
        setConexao(state.type == 'wifi' || state.type === 'cellular')
      })

      return () => {
        unsubscribe()
      }

    }, [])
    useEffect(() => {
      const fetchProfessores = async () => {
        try {
          const academiaRef = collection(firebaseBD, 'Academias');
          const querySnapshot = await getDocs(academiaRef);
    
          const newArrayProfessores = [];
    
          for (const academiaDoc of querySnapshot.docs) {
            const academiaNome = academiaDoc.get('nome');
            if (academiaNome === aluno.Academia) {
              const professoresRef = collection(
                academiaDoc.ref,
                'Professores'
              );
              const professoresSnapshot = await getDocs(professoresRef);

              for (const professorDoc of professoresSnapshot.docs) {

                const professorData = professorDoc.data();
                   const mensagensRef = collection(
                  firebaseBD, 'Academias', aluno.Academia, 'Professores', professorData.email,
                  'Mensagens',
                  `Mensagens ${aluno.email}`,
                  'todasAsMensagens'
                );
                
                const q = query(mensagensRef, orderBy('data', 'asc'));
                const mensagensSnapshot = await getDocs(q);
      
                console.log(q._query.he.ce)
                const lastMessageDoc = mensagensSnapshot.docs[mensagensSnapshot.docs.length - 1];
                if (lastMessageDoc) {
                  const remetente = lastMessageDoc.get('remetente');
                  newArrayProfessores.push({ professor: professorData, remetente: remetente });
                } else {
                  const remetente = 'ninguem';
                  newArrayProfessores.push({ professor: professorData, remetente: remetente });
                }
              }

            }
          }
          setProfessores(newArrayProfessores);
          setCarregandoProfessores(false);
          console.log('newArrayProfessores', newArrayProfessores)
        } catch (error) {
          Alert.alert("Ocorreu um erro", error);
        }
      };
    
      fetchProfessores();
    }, []);
    
      
    const handleNotificationLocal = async(alunoUltimaMensagem) => {
      await Notification.scheduleNotificationAsync({
          content: {
              title: 'Nova mensagem!',
              body: `Nova mensagem do professor ${alunoUltimaMensagem}`, 
              data: []
          } ,
          trigger: {
              seconds: 1
          }
      });
  }
    return (
      <ScrollView style={style.container}>
      {carregandoProfessores ? (
        <>
          <Spinner
            visible={carregandoProfessores}
            textContent={'Carregando mensagens...'}
            textStyle={[estilo.textoCorLight, estilo.textoP16px]}
          />
          {alert("Não apareceram professores.")}
        </>
      ) : (
        professores.map((professor) => {
          professor.remetente !== aluno.email && professor.remetente !== 'ninguem'
            ? handleNotificationLocal(professor.remetente)
            : '';
          console.log('professor', professor.remetente);
          return (
            <Conversas
              professor={professor}
              aluno={aluno}
              router={router}
              backgroundColor={
                professor.remetente !== aluno.email &&
                professor.remetente !== 'ninguem'
                  ? '#0066FF'
                  : '#FFFFFF'
              }
            />
          );
        })
      )}
    </ScrollView>    
    )
}

const style = StyleSheet.create({
    container: {
        width: '100%'
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
    foto: {
        width: 50,
        height: 50, 
        borderRadius: 25
    },
    botao: {
        flexDirection: 'row',
        alignItems: 'center', // Alinha os itens verticalmente
        justifyContent: 'space-around', // Alinha os itens horizontalmente

    }

})