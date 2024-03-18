import { useLocalSearchParams } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import LogSignInFormModal from '../../../components/LogSignInFormModal';
import { IUser } from '../../../Interfaces/IUser';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserPage = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [user, setUser] = useState<IUser>({ name: '', password: '' });
  const handleVisibility = useCallback(() => {
    setIsModalVisible((prev) => !prev);
  }, [isModalVisible]);

  const getCurrentlyLoggedUser = useCallback(async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('loggedUser');
      jsonValue != null ? setUser(JSON.parse(jsonValue)) : null;
    } catch (e) {
      setError(true);
    }
  }, [user]);
  useEffect(() => {
    getCurrentlyLoggedUser();
  }, [user]);

  if (error) return <Text>Uuups we had an error!</Text>;
  return (
    <View>
      <TouchableOpacity onPress={handleVisibility}>
        <Text> Show Form</Text>
      </TouchableOpacity>
      <LogSignInFormModal
        handleVisibility={handleVisibility}
        isModalVisible={isModalVisible}
      />
      <Text>{user.name}</Text>
    </View>
  );
};

export default UserPage;
