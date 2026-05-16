import { Stack } from 'expo-router';
import { Text } from 'react-native';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Não encontrado' }} />
      <Text> 
        Aba inexistente. Você colocou a rota correta?
      </Text>
    </>
  );
}