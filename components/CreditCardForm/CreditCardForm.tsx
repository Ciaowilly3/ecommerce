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
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { cardSchemaKeys } from './models/schema';
import { checkIfSubmitIsAvailable } from '../../utils/checkIfSubmitIsAvailable';
import { useCreditCardFormValidation } from './useCreditCardFormValidation';

interface CreditCardFormProps {
  handleSubmit: () => void;
  card: ICreditCard;
  setCard: (value: React.SetStateAction<ICreditCard>) => void;
}

const CreditCardForm = ({
  handleSubmit,
  card,
  setCard,
}: CreditCardFormProps) => {
  const [errors, setErrors] = useState<{ [key in cardSchemaKeys]: string }>({
    cardNumber: '',
    expDate: '',
  });
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

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
  console.log('experiment', 1);

  return (
    <>
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
            value={card.cardNumber}
            maxLength={16}
          />
        </View>
        <View style={styles.expirationContainer}>
          <View>
            <Text style={styles.expirationText}>VALID</Text>
            <Text style={styles.expirationText}>THRU</Text>
          </View>
          <TextInput
            keyboardType="numbers-and-punctuation"
            onChangeText={(text) => handleChange(text, 'expDate')}
            placeholder="Insert date"
            value={card.expDate}
            style={styles.expirationDate}
            maxLength={5}
          ></TextInput>
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

const styles = StyleSheet.create({
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
