import { Pressable, StyleSheet, Text } from "react-native";

import { Colors } from "@/src/constants/theme";

export type ButtonProps = {
  conteudo : string,
  onPress : () => void
}

export default function Botao({
  conteudo,
  onPress
} : ButtonProps) {
  return (
    <Pressable
      style={styles.btn}
      onPress={onPress}
    >
      <Text 
        style={styles.btnText}
      >
        {conteudo}
      </Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  btn : {
    backgroundColor: Colors.light.primary,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    paddingTop: 16,
    paddingBottom: 16,
    paddingRight: 20,
    paddingLeft: 20,
    borderRadius: 100
  },
  btnText : {
    color: Colors.light.background,
    fontFamily: "RobotoMono_700Bold"
  }
})