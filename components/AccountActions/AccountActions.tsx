import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { COLORS, SIZES } from '../../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface IAccountActionsProps {
  handleVisibility: (action?: 'signin' | 'login' | 'logout') => void;
}
const AccountActions = ({ handleVisibility }: IAccountActionsProps) => {
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('loggedUser');
    } catch (e) {
      return;
    }
    handleVisibility('logout');
  };
  return (
    <>
      <TouchableOpacity
        onPress={() => handleVisibility('login')}
        style={[styles.loginBtn, styles.btn]}
      >
        <Text>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handleVisibility('signin')}
        style={[styles.signinBtn, styles.btn]}
      >
        <Text style={styles.signinTxt}>SignIn</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handleLogout}
        style={[styles.logoutBtn, styles.btn]}
      >
        <Text style={styles.logoutTxt}>Logout</Text>
      </TouchableOpacity>
    </>
  );
};
const styles = StyleSheet.create({
  btn: {
    flexBasis: '22%',
    shadowColor: COLORS.darkerPrimary,
    shadowOffset: { width: 2, height: 3 },
    shadowOpacity: 0.8,
    paddingHorizontal: SIZES.xSmall,
    paddingVertical: SIZES.xxSmall,
    borderRadius: SIZES.xxxSmall,
    alignItems: 'center',
  },
  loginBtn: {
    backgroundColor: COLORS.secondary,
    borderColor: COLORS.darkerPrimary,
  },
  signinBtn: {
    backgroundColor: COLORS.darkerPrimary,
    borderColor: COLORS.secondary,
  },
  signinTxt: {
    color: COLORS.white,
  },
  logoutBtn: {
    backgroundColor: COLORS.red,
    borderColor: COLORS.darkerPrimary,
  },
  logoutTxt: {
    color: COLORS.white,
  },
});
export default AccountActions;
