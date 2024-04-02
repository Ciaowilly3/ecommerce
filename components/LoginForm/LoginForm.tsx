import React, { useCallback, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS, SIZES } from '../../constants';
import InputText from '../InputText';
import { IUser } from '../../Interfaces/IUser';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { FontAwesome5 } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { saveUser } from '../../Slices/userSlice';

type Props = {
  handleVisibility: () => void;
};

const LoginForm = ({ handleVisibility }: Props) => {
  const [user, setUser] = useState<IUser>({
    name: '',
    email: '',
    creditCards: [],
  });
  const dispatch = useDispatch();
  const { setItem } = useAsyncStorage('loggeduser');

  const handleBlur = useCallback((input: string, field: 'name' | 'email') => {
    setUser((prevUser) => ({
      ...prevUser,
      [field]: input,
    }));
  }, []);
  const handleSubmit = useCallback(async () => {
    await setItem(JSON.stringify(user));
    dispatch(saveUser(user));
    handleVisibility();
  }, [setItem, user, dispatch, handleVisibility]);

  return (
    <>
      <InputText
        onBlurFn={(input) => handleBlur(input, 'name')}
        placeholder={'name'}
      />
      <InputText
        onBlurFn={(input) => handleBlur(input, 'email')}
        placeholder={'email'}
      />
      <InputText
        onBlurFn={() => null}
        placeholder={'password'}
        isPassword={true}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={handleSubmit}
          style={styles.submitInput}
          disabled={!(user.name && user.email)}
        >
          <Text style={styles.submitInputText}>Submit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleVisibility}
          style={styles.closeButtonStyle}
        >
          <FontAwesome5 name="times" size={18} color={COLORS.white} />
        </TouchableOpacity>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  textInput: {
    shadowColor: COLORS.primary,
    shadowOpacity: 1,
    height: 40,
    borderRadius: 8,
    backgroundColor: COLORS.secondary,
    shadowOffset: { width: 3, height: 3 },
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.secondary,
    borderRightColor: COLORS.secondary,
    marginVertical: SIZES.small,
    padding: SIZES.small,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  submitInput: {
    width: 200,
    marginTop: SIZES.xSmall,
    alignItems: 'center',
    shadowColor: COLORS.darkerPrimary,
    shadowOpacity: 0.6,
    shadowOffset: { width: 3, height: 3 },
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.darkerPrimary,
    borderRightColor: COLORS.darkerPrimary,
    backgroundColor: COLORS.darkerPrimary,
    paddingHorizontal: SIZES.small,
    paddingVertical: SIZES.xSmall,
    borderRadius: SIZES.xxSmall,
  },
  submitInputText: {
    color: COLORS.white,
  },
  closeButtonStyle: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    alignItems: 'center',
    justifyContent: 'center',
    width: 36,
    height: 36,
    backgroundColor: COLORS.red,
    borderRadius: 18,
    shadowColor: COLORS.primary,
    shadowOpacity: 0.8,
    shadowOffset: { width: 3, height: 1 },
  },
});
export default LoginForm;
