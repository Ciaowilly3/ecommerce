import { Tabs, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { AntDesign } from '@expo/vector-icons';
import { COLORS, SIZES } from '../../constants';
import { Octicons } from '@expo/vector-icons';
import { SCREENS } from '../../enums/Screens';

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShadowVisible: false,
        headerShown: false,
        tabBarActiveTintColor: COLORS.darkerPrimary,
        tabBarInactiveTintColor: COLORS.primary,
        tabBarStyle: {
          borderTopLeftRadius: 50,
          borderTopRightRadius: 50,
          paddingTop: SIZES.xSmall,
        },
      }}
    >
      <Tabs.Screen
        name={SCREENS.INDEX}
        options={{
          headerShown: false,
          tabBarActiveTintColor: COLORS.darkerPrimary,
          tabBarIconStyle: {
            color: COLORS.primary,
          },
          title: 'Home',
          tabBarIcon: ({ focused }) => (
            <Octicons
              name="home"
              color={focused ? COLORS.darkerPrimary : COLORS.primary}
              size={24}
            />
          ),
        }}
      />
      <Tabs.Screen
        name={SCREENS.DISCOVER}
        options={{
          headerShown: false,
          tabBarActiveTintColor: COLORS.darkerPrimary,
          tabBarIconStyle: {
            color: COLORS.primary,
          },
          title: 'Discover',
          tabBarIcon: ({ focused }) => (
            <AntDesign
              color={focused ? COLORS.darkerPrimary : COLORS.primary}
              name="appstore-o"
              size={24}
            />
          ),
        }}
      />
      <Tabs.Screen
        name={SCREENS.WISHLIST}
        options={{
          headerShown: false,
          tabBarActiveTintColor: COLORS.darkerPrimary,
          tabBarIconStyle: {
            color: COLORS.tertiary,
          },
          title: 'Wishlist',
          tabBarIcon: ({ focused }) => (
            <AntDesign
              color={focused ? COLORS.darkerPrimary : COLORS.primary}
              name="hearto"
              size={24}
            />
          ),
        }}
      />
      <Tabs.Screen
        name={SCREENS.USERS + '/[id]'}
        options={{
          headerShown: false,
          tabBarActiveTintColor: COLORS.darkerPrimary,
          tabBarIconStyle: {
            color: COLORS.primary,
          },
          title: 'Account',
          tabBarIcon: ({ focused }) => (
            <AntDesign
              color={focused ? COLORS.darkerPrimary : COLORS.primary}
              name="user"
              size={24}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
