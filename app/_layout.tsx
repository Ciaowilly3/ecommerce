import { Stack } from 'expo-router';
import React from 'react';
import MainHeader from '../components/MainHeader/MainHeader';
import { Provider } from 'react-redux';
import { store } from '../store/store';

const RootLayout = () => {
  return (
    <Provider store={store}>
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
    </Provider>
  );
};

export default RootLayout;
