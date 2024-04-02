import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { useMount } from 'ahooks';
import React from 'react';
import { useDispatch } from 'react-redux';
import { saveUser } from '../../Slices/userSlice';

const RetrieveLoggedUser = () => {
  const dispatch = useDispatch();
  const { getItem } = useAsyncStorage('loggedUser');
  useMount(async () => {
    const json = await getItem();
    if (!json) return;
    dispatch(saveUser(JSON.parse(json)));
  });
  return <></>;
};

export default RetrieveLoggedUser;
