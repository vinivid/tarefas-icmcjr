import { StaticParamList } from '@react-navigation/native';
import { createBottomTabNavigator, BottomTabNavigationProp } from "@react-navigation/bottom-tabs";

import Perfil from "@/src/screens/home/Perfil";
import Tarefas from "@/src/screens/home/Tarefas";
import { Colors } from '@/src/constants/theme';

export const HomeNavigator = createBottomTabNavigator({
  screenOptions: {
    headerStyle: {
      backgroundColor: Colors.light.primary
    },
    headerTitle: "",
  },
  screens: {
    Tarefas: Tarefas,
    Perfil: Perfil 
  }
})

type TabParamList = StaticParamList<typeof HomeNavigator>;
export type HomeScreenNavigationProp = BottomTabNavigationProp<TabParamList>;