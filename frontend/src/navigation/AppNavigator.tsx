import { Text } from 'react-native';
import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AuthProvider, useAuth } from '@/src/context/AuthContext';

import { AuthNavigator } from './AuthNavigator';
import { HomeNavigator } from './HomeNavigator';

function userIsSignedIn() {
  const { authToken } = useAuth();
  return authToken !== null;
}

function userIsNotSignedIn() {
  return !userIsSignedIn();
}

const RootStack = createNativeStackNavigator({
  screenOptions: {
    headerShown: false
  },
  screens: {
    Auth: {
      if: userIsNotSignedIn,
      screen: AuthNavigator
    },
    Home: {
      if: userIsSignedIn,
      screen: HomeNavigator
    }
  }
})

const Navigation = createStaticNavigation(RootStack);

export default function AppNavigator() {

  return (
    <AuthProvider>
        <Navigation />
    </AuthProvider>
  );
}