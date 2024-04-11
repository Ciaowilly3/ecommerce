import { FontAwesome5 } from '@expo/vector-icons';
import React, { useCallback, useLayoutEffect, useState } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import CreditCardForm from '../../components/CreditCardForm';
import CreditCardsList from '../../components/CreditCardsList';
import { ICreditCard } from '../../Interfaces/IUser';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { COLORS, SIZES } from '../../constants';
import { useNavigation } from 'expo-router';
import { useSelector } from 'react-redux';
import { IUserState, addCreditCard } from '../../Slices/userSlice';
import { useDispatch } from 'react-redux';

const CreditCards = () => {
  const navigation = useNavigation();
  const { user } = useSelector((state: { user: IUserState }) => state.user);
  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [card, setCard] = useState<ICreditCard>({
    cardNumber: '',
    expDate: '',
  });
  const { setItem } = useAsyncStorage('loggedUser');

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Payment methods',
    });
  }, [navigation]);

  const handleSubmit = useCallback(async () => {
    dispatch(addCreditCard(card));
    await setItem(JSON.stringify(user));
    setIsModalVisible(false);
    setCard({ expDate: '', cardNumber: '' });
  }, [card, dispatch, setItem, user]);

  return (
    <>
      <Modal visible={isModalVisible} animationType="slide">
        <View style={[styles.modalContainer]}>
          <CreditCardForm
            setIsModalVisible={setIsModalVisible}
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
            style={styles.addButtonStyle}
          >
            <FontAwesome5 name="plus" size={18} color={COLORS.white} />
          </TouchableOpacity>
        </View>

        <CreditCardsList user={user} />
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
  addButtonStyle: {
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
