import { useRouter } from "expo-router";
import { View } from "react-native";

import Botao from "@/src/components/Botao";

export default function Registrar() {
  const router = useRouter();

  return (
    <View>
      <Botao 
        conteudo="Tela principal"
        onPress={() => {
          router.dismissAll();
          router.replace('/tarefas');
        }}
      >
      </Botao>
    </View>
  )
}