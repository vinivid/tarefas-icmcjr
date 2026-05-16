import { useRouter } from "expo-router";
import { Image, StyleSheet, View } from "react-native";

import Botao from "@/src/components/Botao";

export default function Index() {
  const router = useRouter();

  return (
    <View>
      <Image 
        style={styles.img} 
        source={require('@/src/assets/images/stock_init.jpg')}
        />
        <View>
          <Botao 
            conteudo="Login"
            onPress={ () => router.push('/login') } 
          />
          <Botao 
            conteudo="Registrar"
            onPress={ () => router.push('/registrar') } 
          />
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
  img : {
    width: "100%",
    height: "70%"
  }
})