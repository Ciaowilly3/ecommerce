import React, { useCallback, useEffect, useState } from 'react';
import { Modal, StyleSheet, View } from 'react-native';
import { COLORS, SIZES } from '../../constants';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { deleteCart } from '../../Slices/cartSlice';
import { useDispatch } from 'react-redux';
import * as LocalAuthentication from 'expo-local-authentication';
import { ICreditCard, IUser } from '../../Interfaces/IUser';
import SelectDropdown from 'react-native-select-dropdown';
import CreditCardForm from '../CreditCardForm';
import { hideCardNumbers } from '../../utils/hideCardNumbers';

interface CardDetailsModalProps {
  isModalVisible: boolean;
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setShowAnimation: React.Dispatch<React.SetStateAction<boolean>>;
  user: IUser;
}

const CardDetailsModal = ({
  isModalVisible,
  setIsModalVisible,
  setShowAnimation,
  user,
}: CardDetailsModalProps) => {
  const [creditCard, setCreditCard] = useState<ICreditCard>({
    cardNumber: '',
    expDate: '',
  });
  const [hasFaceID, setHasFaceID] = useState<boolean>(true);
  const [isCreditCardSelected, setIsCreditCardSelected] =
    useState<boolean>(true);
  const dispatch = useDispatch();

  const handleSubmit = useCallback(async () => {
    let noWayToAuth = false;
    setCreditCard({ cardNumber: '', expDate: '' });
    if (!hasFaceID) return;
    const isEnrolled = await LocalAuthentication.isEnrolledAsync();
    if (!isEnrolled) noWayToAuth = true;

    const { success } = await LocalAuthentication.authenticateAsync({
      requireConfirmation: true,
    });
    if (success || noWayToAuth) {
      setIsModalVisible(false);
      dispatch(deleteCart());
      setShowAnimation(true);
      setTimeout(() => {
        setShowAnimation(false);
        router.navigate('/');
      }, 4000);
    }
  }, [dispatch, setIsModalVisible, setShowAnimation, hasFaceID]);

  const handleCardSelection = useCallback((selectedItem: ICreditCard) => {
    setCreditCard(selectedItem);
    setIsCreditCardSelected(true);
  }, []);

  useEffect(() => {
    (async () => {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      setHasFaceID(compatible);
    })();
  });

  return (
    <Modal visible={isModalVisible} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.topBtnsContainer}>
          {user.creditCards.length !== 0 && (
            <SelectDropdown
              data={user.creditCards}
              onSelect={(selectedItem) => handleCardSelection(selectedItem)}
              renderDropdownIcon={() => (
                <Feather name="chevron-down" size={SIZES.medium} />
              )}
              buttonTextAfterSelection={(selectedItem: ICreditCard) =>
                hideCardNumbers(selectedItem.cardNumber).slice(10) +
                ' ' +
                selectedItem.expDate
              }
              rowTextForSelection={(selectedItem: ICreditCard) =>
                hideCardNumbers(selectedItem.cardNumber).slice(10) +
                ' ' +
                selectedItem.expDate
              }
              buttonTextStyle={styles.selectText}
              buttonStyle={styles.select}
              defaultButtonText="Select a credit card"
            />
          )}
        </View>
        <CreditCardForm
          setIsModalVisible={setIsModalVisible}
          card={creditCard}
          handleSubmit={handleSubmit}
          setCard={setCreditCard}
          isCreditCardSelected={isCreditCardSelected}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: 'center',
    paddingBottom: 120,
    paddingHorizontal: 1,
    flex: 1,
  },
  topBtnsContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectText: {
    fontSize: SIZES.medium,
  },
  select: {
    backgroundColor: COLORS.secondary,
    borderRadius: SIZES.small,
    paddingLeft: SIZES.xSmall,
    marginBottom: -56,
  },
});

export default CardDetailsModal;
