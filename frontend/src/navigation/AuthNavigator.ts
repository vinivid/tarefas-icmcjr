import { StaticParamList } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';

import Init from '@/src/screens/auth/Init';
import Login from '@/src/screens/auth/Login';
import Registrar from '@/src/screens/auth/Registrar';

export const AuthNavigator = createNativeStackNavigator({
  screens: {
    Init: {
      screen: Init,
      options: {
        headerShown: false
      }
    },
    Login: Login,
    Registrar: Registrar
  }
})

type StackParamList = StaticParamList<typeof AuthNavigator>;
export type AuthScreenNavigationProp = NativeStackNavigationProp<StackParamList>;