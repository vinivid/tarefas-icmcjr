import { View } from "react-native";

import { useAuth } from "@/src/context/AuthContext";

import Botao from "@/src/components/Botao";

export default function Registrar() {
  const { login } = useAuth();

  return (
    <View>
      <Botao 
        conteudo="Tela principal"
        onPress={() => login()}
      >
      </Botao>
    </View>
  )
}