import React, { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { COLORS, SIZES } from '../../constants';

type InputTextProps = {
  onBlurFn: (text: string) => void;
  placeholder: string;
  isPassword?: boolean;
};

const InputText = ({ onBlurFn, placeholder, isPassword }: InputTextProps) => {
  const [searchedName, setSearchedName] = useState<string>('');
  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.textInput}
        value={searchedName}
        onChangeText={setSearchedName}
        onBlur={() => onBlurFn(searchedName)}
        placeholder={placeholder}
        secureTextEntry={isPassword}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {},
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
