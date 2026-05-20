import { useState } from "react";
import { View, StyleSheet } from "react-native";

import { useAuth } from "@/src/context/AuthContext";

import { Colors } from "@/src/constants/theme";

import Botao from "@/src/components/Botao";
import LineInput from "@/src/components/LineInput";

const LoginType = {
  Email: "Email",
  Cpf: "Cpf"
};

export default function Login() {
  const { login } = useAuth();

  const [ logType, setLogType ] = useState(LoginType.Email);
  const [ name, setName ] = useState('');

  return (
    <View style={{flex: 1, backgroundColor: Colors.light.background}}>
      <LineInput
        label="Email/cpf"
        onChangeText={() => {
          setName
        }}
        onClosePress={() => setName('')}
        value={name}
      >
      </LineInput>

      <Botao 
        conteudo="Logar"
        onPress={() => login()}
      >
      </Botao>
    </View>
  )
}

const styles = StyleSheet.create({

})