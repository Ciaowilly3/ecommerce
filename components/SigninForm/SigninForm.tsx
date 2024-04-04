import React, { useCallback, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { COLORS, SIZES } from '../../constants';
import InputText from '../InputText';
import { IUserComplete } from '../../Interfaces/IUser';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { FontAwesome5 } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { saveUser } from '../../Slices/userSlice';
import { UserSchema, userSchemaKeys } from './schema';
import { checkIfSubmitIsAvailable } from '../../utils/checkIfSubmitIsAvailable';
import { useUserFormValidation } from '../../Hooks/useUserFormValidation';

type Props = {
  handleVisibility: () => void;
};

const SigninForm = ({ handleVisibility }: Props) => {
  const [user, setUser] = useState<IUserComplete>({
    name: '',
    email: '',
    creditCards: [],
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<{ [key in userSchemaKeys]: string }>({
    email: '',
    name: '',
    password: '',
    confirmPassword: '',
  });
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const dispatch = useDispatch();
  const { setItem } = useAsyncStorage('loggedUser');

  const checkIfSubmitReady = useCallback(
    (updatedErrors: { [key in userSchemaKeys]: string }) => {
      if (checkIfSubmitIsAvailable(updatedErrors)) setIsSubmitDisabled(false);
      else setIsSubmitDisabled(true);
    },
    []
  );
  const { validate } = useUserFormValidation(
    setErrors,
    checkIfSubmitReady,
    UserSchema
  );

  const handleBlur = useCallback(
    (input: string, field: userSchemaKeys) => {
      setUser((prevUser) => {
        const updatedUser = {
          ...prevUser,
          [field]: input,
        };
        validate(field, updatedUser);
        return updatedUser;
      });
    },
    [validate]
  );
  const handleSubmit = useCallback(async () => {
    setItem(JSON.stringify(user));
    dispatch(saveUser(user));
    handleVisibility();
  }, [handleVisibility, user, setItem, dispatch]);

  return (
    <>
      <TouchableOpacity
        onPress={handleVisibility}
        style={styles.closeButtonStyle}
      >
        <FontAwesome5 name="times" size={18} color={COLORS.white} />
      </TouchableOpacity>
      <InputText
        onBlurFn={(input) => handleBlur(input, 'name')}
        placeholder="name"
        errorMessage={errors.name}
      />

      <InputText
        onBlurFn={(input) => handleBlur(input, 'email')}
        placeholder="email"
        errorMessage={errors.email}
      />

      <InputText
        onBlurFn={(input) => handleBlur(input, 'password')}
        placeholder="password"
        isPassword={true}
        errorMessage={errors.password}
      />

      <InputText
        onBlurFn={(input) => handleBlur(input, 'confirmPassword')}
        placeholder="confirm-password"
        isPassword={true}
        errorMessage={errors.confirmPassword}
      />
      <TouchableOpacity
        onPress={handleSubmit}
        style={styles.submitInput}
        disabled={isSubmitDisabled}
      >
        <Text style={styles.submitInputText}>Submit</Text>
      </TouchableOpacity>
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
  submitInput: {
    width: 200,
    marginTop: SIZES.xSmall,
    alignItems: 'center',
    alignSelf: 'flex-end',
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
    position: 'absolute',
    top: SIZES.medium,
    right: SIZES.xSmall,
    flexDirection: 'row',
    alignSelf: 'flex-end',
    alignItems: 'center',
    justifyContent: 'center',
    width: 36,
    height: 36,
    backgroundColor: COLORS.primary,
    borderRadius: 18,
    shadowColor: COLORS.primary,
    shadowOpacity: 0.8,
    shadowOffset: { width: 3, height: 1 },
  },
});
export default SigninForm;
