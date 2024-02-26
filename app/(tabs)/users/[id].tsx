import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const UserPage = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  return (
    <SafeAreaView>
      <Text>user : {id} </Text>
    </SafeAreaView>
  );
};

export default UserPage;
