import React, { useEffect, useState } from 'react';
import { Alert, Text, View } from 'react-native';
import * as Progress from 'react-native-progress';
import { collection, getDocs, getFirestore, setDoc, doc } from 'firebase/firestore';
import estilo from '../estilo';
import { useRouter } from "expo-router";
import { Redirect } from 'expo-router';

export default function Routes({  }) {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { aluno} = params;
  const [carregando, setCarregando] = useState(true);
  const [fichas, setFichas] = useState([]);
  const [avaliacoes, setAvaliacoes] = useState([]);
  const [progresso, setProgresso] = useState(0.0);

  useEffect(() => {
    if (aluno) {
      fetchDados();
    }
  }, []);

  useEffect(() => {
    if (fichas.length > 0 && comparaDataVencimento(fichas[fichas.length - 1].dataFim, `${dia}/${mes}/${ano}`)) {
      Alert.alert(
        "Sua ficha está vencendo!", 
        `A sua ficha está prestes a vencer. Marque uma avaliação com um professor para que uma nova ficha seja montada. A ficha vence na data: ${fichas[fichas.length - 1].dataFim}`
      );
    }
  }, [fichas]);

  const fetchDados = async () => {
    setProgresso(0);

    try {
      const bd = getFirestore();
      const fichasRef = collection(bd, "Academias", aluno.Academia, "Alunos", `${aluno.email}`, 'FichaDeExercicios');
      const fichasSnapshot = await getDocs(fichasRef);
      const arrayFichaAux = [];
      let index = 0;

      for (const fichaDoc of fichasSnapshot.docs) {
        const fichaData = fichaDoc.data();
        arrayFichaAux.push(fichaData);
        arrayFichaAux[index].Exercicios = [];

        const exerciciosRef = collection(bd, "Academias", aluno.Academia, "Alunos", `${aluno.email}`, 'FichaDeExercicios', fichaDoc.id, "Exercicios");
        const exercicioSnapshot = await getDocs(exerciciosRef);

        for (const exercicioDoc of exercicioSnapshot.docs) {
          const exercicioData = exercicioDoc.data();
          arrayFichaAux[index].Exercicios.push(exercicioData);
        }
        index++;
      }

      setProgresso(0.3);
      setFichas(arrayFichaAux);

      const avaliacoesRef = collection(bd, "Academias", aluno.Academia, "Alunos", `${aluno.email}`, 'Avaliações');
      const avaliacoesSnapshot = await getDocs(avaliacoesRef);
      const arrayAvaliacoes = [];

      for (const avaliacaoDoc of avaliacoesSnapshot.docs) {
        const avaliacaoData = avaliacaoDoc.data();
        arrayAvaliacoes.push(avaliacaoData);
      }

      setProgresso(0.6);
      setAvaliacoes(arrayAvaliacoes);

    } catch (error) {
      console.error('Erro ao buscar alunos:', error);
    } finally {
      setProgresso(1);
      setCarregando(false);
    }
  };

  if (!aluno) {
    return (
      <View style={estilo.centralizado}>
        <Text style={estilo.textoCorPrimaria}>Erro: Aluno não encontrado.</Text>
      </View>
    );
  }

  if (carregando) {
    return (
      <View style={[estilo.centralizado, { marginTop: 'auto', marginBottom: 'auto', alignItems: 'center' }]}>
        <Text style={[estilo.textoCorPrimaria, estilo.textoP16px, { marginBottom: 20 }]}>Carregando...</Text>
        <Progress.Circle size={100} indeterminate={false} progress={progresso} />
      </View>
    );
  }

  useEffect(() => {
    router.push('./dashboard');
  }, []);

  return null;
}
