import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LogSignInFormModal from '../../../components/LogSignInFormModal';
import { IUser } from '../../../Interfaces/IUser';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS, SIZES } from '../../../constants';
import AccountActions from '../../../components/AccountActions';

const UserPage = () => {
  const [error, setError] = useState<boolean>(false);
  const [isLoginForm, setIsLoginForm] = useState<boolean>(true);
  const [user, setUser] = useState<IUser>({ name: '', password: '' });

  const getCurrentlyLoggedUser = useCallback(async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('loggedUser');
      jsonValue != null ? setUser(JSON.parse(jsonValue)) : null;
    } catch (e) {
      setError(true);
    }
  }, []);
  const handleVisibility = useCallback(
    (action?: 'signin' | 'login' | 'logout') => {
      if (action === 'logout') {
        getCurrentlyLoggedUser();
        return;
      }
      action === 'signin' ? setIsLoginForm(false) : setIsLoginForm(true);
      setIsModalVisible((prev) => !prev);
      getCurrentlyLoggedUser();
    },
    [getCurrentlyLoggedUser]
  );
  useEffect(() => {
    getCurrentlyLoggedUser();
  }, [getCurrentlyLoggedUser]);

  const [isModalVisible, setIsModalVisible] = useState<boolean>(
    user ? false : true
  );

  if (error) return <Text>Uuups we had an error!</Text>;

  return (
    <View style={styles.mainContainer}>
      <View style={styles.btnContainer}>
        <AccountActions handleVisibility={handleVisibility} />
      </View>
      <LogSignInFormModal
        handleVisibility={handleVisibility}
        isModalVisible={isModalVisible}
        setIsLoginForm={setIsLoginForm}
        isLoginForm={isLoginForm}
      />
      {!user.name ? (
        <Text style={styles.noAccountText}>
          You are not logged, login o create an account using buttons above
        </Text>
      ) : (
        <Text>{user.name}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    paddingHorizontal: SIZES.xSmall,
  },
  btnContainer: {
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SIZES.medium,
    paddingHorizontal: SIZES.xSmall,
    marginHorizontal: -10,
    shadowColor: COLORS.darkerPrimary,
    shadowOpacity: 1,
    borderBottomColor: COLORS.secondary,
    borderBottomWidth: 1,
  },
  noAccountText: {
    textAlign: 'center',
    fontSize: SIZES.medium,
    fontWeight: 'bold',
  },
});

export default UserPage;
