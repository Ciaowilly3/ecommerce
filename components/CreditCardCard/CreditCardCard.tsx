import { AntDesign, Feather } from '@expo/vector-icons';
import React, { useCallback, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS, SIZES } from '../../constants';
import { hideCardNumbers } from '../../utils/hideCardNumbers';
import { ICreditCard, IUser } from '../../Interfaces/IUser';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';
import { IUserState, removeCreditCard } from '../../Slices/userSlice';
import { useDispatch } from 'react-redux';

type CreditCardCardProps = {
  cardNumber: string;
  expDate: string;
};

const CreditCardCard = ({ cardNumber, expDate }: CreditCardCardProps) => {
  const { setItem } = useAsyncStorage('loggedUser');
  const { user } = useSelector((state: { user: IUserState }) => state.user);
  const dispatch = useDispatch();
  const [showNumbers, setShowNumbers] = useState<boolean>(false);

  const handleEyePress = useCallback(() => {
    setShowNumbers((prev) => !prev);
  }, [setShowNumbers]);

  const handleDelete = useCallback(
    async (cardNumber: string) => {
      dispatch(removeCreditCard(cardNumber));
      await setItem(JSON.stringify(user));
    },
    [dispatch, setItem, user]
  );

  return (
    <View style={styles.mainContainer}>
      <View style={styles.cardContainer}>
        <View style={styles.iconContainer}>
          <AntDesign
            name="creditcard"
            color={COLORS.darkerPrimary}
            size={SIZES.xLarge}
          />
          <TouchableOpacity onPress={() => handleEyePress()}>
            <AntDesign
              name={showNumbers ? 'eye' : 'eyeo'}
              color={COLORS.darkerPrimary}
              size={SIZES.xLarge}
            />
          </TouchableOpacity>
          <Text>{showNumbers ? cardNumber : hideCardNumbers(cardNumber)}</Text>
        </View>
        <Text>{expDate}</Text>
      </View>
      <TouchableOpacity
        style={styles.deleteBtn}
        onPress={() => handleDelete(cardNumber)}
      >
        <Feather
          name="trash-2"
          size={SIZES.xLarge}
          color={COLORS.darkerPrimary}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    gap: SIZES.xSmall,
  },
  cardContainer: {
    padding: SIZES.xSmall,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: COLORS.primary,
    borderWidth: 1,
    borderRadius: SIZES.small,
    backgroundColor: COLORS.secondary,
    flex: 1,
    shadowColor: COLORS.darkerPrimary,
    shadowOpacity: 0.7,
    shadowOffset: { width: 2, height: 4 },
  },
  iconContainer: {
    flexDirection: 'row',
    gap: SIZES.small,
    alignItems: 'center',
  },
  deleteBtn: {
    padding: SIZES.xSmall,
    backgroundColor: COLORS.red,
    borderRadius: SIZES.xSmall,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.darkerPrimary,
    shadowOpacity: 0.7,
    shadowOffset: { width: -2, height: 4 },
  },
});

export default CreditCardCard;
