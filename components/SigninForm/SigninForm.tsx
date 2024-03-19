import React, { useCallback, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS, SIZES } from '../../constants';
import InputText from '../InputText';
import { IUserComplete } from '../../Interfaces/IUser';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome5 } from '@expo/vector-icons';

type Props = {
  handleVisibility: () => void;
};

const SigninForm = ({ handleVisibility }: Props) => {
  const [user, setUser] = useState<IUserComplete>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState<boolean>(false);

  const handleBlur = useCallback(
    (
      input: string,
      field: 'name' | 'email' | 'password' | 'confirmPassword'
    ) => {
      setUser((prevUser) => ({
        ...prevUser,
        [field]: input,
      }));
    },
    [user]
  );
  const handleSubmit = useCallback(async () => {
    try {
      await AsyncStorage.setItem('loggedUser', JSON.stringify(user));
      handleVisibility();
    } catch (e) {
      setError(true);
    }
  }, [user]);

  if (error) return <Text>Uuups we had an error</Text>;
  return (
    <>
      <InputText
        onBlurFn={(input) => handleBlur(input, 'name')}
        placeholder="Name"
      />
      <InputText
        onBlurFn={(input) => handleBlur(input, 'email')}
        placeholder="email"
      />
      <InputText
        onBlurFn={(input) => handleBlur(input, 'password')}
        placeholder="password"
        isPassword={true}
      />
      <InputText
        onBlurFn={(input) => handleBlur(input, 'confirmPassword')}
        placeholder="confirm-password"
        isPassword={true}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={handleSubmit}
          style={styles.submitInput}
          disabled={
            !(user.name && user.password && user.email && user.confirmPassword)
          }
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
export default SigninForm;