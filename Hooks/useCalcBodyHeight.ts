import { Dimensions } from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements';
import { useCallback } from 'react';

const useCalcBodyHeight = (footerHeight: number) => {
  const windowHeight = Dimensions.get('window').height;
  const headerHeight = useHeaderHeight();

  const calculateHeight = useCallback(() => {
    return windowHeight - footerHeight - headerHeight;
  }, [footerHeight, headerHeight, windowHeight]);

  return calculateHeight();
};

export default useCalcBodyHeight;
