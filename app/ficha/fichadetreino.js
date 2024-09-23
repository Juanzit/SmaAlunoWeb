import React, { useState, useEffect } from "react"
import { Text, View, SafeAreaView, Dimensions, StyleSheet, ScrollView, ActivityIndicator } from 'react-native'
import estilo from "../estilo"
import ExerciciosAlongamento from "./exerciciosalongamento"
import ExerciciosCardio from "./exercicioscardio"
import ExerciciosForça from "./exerciciosforça"

export default ({ exercicios }) => {
  const [fichaValida, setFichaValida] = useState(false)
  const [verificando, setVerificando] = useState(true)
  console.log('exercicios', exercicios)
  console.log('typeof exercicios', exercicios)

  const exerciciosNaFicha = [...exercicios]

  console.log('exerciciosNaFicha', exerciciosNaFicha)
  const fichasUnicas = [...new Set(exercicios.map(item => item.ficha))];

  return (
    <ScrollView style={style.container}>
      {fichasUnicas.length > 0 ? (
        fichasUnicas.map((ficha) => (
          <View key={ficha}>
            <Text>Ficha {ficha}</Text>
            {exercicios.map((item, index) =>
              item.ficha === ficha ? (
                <View key={index} style={{ width: '100%' }}>
                  {item.tipo === 'força' ? (
                    <ExerciciosForça
                      nomeDoExercicio={item.Nome.exercicio}
                      series={item.series}
                      repeticoes={item.repeticoes}
                      descanso={item.descanso}
                      cadencia={item.cadencia}
                      imagem={item.Nome.imagem}
                    />
                  ) : item.tipo === 'aerobico' ? (
                    <ExerciciosCardio
                      nomeDoExercicio={item.Nome.exercicio}
                      velocidadeDoExercicio={item.velocidade}
                      duracaoDoExercicio={item.duracao}
                      seriesDoExercicio={item.series}
                      descansoDoExercicio={item.descanso}
                    />
                  ) : item.tipo === 'alongamento' ? (
                    <ExerciciosAlongamento
                      nomeDoExercicio={item.Nome}
                      series={item.series}
                      descanso={item.descanso}
                      repeticoes={item.repeticoes}
                      imagem={item.imagem}
                    />
                  ) : null}
                </View>
              ) : null
            )}
          </View>
        ))
      ) : (
        <Text style={[{ marginHorizontal: 15, textAlign: 'justify' }, estilo.textoP16px, estilo.textoCorSecundaria]}>
          A última ficha ainda não foi lançada. Solicite ao professor responsável para lançá-la e tente novamente mais tarde.
        </Text>
      )}
    </ScrollView>
  );
}
const style = StyleSheet.create({
  container: {
    width: '100%',

  }
})