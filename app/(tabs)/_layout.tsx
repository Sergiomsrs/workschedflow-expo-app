import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import HeaderLayout from '@/components/ui/layoutComponents/HeaderLayout';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useAuthStore } from '@/src/auth/store/useAuthStore';
import { Ionicons } from '@expo/vector-icons';


export default function TabLayout() {
  const colorScheme = useColorScheme();

  const { status, user } = useAuthStore();



  return (
    <>
      <HeaderLayout />
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
          headerShown: false,
          tabBarButton: HapticTab,
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color }) => <Ionicons size={28} name="home-outline" color={color} />,
          }}
        />
        <Tabs.Screen
          name="roster"
          options={{
            title: 'Roster',
            href: status === 'authenticated' ? '/roster' : null,
            tabBarIcon: ({ color }) => <Ionicons size={28} name="list-outline" color={color} />,
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: status == 'authenticated' ? user?.name : 'Login',
            tabBarIcon: ({ color }) => status == 'authenticated' ? <Ionicons size={28} name="person-circle-outline" color={color} /> : <Ionicons size={28} name="log-in" color={color} />,
          }}
        />
      </Tabs>
    </>
  );
}
