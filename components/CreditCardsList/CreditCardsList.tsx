import React, { useCallback, useState } from 'react';
import { ICreditCard, IUser } from '../../Interfaces/IUser';
import { FlatList, Text } from 'react-native';
import { SIZES } from '../../constants';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { useAsyncEffect } from 'ahooks';
import CreditCardCard from '../CreditCardCard';
import _ from 'lodash';

const CreditCardsList = () => {
  const { getItem } = useAsyncStorage('loggedUser');
  const [user, setUser] = useState<IUser>();
  useAsyncEffect(async () => {
    const json = getItem();
    json.then((value) => (value ? setUser(JSON.parse(value)) : ''));
  }, [getItem]);
  const renderCard = useCallback(({ item }: { item: ICreditCard }) => {
    return (
      <CreditCardCard
        cardNumber={item.cardNumber}
        expDate={item.expDate}
        key={_.uniqueId()}
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
