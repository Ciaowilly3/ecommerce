import React, { useCallback, useEffect, useState } from 'react';
import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { COLORS, SIZES } from '../../constants';
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { deleteCart } from '../../Slices/cartSlice';
import { useDispatch } from 'react-redux';
import * as LocalAuthentication from 'expo-local-authentication';

interface CardDetailsModalProps {
  isModalVisible: boolean;
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setShowAnimation: React.Dispatch<React.SetStateAction<boolean>>;
}

const CardDetailsModal = ({
  isModalVisible,
  setIsModalVisible,
  setShowAnimation,
}: CardDetailsModalProps) => {
  const [cardNumber, setCardNumber] = useState('');
  const [hasFaceID, setHasFaceID] = useState<boolean>(true);
  const dispatch = useDispatch();
  const handleSubmit = useCallback(async () => {
    if (!hasFaceID) return;
    const isEnrolled = await LocalAuthentication.isEnrolledAsync();
    if (!isEnrolled) throw new Error('no faceID available');

    const { success } = await LocalAuthentication.authenticateAsync({
      requireConfirmation: true,
    });
    if (!success) {
      return;
    } else {
      setIsModalVisible(false);
      dispatch(deleteCart());
      setShowAnimation(true);
      setTimeout(() => {
        setShowAnimation(false);
        router.navigate('/');
      }, 4000);
    }
  }, [dispatch, setIsModalVisible, setShowAnimation, hasFaceID]);

  useEffect(() => {
    (async () => {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      setHasFaceID(compatible);
    })();
  });

  return (
    <Modal visible={isModalVisible} animationType="slide">
      <View style={styles.modalContainer}>
        <View>
          <TouchableOpacity
            onPress={() => setIsModalVisible((prev) => !prev)}
            style={styles.closeButtonStyle}
          >
            <FontAwesome5 name="times" size={18} color={COLORS.white} />
          </TouchableOpacity>
        </View>
        <View style={styles.cardContainer}>
          <Image
            source={{
              uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Mastercard_2019_logo.svg/1200px-Mastercard_2019_logo.svg.png',
            }}
            style={styles.mastercardLogo}
          />
          <View style={styles.titleContainer}>
            <View>
              <Text style={styles.cardTitle}>postepay</Text>
              <Text style={styles.cardSubTitle}>Evolution</Text>
            </View>
            <View style={styles.postamatContainer}>
              <Image
                source={{
                  uri: 'https://upload.wikimedia.org/wikipedia/it/c/c0/Logo_Postamat.png',
                }}
                style={styles.postamatImg}
              />
            </View>
          </View>
          <View style={styles.cardBrandContainer}>
            <MaterialCommunityIcons
              name="integrated-circuit-chip"
              size={SIZES.xxLarge}
              color={COLORS.yellow}
            />
            <MaterialCommunityIcons
              name="contactless-payment"
              size={SIZES.xxLarge}
              color={COLORS.yellow}
            />
            <Text style={styles.cardBrandTitle}>Posteitaliane</Text>
          </View>
          <View>
            <TextInput
              style={styles.textInput}
              keyboardType="numeric"
              onChangeText={(text) => setCardNumber(text)}
              placeholder="Insert your card number..."
              value={cardNumber}
              maxLength={16}
            />
          </View>
          <View style={styles.expirationContainer}>
            <View>
              <Text style={styles.expirationText}>VALID</Text>
              <Text style={styles.expirationText}>THRU</Text>
            </View>
            <Text style={styles.expirationDate}>04/27</Text>
          </View>
          <View>
            <Text style={styles.iban}>IT 12 A 12345 12345 123456789012</Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={handleSubmit}
          style={styles.purchaseButtonStyle}
          disabled={cardNumber.length !== 16}
        >
          <Text style={styles.purchaseButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  mastercardLogo: {
    position: 'absolute',
    right: SIZES.medium,
    bottom: SIZES.medium,
    width: 80,
    height: 50,
    resizeMode: 'contain',
  },
  modalContainer: {
    justifyContent: 'center',
    paddingBottom: 120,
    paddingHorizontal: 1,
    flex: 1,
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
  purchaseButtonStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
    margin: SIZES.small,
    backgroundColor: COLORS.yellow,
    borderRadius: SIZES.xxSmall,
    padding: SIZES.small,
  },
  purchaseButtonText: {
    fontSize: SIZES.medium,
    color: COLORS.white,
  },
  cardContainer: {
    width: '100%',
    justifyContent: 'space-between',
    height: 250,
    paddingHorizontal: SIZES.medium,
    borderRadius: SIZES.medium,
    backgroundColor: COLORS.darkerPrimary,
    borderLeftColor: COLORS.yellow,
    borderLeftWidth: SIZES.xSmall,
    gap: SIZES.small,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardTitle: {
    fontStyle: 'italic',
    fontSize: SIZES.xxLarge,
    color: COLORS.yellow,
  },
  cardSubTitle: {
    fontSize: SIZES.medium,
    color: COLORS.yellow,
    marginLeft: 60,
  },
  postamatContainer: {
    height: SIZES.xLarge,
    backgroundColor: COLORS.yellow,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: SIZES.xSmall,
    width: 80,
  },

  postamatImg: {
    width: '100%',
    resizeMode: 'cover',
    height: '100%',
  },
  cardBrandContainer: {
    width: '100%',
    flexDirection: 'row',
    gap: SIZES.small,
    alignItems: 'center',
  },
  cardBrandTitle: {
    fontSize: SIZES.xxLarge,
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  textInput: {
    width: '100%',
    alignSelf: 'center',
    backgroundColor: COLORS.darkerPrimary,
    color: COLORS.white,
    fontSize: SIZES.xLarge,
  },

  expirationContainer: {
    flexDirection: 'row',
    gap: SIZES.small,
    alignSelf: 'center',
  },
  expirationText: {
    color: COLORS.primary,
    fontSize: SIZES.small,
  },
  expirationDate: {
    color: COLORS.primary,
    fontSize: SIZES.large,
  },
  iban: {
    color: COLORS.primary,
    fontSize: SIZES.small,
    paddingBottom: SIZES.xSmall,
  },
});

export default CardDetailsModal;
