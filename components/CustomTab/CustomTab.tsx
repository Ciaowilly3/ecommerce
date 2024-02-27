import { Tabs } from 'expo-router';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { COLORS } from '../../constants';

type CustomTabProps = {
  label: string;
  icon: any;
  isFocused: boolean;
  onPress: () => void;
};

const CustomTab = ({ label, icon, isFocused, onPress }: CustomTabProps) => (
  <TouchableOpacity
    style={{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: isFocused ? COLORS.primary : 'transparent',
      borderRadius: 10,
    }}
    onPress={onPress}
  >
    <FontAwesome name={icon} color={isFocused ? 'white' : 'black'} size={24} />
    <Text style={{ color: isFocused ? 'white' : 'black' }}>{label}</Text>
  </TouchableOpacity>
);
