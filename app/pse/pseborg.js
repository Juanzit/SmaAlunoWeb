import React, {useState} from "react"
import {Text, View, SafeAreaView, ScrollView, StyleSheet, Modal, TouchableOpacity} from 'react-native'
import estilo from "../estilo"
import RadioBotao from "../radiobotao"
import { doc, setDoc, collection, addDoc, updateDoc, getFirestore } from "firebase/firestore"; 
import { firebase, firebaseBD } from "../configuracoes/firebaseconfig/config"
import { alunoLogado, academiaDoAluno} from "../home";
import {PSE} from "../../classes/PSE"
import { diarioDoDia } from "../qtr";
import { ExercicioNoDiario } from "../../classes/ExercicioNoDiario";
import { DetalhamentoExercicioForca } from "../../classes/DetalhamentoDoExercicio";
import { contadorPSE } from "../detalhamento";
import { useRouter } from "expo-router";

export default ({options =[], tipoPSE, route}) => {
  const router = useRouter();
  const [selected, setSelected] = useState(0)
  const {nomeExercicio, repeticao, diario, index, detalhamento} = route.params

  console.log("Diario no detalhamento ", diario)
  const [value, setValue] = useState(0)
  const [resposta, setResposta] = useState('6. Nenhum esforço')
  const data = new Date()
  let dia = data.getDate()
  let mes = data.getMonth() + 1
  const ano = data.getFullYear()
  const hora = data.getHours()
    if (dia < 10){
      dia = `0${dia}`
    }
    if (mes < 10){
      mes = `0${mes}`
    }
    console.log(detalhamento.Exercicios)

    const criarDetalhamento = () => {
      const chave = `PSEdoExercicioSerie${repeticao}`;
      
      if (typeof detalhamento.Exercicios === 'undefined') {
        detalhamento.Exercicios = [];
      }
      
      if (typeof detalhamento.Exercicios[index] === 'undefined') {
        detalhamento.Exercicios[index] = {};
      }
    
      if (value == 0) {
        setValue(0);
        setResposta("0 - 30. Normalidade");
      }
    
      const dados = {
        resposta: resposta,
        valor: value,
      };
      
      detalhamento.Exercicios[index][chave] = dados;
      console.log('detalhamento.Exercicios[index][chave] = dados ', detalhamento.Exercicios[index][chave]);
    }

  return (
      <Modal
      animationType="slide"
      >

      <ScrollView style={[style.container, estilo.corLightMenos1]}>
          <SafeAreaView style={[style.conteudo, estilo.centralizado]}>
              <Text style={[estilo.tituloH523px, estilo.textoCorSecundaria]}>{tipoPSE}</Text>
              {tipoPSE == 'PSE' ? <Text style={[estilo.tituloH619px, estilo.textoCorSecundaria, style.subtitulo]}>Quão intenso foi seu treino?</Text> :  
                             <Text style={[estilo.tituloH619px, estilo.textoCorSecundaria, style.subtitulo]}>Quão intenso foi esta série de exercício?</Text>
}
              <RadioBotao 
                      options ={options}
                      selected={selected}
                      onChangeSelect={(opt, i) => {
                      setSelected(i); setResposta(opt); setValue(i + 6)}}></RadioBotao>
                      <View style={{paddingTop: 20}}>
                      <TouchableOpacity style={[estilo.botao, estilo.corPrimaria]} onPress={()=>{  criarDetalhamento();navigation.goBack(); 
}}>
                          <Text style={[estilo.textoCorLight, estilo.tituloH619px]}>RESPONDER {tipoPSE}</Text>
                      </TouchableOpacity>
                      </View> 
          </SafeAreaView>
      </ScrollView>
      </Modal>

  )
}


const style = StyleSheet.create({
  container: {
      width: '100%',
  },
  conteudo: {
      width: '90%',
      margin: 20,
  },
  subtitulo: {
      marginTop: 20
  },
})