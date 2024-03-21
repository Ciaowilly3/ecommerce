import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LogSignInFormModal from '../../../components/LogSignInFormModal';
import { IUser } from '../../../Interfaces/IUser';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { COLORS, SIZES } from '../../../constants';
import AccountActions from '../../../components/AccountActions';
import AccountDetails from '../../../components/AccountDetails';

const UserPage = () => {
  const [isLoginForm, setIsLoginForm] = useState<boolean>(true);
  const [user, setUser] = useState<IUser>({ name: '', email: '' });
  const { getItem } = useAsyncStorage('loggedUser');

  const getCurrentlyLoggedUser = useCallback(async () => {
    const jsonUser = await getItem();
    if (!jsonUser) {
      setUser({ name: '', email: '' });
      return;
    }
    setUser(JSON.parse(jsonUser));
  }, [getItem]);
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

  return (
    <View style={styles.mainContainer}>
      <View style={styles.btnContainer}>
        <AccountActions user={user} handleVisibility={handleVisibility} />
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
        <>
          <AccountDetails user={user} />
        </>
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
