import { StaticParamList } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';

import Init from '@/src/screens/auth/Init';
import Login from '@/src/screens/auth/Login';
import Registrar from '@/src/screens/auth/Registrar';
import EsqueciSenha from '@/src/screens/auth/EsqueciSenha';
import RedefinirSenha from '@/src/screens/auth/RedefinirSenha';
import { Colors } from '@/src/constants/theme';

export const AuthNavigator = createNativeStackNavigator({
  screenOptions: {
    headerTitleAlign: "center",
    headerStyle: {
      backgroundColor: Colors.light.primary
    },
    headerTitleStyle: {
      color: "white",
      fontFamily: "RobotoMono_700Bold"
    },
    headerTintColor: "white"
  }, 
  screens: {
    Init: {
      screen: Init,
      options: {
        headerShown: false
      }
    },
    Login: Login,
    Registrar: Registrar,
    EsqueciSenha: {
      screen: EsqueciSenha,
      options: {
        title: "Esqueci minha senha"
      }
    },
    RedefinirSenha: {
      screen: RedefinirSenha,
      options: {
        title: "Redefinir senha"
      }
    }
  }
})

type StackParamList = StaticParamList<typeof AuthNavigator>;
export type AuthScreenNavigationProp = NativeStackNavigationProp<StackParamList>;