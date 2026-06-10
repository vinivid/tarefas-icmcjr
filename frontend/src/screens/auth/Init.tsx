import { Image, StyleSheet, View, useWindowDimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { type AuthScreenNavigationProp } from "@/src/navigation/AuthNavigator";

import Botao from "@/src/components/Botao";

export default function Init() {
  const navigation = useNavigation<AuthScreenNavigationProp>();
  const { width } = useWindowDimensions();
  const isDesktop = width >= 768;

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.inner,
          isDesktop ? styles.innerDesktop : styles.innerMobile,
        ]}
      >
        <Image
          source={require("@/src/assets/images/stock_init.png")}
          resizeMode="contain"
          style={[
            styles.img,
            isDesktop
              ? styles.imgDesktop
              : {
                  width: width * 0.9,
                  height: width * 0.9,
                  maxWidth: 400,
                  maxHeight: 350,
                },
          ]}
        />

        <View
          style={[
            styles.actions,
            isDesktop ? styles.actionsDesktop : styles.actionsMobile,
          ]}
        >
          <View
            style={[
              styles.botaoWrapper,
              !isDesktop && styles.botaoWrapperMobile,
            ]}
          >
            <Botao
              conteudo="Login"
              onPress={() => navigation.push("Login")}
            />
          </View>

          <View
            style={[
              styles.botaoWrapper,
              !isDesktop && styles.botaoWrapperMobile,
            ]}
          >
            <Botao
              conteudo="Registrar"
              onPress={() => navigation.push("Registrar")}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EEF0F8",
    justifyContent: "center",
    alignItems: "center",
  },

  inner: {
    flex: 1,
    width: "100%",
    maxWidth: 1200,
    alignItems: "center",
    justifyContent: "center",
  },

  innerDesktop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
    width: "100%",
    maxWidth: 1000,
    paddingHorizontal: 40,
  },

  innerMobile: {
    flexDirection: "column",
    paddingHorizontal: 24,
    gap: 30,
  },

  img: {
    aspectRatio: 1,
  },

  imgDesktop: {
    maxWidth: 520,
    maxHeight: 520,
  },

  actions: {
    gap: 16,
    alignItems: "center",
  },

  actionsDesktop: {
    flex: 0.8,
    justifyContent: "center",
    alignItems: "center",
  },

  actionsMobile: {
    width: "100%",
  },

  botaoWrapper: {
    width: "100%",
    maxWidth: 320,
  },

  botaoWrapperMobile: {
    maxWidth: 220,
  },
});