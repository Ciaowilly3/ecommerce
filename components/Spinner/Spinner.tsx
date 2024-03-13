import React from 'react';
import { ActivityIndicator, Dimensions, StyleSheet, View } from 'react-native';
import { COLORS, SIZES } from '../../constants';
import LottieView from 'lottie-react-native';
import { useHeaderHeight } from '@react-navigation/elements';

const Spinner = () => {
  const windowHeight = Dimensions.get('window').height;
  const headerHeight = useHeaderHeight();
  return (
    <View
      style={[styles.spinnerContainer, { height: windowHeight - headerHeight }]}
    >
      <LottieView
        style={{
          height: 200,
          width: 200,
          alignSelf: 'center',
          marginVertical: 'auto',
        }}
        autoPlay
        loop
        source={require('../../assets/loader.json')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  spinnerContainer: {
    paddingBottom: 200,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
});
export default Spinner;
