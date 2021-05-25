import React, { useState, useRef } from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Keyboard} from 'react-native';
import api from './src/services/api';

export default function App(){

    const [cep, setCep]= useState('');
    const inputRef = useRef(null);
    const [cepUser, setCepUser] = useState(null);

    async function buscar(){
        if (cep== ''){
            alert ('Digite um cep valido');
            setCep('');
            return;//
        }
   

    try{
        const response = await api.get(`/${cep}/json`);
        console.log(response.data);
        setCepUser(response.data);
        Keyboard.dismiss();

    }catch(error){
        console.log('ERROR: ' + error);
    }

    }

    function limpar(){
        setCep('');
        inputRef.current.focus();
        setCepUser(null);
    }

   
    return(
        <SafeAreaView style={estilos.container}>
          <View style={{alignItems:'center'}}>
            <Text style={estilos.text}>Digite o Cep desejado </Text>
            <TextInput
            style={estilos.input}
            placeholder="Ex: 12345678"
            value={cep}
            onChangeText={(texto) => setCep(texto) }
            keyboardType="numeric"
            ref={inputRef}
            />
          </View>
          <View style={estilos.areaBtn}>
          <TouchableOpacity style={[estilos.botao, {backgroundColor: '#4169E1'}]}
          onPress={buscar}
          >
                <Text style={estilos.botaoText}> Buscar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[estilos.botao, {backgroundColor: '#708090'}]}
            onPress={limpar}
            >
                <Text style={estilos.botaoText}> Limpar </Text>
            </TouchableOpacity>
         </View>
        { cepUser &&    
         <View style={estilos.resultado}>
             <Text style={estilos.itemText}>CEP:{cepUser.cep}</Text>
             <Text style={estilos.itemText}>Logradouro: {cepUser.logradouro}</Text>
             <Text style={estilos.itemText}>Bairro: {cepUser.bairro}</Text>
             <Text style={estilos.itemText}>Cidade: {cepUser.localidade}</Text>
             <Text style={estilos.itemText}>Estado: {cepUser.uf}</Text>
         </View>
         }

        </SafeAreaView>




    );
}


const estilos = StyleSheet.create({
    container:{
        flex: 1,
    },

    text:{
       marginTop: 25,
       marginBottom: 15,
       fontSize: 25,
       fontWeight: 'bold'

    },

    input:{
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor:'#DDD',
        borderRadius: 5,
        width: '80%',
        padding: 10,
        fontSize: 18


    },
    areaBtn:{
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 20,
        justifyContent: 'space-around'
    },

    botao:{
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#B0E0E6'


    },

    botaoText:{
        fontSize: 20,
        color: '#fff'
    },
    resultado:{
        flex: 1,
        justifyContent: 'center',
        alignItems:'center'
        
    },

    itemText:{
        fontSize:25,
        
    }
    




}); 