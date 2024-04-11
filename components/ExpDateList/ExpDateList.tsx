import React, { useCallback, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { months, years } from './monthAndYears';
import { COLORS, SIZES } from '../../constants';
import { cardSchemaKeys } from '../CreditCardForm/models/schema';
import { expDateValidation } from './expDateValidation';

interface ExpDateListProps {
  setIsExpDateModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  handleChange: (input: string, field: cardSchemaKeys) => void;
}

const ExpDateList = ({
  setIsExpDateModalVisible,
  handleChange,
}: ExpDateListProps) => {
  const [expDate, setExpDate] = useState<{ year: string; month: string }>({
    year: '',
    month: '',
  });
  const [error, setError] = useState<boolean>(false);
  const handleSelect = useCallback(
    (selectedItem: string, field: 'month' | 'year') => {
      if (!expDateValidation(selectedItem, field, expDate)) {
        setError(true);
      } else setError(false);
      setExpDate((prev) => {
        const newExpDate = { ...prev, [field]: selectedItem };
        if (newExpDate.month && newExpDate.year)
          handleChange(`${newExpDate.month}/${newExpDate.year}`, 'expDate');
        return newExpDate;
      });
    },
    [expDate, handleChange]
  );
  return (
    <>
      <TouchableOpacity
        disabled={error}
        style={styles.blurBackground}
        onPress={() => setIsExpDateModalVisible(false)}
      ></TouchableOpacity>
      <View style={styles.modal}>
        <View style={styles.flatListContainer}>
          <FlatList
            ListHeaderComponent={() => (
              <Text style={styles.headerText}>Month</Text>
            )}
            stickyHeaderIndices={[0]}
            data={months}
            renderItem={({ item }: { item: string }) => (
              <TouchableOpacity
                key={item}
                onPress={() => handleSelect(item, 'month')}
                style={styles.itemContainer}
              >
                <Text style={styles.itemText}>{item}</Text>
              </TouchableOpacity>
            )}
          />
          <FlatList
            ListHeaderComponent={() => (
              <Text style={styles.headerText}>Year</Text>
            )}
            stickyHeaderIndices={[0]}
            data={years}
            renderItem={({ item }: { item: string }) => (
              <TouchableOpacity
                key={item}
                onPress={() => handleSelect(item, 'year')}
                style={styles.itemContainer}
              >
                <Text style={styles.itemText}>{item}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
        <View style={styles.submitContainer}>
          {error && (
            <Text style={styles.errorText}>This card is already expired</Text>
          )}
          <TouchableOpacity
            disabled={error}
            onPress={() => setIsExpDateModalVisible(false)}
            style={styles.submitInput}
          >
            <Text style={styles.submitInputText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

//TODO: cercare di mettere gli spazi ogni 4 numeri

const styles = StyleSheet.create({
  blurBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000000A6',
    zIndex: 6,
  },
  modal: {
    ...StyleSheet.absoluteFillObject,
    top: '60%',
    zIndex: 10,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: SIZES.medium,
    borderTopRightRadius: SIZES.medium,
    paddingHorizontal: SIZES.xSmall,
    paddingTop: SIZES.small,
  },
  itemContainer: {
    paddingVertical: SIZES.xSmall,
    borderRadius: SIZES.xSmall,
    borderWidth: 1,
    backgroundColor: COLORS.secondary,
    alignItems: 'center',
    marginVertical: SIZES.xSmall,
    shadowColor: COLORS.darkerPrimary,
    shadowOpacity: 1,
    shadowOffset: { width: 0, height: 0 },
  },
  itemText: {
    color: COLORS.darkerPrimary,
    fontSize: SIZES.medium,
  },
  headerText: {
    color: COLORS.secondary,
    fontSize: SIZES.large,
    textAlign: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.xSmall,
    borderWidth: 1,
  },
  flatListContainer: {
    height: '80%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: SIZES.large,
  },
  errorText: {
    color: COLORS.red,
    fontSize: SIZES.medium,
    fontWeight: 'bold',
  },
  submitContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  submitInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
    margin: SIZES.small,
    backgroundColor: COLORS.yellow,
    borderRadius: SIZES.xxSmall,
    padding: SIZES.small,
  },
  submitInputText: {
    fontSize: SIZES.medium,
    color: COLORS.white,
  },
});

export default ExpDateList;
