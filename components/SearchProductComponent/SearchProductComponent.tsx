import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { setSearchedText } from '../../Slices/SearchedTextSlice';
import { COLORS, SIZES } from '../../constants';

type SearchProductComponentProps = {
  // searchedName: string;
  // setSearchedName: React.Dispatch<React.SetStateAction<string>>;
  onBlurFn: (text: string) => void;
};

const SearchProductComponent = ({
  // searchedName,
  // setSearchedName,
  onBlurFn,
}: SearchProductComponentProps) => {
  const [searchedName, setSearchedName] = useState<string>('');
  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.textInput}
        value={searchedName}
        onChangeText={setSearchedName}
        onBlur={() => onBlurFn(searchedName)}
        placeholder="search product..."
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

export default SearchProductComponent;
