import { Stack } from 'expo-router';
import React from 'react';
import MainHeader from '../components/MainHeader/MainHeader';

const RootLayout = () => {
  return (
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
  );
};

export default RootLayout;
