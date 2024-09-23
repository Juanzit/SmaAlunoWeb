import React, { useState, useEffect } from 'react'
import { Text, SafeAreaView, StyleSheet, View, Pressable, TextInput, Alert } from 'react-native'
import Estilo from "../estilo"
import Logo from '../logo'
import { useFonts } from 'expo-font';
import { firebase } from '../configuracoes/firebaseconfig/config'
import NetInfo from '@react-native-community/netinfo';
import Modal from 'react-native-modal'
import { FontAwesome5 } from '@expo/vector-icons';

import { Aluno } from '../../classes/Aluno'
import { Endereco } from '../../classes/Endereco'
import { useRouter } from 'expo-router';

const alunoLogado = new Aluno();
const enderecoAluno = new Endereco();
const enderecoAcademia = new Endereco();

export default function LoginScreen() {
  const router = useRouter();
  const [fontsLoaded] = useFonts({
    'Montserrat': require('../../assets/Montserrat-Light.ttf'),
  });

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [emailRecuperacao, setEmailRecuperacao] = useState('');

  const handleLogin = () => {
      firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
          router.push('/app/home');
        })
        .catch((error) => {
          let mensagemDeErro = '';
          switch (error.code) {
            case 'auth/invalid-email':
              mensagemDeErro = 'Email inválido. Tente novamente.';
              break;
            case 'auth/wrong-password':
              mensagemDeErro = 'Senha incorreta.';
              break;
            case 'auth/user-not-found':
              mensagemDeErro = 'Usuário não encontrado. Tente novamente.';
              break;
            default:
              mensagemDeErro = "Erro desconhecido. Tente novamente mais tarde.";
          }
          alert(mensagemDeErro);
        });

  };

  const mudarSenha = (email) => {
    if (email === '') {
      Alert.alert("Email não informado", "Informe o email antes de prosseguir.");
    } else {
      firebase.auth().sendPasswordResetEmail(email).then(() => {
        Alert.alert("Email enviado", "Foi enviado um email para recuperação de senha.");
        setModalVisible(false);
      }).catch((error) => {
        Alert.alert("Erro:", error);
        setModalVisible(false);
      });
    }
  };

  return (
    <SafeAreaView style={[Estilo.corLightMenos1]}>
      <View style={style.container}>
        <View style={style.areaLogo}>
          <Logo tamanho="grande" style={[Estilo.tituloH619px]} />
        </View>
        <View style={style.areaLogin}>
          <Text style={[Estilo.tituloH619px]}>Email:</Text>
          <TextInput
            placeholder="Email"
            value={email}
            style={[style.inputText, Estilo.corLight]}
            onChangeText={(text) => setEmail(text)}
          />
          <Text style={[Estilo.tituloH619px]}>Senha:</Text>
          <TextInput
            placeholder="Senha"
            secureTextEntry={true}
            value={password}
            style={[style.inputText, Estilo.corLight]}
            onChangeText={(text) => setPassword(text)}
          />
          
          <Pressable onPress={handleLogin}
            style={[Estilo.corPrimaria, style.botao]}>
            <Text style={[Estilo.tituloH523px, Estilo.textoCorLight]}>ENTRAR</Text>
          </Pressable>
          
          <View style={[style.textoLink, style.ultimoLink]}>
            <Text
              style={[Estilo.textoCorPrimaria, Estilo.textoSmall12px]}
              onPress={()=>router.push('/navegacaologinscreen/cadastroscreen')}
              
            >
              Não possui conta? Cadastre-se agora gratuitamente
            </Text>
          </View>

          <View style={[{ marginTop: '10%' }, Estilo.centralizado]}>
            <Text
              style={[Estilo.textoCorPrimaria, Estilo.textoSmall12px]}
              onPress={() => setModalVisible(true)}
            >
              Esqueceu sua senha? Aperte aqui.
            </Text>
            <Modal isVisible={modalVisible}>
              <View style={{ height: '60%', justifyContent: 'space-around', alignItems: 'center' }}>
                <Text style={[Estilo.tituloH619px, Estilo.textoCorLight, { textAlign: 'center' }]}>
                  Digite seu email abaixo. Enviaremos um email para recuperação de senha.
                </Text>
                <FontAwesome5 name="user-lock" size={90} color="#0066FF" />
                <TextInput
                  placeholder="Email@exemplo.com"
                  value={emailRecuperacao}
                  style={[style.inputText, Estilo.corLight]}
                  onChangeText={(text) => setEmailRecuperacao(text)}
                />
                <Pressable style={[Estilo.botao, Estilo.corPrimaria]} onPress={() => mudarSenha(emailRecuperacao)}>
                  <Text style={[Estilo.textoCorLight, Estilo.tituloH619px]}>ENVIAR EMAIL</Text>
                </Pressable>
                <Pressable style={[Estilo.botao]} onPress={() => setModalVisible(false)}>
                  <Text style={[Estilo.textoCorLight, Estilo.tituloH619px]}>CANCELAR</Text>
                </Pressable>
              </View>
            </Modal>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  container: {
    marginBottom: '5%',
    height: '100%'
  },
  areaLogo: {
    marginTop: '5%'
  },
  areaLogin: {
    marginTop: '30%',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '90%',
  },
  textoLink: {
    marginLeft: 'auto',
    marginRight: 'auto',
    borderBottomWidth: 1,
    marginTop: '5%',
    borderBottomColor: '#0066FF'
  },
  inputText: {
    width: '100%',
    padding: 10,
    height: 50,
    borderRadius: 10,
    marginVertical: 15,
    elevation: 10
  },
  botao: {
    width: 170,
    paddingVertical: 11,
    borderRadius: 100,
    marginTop: '15%',
  }
});
