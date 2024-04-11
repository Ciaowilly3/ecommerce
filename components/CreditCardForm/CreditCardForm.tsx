import React, { useCallback, useState } from 'react';
import { ICreditCard } from '../../Interfaces/IUser';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { COLORS, SIZES } from '../../constants';
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { cardSchemaKeys } from './models/schema';
import { checkIfSubmitIsAvailable } from '../../utils/checkIfSubmitIsAvailable';
import { useCreditCardFormValidation } from './useCreditCardFormValidation';
import ExpDateList from '../ExpDateList';
import { formatCardNumber } from './fromatCardNumber';

interface CreditCardFormProps {
  handleSubmit: () => void;
  card: ICreditCard;
  setCard: (value: React.SetStateAction<ICreditCard>) => void;
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  isCreditCardSelected?: boolean;
}

const CreditCardForm = ({
  handleSubmit,
  card,
  setCard,
  isCreditCardSelected,
  setIsModalVisible,
}: CreditCardFormProps) => {
  const [errors, setErrors] = useState<{ [key in cardSchemaKeys]: string }>({
    cardNumber: '',
    expDate: '',
  });
  const [isSubmitDisabled, setIsSubmitDisabled] = useState<boolean>(
    isCreditCardSelected ? false : true
  );
  const [isExpDateModalVisible, setIsExpDateModalVisible] =
    useState<boolean>(false);

  const checkIfSubmitReady = useCallback(
    (updatedErrors: { [key in cardSchemaKeys]: string }) => {
      if (checkIfSubmitIsAvailable(updatedErrors)) setIsSubmitDisabled(false);
      else setIsSubmitDisabled(true);
    },
    []
  );
  const { validate } = useCreditCardFormValidation(
    setErrors,
    checkIfSubmitReady
  );

  const handleChange = useCallback(
    (input: string, field: cardSchemaKeys) => {
      setCard((prevCard) => {
        if (field === 'cardNumber' && input.length > prevCard.cardNumber.length)
          input = formatCardNumber(input);
        const updatedCard = {
          ...prevCard,
          [field]: input,
        };
        validate(field, updatedCard);
        return updatedCard;
      });
    },
    [setCard, validate]
  );

  return (
    <>
      {isExpDateModalVisible && (
        <ExpDateList
          setIsExpDateModalVisible={setIsExpDateModalVisible}
          handleChange={handleChange}
        />
      )}
      <TouchableOpacity
        onPress={() => setIsModalVisible((prev) => !prev)}
        style={styles.closeButtonStyle}
      >
        <FontAwesome5 name="times" size={18} color={COLORS.white} />
      </TouchableOpacity>
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
            onChangeText={(text) => handleChange(text, 'cardNumber')}
            placeholder="Insert your card number..."
            placeholderTextColor={COLORS.primary}
            value={card.cardNumber}
            maxLength={19}
          />
        </View>
        <View style={styles.expirationContainer}>
          <View>
            <Text style={styles.expirationText}>VALID</Text>
            <Text style={styles.expirationText}>THRU</Text>
          </View>
          <TouchableOpacity onPress={() => setIsExpDateModalVisible(true)}>
            <Text style={styles.expirationDate}>
              {card.expDate ? card.expDate : 'MM/YY'}
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.iban}>IT 12 A 12345 12345 123456789012</Text>
        </View>
      </View>
      {errors.cardNumber ? (
        <Text style={styles.errorMessage}>{errors.cardNumber}</Text>
      ) : null}
      {errors.expDate ? (
        <Text style={styles.errorMessage}>{errors.expDate}</Text>
      ) : null}

      <TouchableOpacity
        onPress={handleSubmit}
        style={styles.submitInput}
        disabled={isSubmitDisabled}
      >
        <Text style={styles.submitInputText}>Submit</Text>
      </TouchableOpacity>
    </>
  );
};
//
const styles = StyleSheet.create({
  selectStyle: {
    borderWidth: 0,
    backgroundColor: 'transparent',
    width: 70,
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
  selectTextStyle: {
    color: COLORS.primary,
  },
  errorMessage: {
    color: COLORS.red,
    alignSelf: 'flex-start',
    paddingLeft: SIZES.xSmall,
  },
  mastercardLogo: {
    position: 'absolute',
    right: SIZES.medium,
    bottom: SIZES.medium,
    width: 80,
    height: 50,
    resizeMode: 'contain',
  },
  cardContainer: {
    width: '100%',
    justifyContent: 'space-between',
    height: 260,
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
    gap: SIZES.xSmall,
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
  },
  expirationText: {
    color: COLORS.primary,
    fontSize: SIZES.medium,
  },
  expirationDate: {
    color: COLORS.primary,
    fontSize: SIZES.xLarge,
  },
  iban: {
    color: COLORS.primary,
    fontSize: SIZES.small,
    paddingBottom: SIZES.xSmall,
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

export default CreditCardForm;
