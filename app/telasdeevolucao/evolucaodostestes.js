import React, {useState, useEffect} from "react"
import {Text, View, SafeAreaView, ScrollView, StyleSheet } from 'react-native'
import estilo from "../estilo"
import RadioBotao from "../radiobotao"
import {VictoryChart, VictoryLine, VictoryTheme, VictoryVoronoiContainer, VictoryLabel} from "victory-native"
import {useFonts} from 'expo-font'
import { doc, setDoc, collection,getDocs, query,where ,addDoc, getFirestore } from "firebase/firestore"; 
import { firebase, firebaseBD } from "../configuracoes/firebaseconfig/config"
import { Entypo } from '@expo/vector-icons'; 

export default ({route}) => {
    const {aluno} = route.params
    const [arrayDinamometriaPernas, setArrayDinamometriaPernas] = useState([]);
    const [arrayResistenciaAbdominal, setArrayResistenciaAbdominal] = useState([]);
    const [arraySentarAlcancar, setArraySentarAlcancar] = useState([]);
    const [arrayFrequenciaCardiacaDeRepouso, setArrayFrequenciaCardiacaDeRepouso] = useState([]);
    const [arrayCinturaMedida3, setArrayCinturaMedida3] = useState([]);
    const [totalAvaliacoes, setTotalAvaliacoes] = useState(0);

    const [carregandoDados, setCarregandoDados] = useState(true);

    const [fontsLoaded] = useFonts({
        'Montserrat': require('../../assets/Montserrat-Light.ttf'),
    })

    const getAvaliacoes = async () => {
        const user = firebase.auth().currentUser;
        const db = getFirestore();
        const alunoRef = collection(db, "aluno");
        const email = user.email;
        const queryAluno = query(alunoRef, where("email", "==", email));
        const avaliacoesRef = collection(db, "Academias", aluno.Academia, 'Alunos', `${aluno.email}`, 'Avaliações');
        const querySnapshot = await getDocs(avaliacoesRef);


        const newArrayDinamometriaPernas = [];
        const newArrayResistenciaAbdominal = [];
        const newArraySentarAlcancar = [];
        const newArrayFrequenciaCardiacaDeRepouso = [];


        querySnapshot.forEach((doc)=> {
            newArrayDinamometriaPernas.push(doc.get('dinamometriaPernasMedida3'))
            newArrayResistenciaAbdominal.push(doc.get('ResistenciaAbdominal'))
            newArraySentarAlcancar.push(doc.get('TesteSentarAlcancarMedida3'))
            newArrayFrequenciaCardiacaDeRepouso.push(doc.get('dinamometriaPernasMedida3'))
        });  
        setTotalAvaliacoes(newArrayDinamometriaPernas.length);
        setArrayDinamometriaPernas(newArrayDinamometriaPernas);
        setArraySentarAlcancar(newArraySentarAlcancar)
        setArrayResistenciaAbdominal(newArrayResistenciaAbdominal)
        setArrayFrequenciaCardiacaDeRepouso(newArrayFrequenciaCardiacaDeRepouso)

        setCarregandoDados(false);


    };

    useEffect(() => {
        getAvaliacoes();
    }, []);

    useEffect(() => {
    const totalAvaliacoes = arrayDinamometriaPernas.length;
    }, [arrayDinamometriaPernas]);
    
    const arrayResistenciaAbdominalNoGrafico =  arrayResistenciaAbdominal.map((element, i)=> {
        return {x: +i+1, y: element}
        
    })
    const arraySentarAlcancarNoGrafico =  arraySentarAlcancar.map((element, i)=> {
        return {x: +i+1, y: element}
        
    })
    const arrayDinamometriaPernasNoGrafico =  arrayDinamometriaPernas.map((element, i)=> {
        return {x: +i+1, y: element}
        
    })
    const arrayFrequenciaCardiacaDeRepousoNoGrafico =  arrayFrequenciaCardiacaDeRepouso.map((element, i)=> {
        return {x: +i+1, y: element}
        
    })



    const[opcao, setOpcao] = useState('')
    const[titulo,setTitulo] = useState('')

    const vetorContador = []
    for(let i =  0; i < arrayDinamometriaPernas.length; i++){
        vetorContador[i] = i+1
    }

    const avaliacaoPorOrdem = vetorContador.map((i) => {
        return `Avaliação ${i}`
    })
    if (carregandoDados || !fontsLoaded) {
        return <Text>Carregando...</Text>;
    }

    console.log(arrayResistenciaAbdominal)
    return (
<ScrollView style={[estilo.corLightMenos1, style.container]}>
            <SafeAreaView>

                    {carregandoDados ? (
                        <Text>Carregando dados...</Text>
                    ) : arrayResistenciaAbdominal.length == 0 ? (<View>
                        <Text style={[estilo.centralizado, estilo.tituloH333px]}>Ops...</Text>
                        <View style={[estilo.centralizado, {marginTop: '5%'}]}><Entypo name="emoji-sad" size={100} color="#182128" /></View>
                        <Text style={[ estilo.textoCorSecundaria, estilo.textoP16px, {marginTop: '10%', textAlign: 'center', marginHorizontal: '5%'}, style.Montserrat]}>Você ainda não possui nenhuma avaliação cadastrada. Realize uma avaliação física e tente novamente mais tarde.</Text>
                    </View>) :   (
                    <View>
                                    <Text style={[estilo.tituloH619px, estilo.textoCorSecundaria, estilo.centralizado, {marginTop: '3%'}]}>Evolução corporal:</Text>
                <Text style={[estilo.tituloH619px, estilo.textoCorSecundaria, estilo.centralizado, {marginTop: '3%'}]}>{titulo || 'Massa corporal'}</Text>
                        <VictoryChart theme={VictoryTheme.material}>
                            <VictoryLine
                                containerComponent={<VictoryVoronoiContainer/>}
                                animate={{
                                    duration: 2000,
                                    onLoad: { duration: 1000 }
                                }}
                                style={{
                                    data: { stroke: "#0066FF" },
                                    parent: { border: "1px solid #182128"},
                                }}
                                categories={{ x: avaliacaoPorOrdem}}

                                data={titulo == 'Dinamometria pernas' ? arrayDinamometriaPernasNoGrafico : 
                                titulo == 'Resistência Abdominal' ? arrayResistenciaAbdominalNoGrafico :
                                titulo == 'Sentar e alcançar' ? arraySentarAlcancarNoGrafico : 
                                titulo == 'Frequência cardíaca de repouso' ? arrayFrequenciaCardiacaDeRepousoNoGrafico : 
                                arrayDinamometriaPernasNoGrafico
                                 } />
                    
                    </VictoryChart>
                    <View style={{marginLeft: '5%', marginBottom: '10%'}}>
                    <Text style={[estilo.textoP16px, estilo.textoCorSecundaria, style.Montserrat]}>Selecione o parâmetro que deseja visualizar sua evolução:</Text>
                    <RadioBotao
                            options={['Dinamometria pernas', 'Resistência Abdominal', 'Sentar e alcançar', 'Frequência cardíaca de repouso']}
                            selected={opcao}
                            onChangeSelect={(opt, i) => { setOpcao(i); setTitulo(opt)}}
                        >
                    </RadioBotao>
                </View>
                    </View>
                    ) }
                

            </SafeAreaView>
        </ScrollView>
    )
}

const style = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%'
    },
    Montserrat: {
        fontFamily: 'Montserrat'
    }
})