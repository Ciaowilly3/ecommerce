import { Stack } from 'expo-router';
import React from 'react';
import MainHeader from '../components/MainHeader/MainHeader';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import Toast from 'react-native-toast-message';
import RetrieveLoggedUser from '../components/RetrieveLoggedUser/RetrieveLoggedUser';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const RootLayout = () => {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <RetrieveLoggedUser />
        <Stack>
          <Stack.Screen
            name="(tabs)"
            options={{
              title: 'home',
              headerTitle: 'home',
              headerShown: true,
              header: () => <MainHeader />,
            }}
          />
        </Stack>
        <Toast />
      </SafeAreaProvider>
    </Provider>
  );
};

export default RootLayout;
