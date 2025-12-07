import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { GameColors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: GameColors.accent,
        tabBarInactiveTintColor: GameColors.text.secondary,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: {
          backgroundColor: GameColors.surface,
          borderTopColor: GameColors.cell.border,
        }
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="levels"
        options={{
          title: 'Levels',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="grid.circle.fill" color={color} />, // SF Symbol name approximation
        }}
      />
    </Tabs>
  );
}
