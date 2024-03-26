import { AntDesign } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS, SIZES } from '../../constants';
import { hideCardNumbers } from '../../utils/hideCardNumbers';

type CreditCardCardProps = {
  cardNumber: string;
  expDate: string;
};

const CreditCardCard = ({ cardNumber, expDate }: CreditCardCardProps) => {
  return (
    <>
      <View style={styles.cardContainer}>
        <View style={styles.iconContainer}>
          <AntDesign
            name="creditcard"
            color={COLORS.darkerPrimary}
            size={SIZES.medium}
          />
          <Text>{hideCardNumbers(cardNumber)}</Text>
        </View>
        <Text>{expDate}</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    flexDirection: 'row',
    gap: SIZES.small,
  },
  cardContainer: {
    padding: SIZES.xSmall,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: COLORS.primary,
    borderWidth: 1,
    borderRadius: SIZES.small,
    backgroundColor: COLORS.secondary,
  },
});

export default CreditCardCard;
