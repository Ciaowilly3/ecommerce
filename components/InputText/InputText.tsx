import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { COLORS, SIZES } from '../../constants';

type InputTextProps = {
  onBlurFn: (text: string) => void;
  placeholder: string;
  isPassword?: boolean;
  errorMessage?: string;
};

const InputText = ({
  onBlurFn,
  placeholder,
  isPassword,
  errorMessage,
}: InputTextProps) => {
  const [searchedName, setSearchedName] = useState<string>('');

  return (
    <>
      <TextInput
        placeholderTextColor={COLORS.primary}
        style={styles.textInput}
        value={searchedName}
        onChangeText={setSearchedName}
        onBlur={() => onBlurFn(searchedName)}
        placeholder={placeholder}
        secureTextEntry={isPassword}
      />
      {errorMessage ? (
        <Text style={styles.errorMessage}>{errorMessage}</Text>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  errorMessage: {
    color: COLORS.red,
  },
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
});

export default InputText;
