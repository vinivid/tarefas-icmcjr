import AppNavigator from "@/src/navigation/AppNavigator";

import { useFonts } from '@expo-google-fonts/roboto-mono/useFonts';
import { RobotoMono_300Light } from '@expo-google-fonts/roboto-mono/300Light';
import { RobotoMono_400Regular } from '@expo-google-fonts/roboto-mono/400Regular';
import { RobotoMono_500Medium } from '@expo-google-fonts/roboto-mono/500Medium';
import { RobotoMono_600SemiBold } from '@expo-google-fonts/roboto-mono/600SemiBold';
import { RobotoMono_700Bold } from '@expo-google-fonts/roboto-mono/700Bold';

export default function App() {

  let [fontsLoaded] = useFonts({
    RobotoMono_300Light, 
    RobotoMono_400Regular, 
    RobotoMono_500Medium, 
    RobotoMono_600SemiBold, 
    RobotoMono_700Bold, 
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <AppNavigator />
  );
}