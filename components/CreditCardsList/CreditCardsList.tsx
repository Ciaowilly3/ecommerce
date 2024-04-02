import React, { useCallback } from 'react';
import { ICreditCard, IUser } from '../../Interfaces/IUser';
import { FlatList, Text } from 'react-native';
import { SIZES } from '../../constants';
import CreditCardCard from '../CreditCardCard';

interface CreditCardsListProps {
  user: IUser;
}

const CreditCardsList = ({ user }: CreditCardsListProps) => {
  const renderCard = useCallback(({ item }: { item: ICreditCard }) => {
    return (
      <CreditCardCard
        cardNumber={item.cardNumber}
        expDate={item.expDate}
        key={item.cardNumber}
      />
    );
  }, []);

  if (!user || user.creditCards.length === 0)
    return <Text>Add a creditCard</Text>;
  return (
    <FlatList
      data={user.creditCards}
      renderItem={renderCard}
      contentContainerStyle={{
        rowGap: SIZES.small,
        paddingBottom: 320,
      }}
      scrollEnabled
    />
  );
};

export default CreditCardsList;
