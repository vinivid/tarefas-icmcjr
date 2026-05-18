import { useState } from "react";
import { View } from "react-native";

import { useAuth } from "@/src/context/AuthContext";

import { Colors } from "@/src/constants/theme";

import Botao from "@/src/components/Botao";
import LineInput from "@/src/components/LineInput";

export default function Login() {
  const [name, setName] = useState('')
  const { login } = useAuth();

  return (
    <View style={{backgroundColor: Colors.light.background}}>
      <LineInput
        label="Nome"
        onChangeText={setName}
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