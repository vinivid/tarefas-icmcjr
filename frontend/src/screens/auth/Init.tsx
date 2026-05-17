import { Image, StyleSheet, View } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { type AuthScreenNavigationProp } from "@/src/navigation/AuthNavigator";

import Botao from "@/src/components/Botao";

export default function Init() {
  const navigation = useNavigation<AuthScreenNavigationProp>();

  return (
    <View>
      <Image 
        style={styles.img} 
        source={require('@/src/assets/images/stock_init.jpg')}
        />
        <View>
          <Botao 
            conteudo="Login"
            onPress={ () => navigation.push('Login') }
          />
          <Botao 
            conteudo="Registrar"
            onPress={ () => navigation.push('Registrar') } 
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