import { Dimensions, Platform, StatusBar } from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements';
import { useCallback } from 'react';

const useCalcBodyHeight = (footerHeight: number) => {
  const windowHeight = Dimensions.get('window').height;
  const headerHeight = useHeaderHeight();
  const statusBar = Platform.OS === 'android' ? StatusBar.currentHeight : 0;
  const calculateHeight = useCallback(() => {
    return windowHeight - footerHeight - headerHeight + (statusBar ?? 0);
  }, [footerHeight, headerHeight, windowHeight, statusBar]);

  return calculateHeight();
};

export default useCalcBodyHeight;
