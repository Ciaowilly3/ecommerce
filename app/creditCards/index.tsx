import { Feather, FontAwesome5 } from '@expo/vector-icons';
import React, { useCallback, useLayoutEffect, useState } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import CreditCardForm from '../../components/CreditCardForm';
import CreditCardsList from '../../components/CreditCardsList';
import { ICreditCard, IUser } from '../../Interfaces/IUser';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { COLORS, SIZES } from '../../constants';
import { useMount } from 'ahooks';
import CartTotalBubble from '../../components/CartTotalBubble';
import { useNavigation } from 'expo-router';
import useCalcBodyHeight from '../../Hooks/useCalcBodyHeight';

const CreditCards = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState<IUser>({
    creditCards: [],
    email: '',
    name: '',
  });
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [card, setCard] = useState<ICreditCard>({
    cardNumber: '',
    expDate: '',
  });
  const { setItem, getItem } = useAsyncStorage('loggedUser');

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Payment methods',
    });
  }, [navigation]);

  useMount(async () => {
    const json = await getItem();
    setUser(json ? JSON.parse(json) : { name: '', creditCards: [], email: '' });
  });

  const handleSubmit = useCallback(async () => {
    user.creditCards = [...user.creditCards, card];
    await setItem(JSON.stringify(user));
    setIsModalVisible(false);
  }, [card, setItem, user]);

  return (
    <>
      <Modal visible={isModalVisible} animationType="slide">
        <View style={[styles.modalContainer]}>
          <TouchableOpacity
            onPress={() => setIsModalVisible((prev) => !prev)}
            style={styles.closeButtonStyle}
          >
            <FontAwesome5 name="times" size={18} color={COLORS.white} />
          </TouchableOpacity>
          <CreditCardForm
            card={card}
            handleSubmit={handleSubmit}
            setCard={setCard}
          />
        </View>
      </Modal>
      <View style={styles.mainContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Your Credit cards</Text>
          <TouchableOpacity
            onPress={() => setIsModalVisible((prev) => !prev)}
            style={styles.closeButtonStyle}
          >
            <FontAwesome5 name="plus" size={18} color={COLORS.white} />
          </TouchableOpacity>
        </View>

        <CreditCardsList />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: SIZES.medium,
    fontWeight: 'bold',
    color: COLORS.darkerPrimary,
    marginBottom: SIZES.xSmall,
    alignSelf: 'flex-end',
  },
  modalContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: SIZES.xSmall,
  },
  closeButtonStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
    margin: SIZES.small,
    width: 36,
    height: 36,
    backgroundColor: COLORS.darkerPrimary,
    borderRadius: 18,
    shadowColor: COLORS.primary,
    shadowOpacity: 0.8,
    shadowOffset: { width: 3, height: 1 },
  },
});

export default CreditCards;
