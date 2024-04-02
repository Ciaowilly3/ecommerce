import React, { useCallback, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LogSignInFormModal from '../../../components/LogSignInFormModal';
import { COLORS, SIZES } from '../../../constants';
import AccountActions from '../../../components/AccountActions';
import AccountDetails from '../../../components/AccountDetails';
import { useSelector } from 'react-redux';
import { IUserState } from '../../../Slices/userSlice';

const UserPage = () => {
  const [isLoginForm, setIsLoginForm] = useState<boolean>(true);
  const { user } = useSelector((state: { user: IUserState }) => state.user);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const handleVisibility = useCallback(
    (action?: 'signin' | 'login' | 'logout') => {
      action === 'signin' ? setIsLoginForm(false) : setIsLoginForm(true);
      setIsModalVisible((prev) => !prev);
    },
    []
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
    paddingTop: SIZES.xSmall,
    textAlign: 'center',
    fontSize: SIZES.medium,
    fontWeight: 'bold',
  },
});

export default UserPage;
