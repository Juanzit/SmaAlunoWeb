import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons, Feather, AntDesign, Octicons } from '@expo/vector-icons';

export default function Layout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color, size }) => <Ionicons name="home-outline" size={size} color={color} />,
          title: 'Home',
        }}
      />
      <Tabs.Screen
        name="ficha"
        options={{
          tabBarIcon: ({ color, size }) => <Feather name="clipboard" size={size} color={color} />,
          title: 'Ficha',
        }}
      />
      <Tabs.Screen
        name="perfil"
        options={{
          tabBarIcon: ({ color, size }) => <AntDesign name="user" size={size} color={color} />,
          title: 'Perfil',
        }}
      />
      <Tabs.Screen
        name="versoes"
        options={{
          tabBarIcon: ({ color, size }) => <Octicons name="versions" size={size} color={color} />,
          title: 'Versões',
        }}
      />
    </Tabs>
  );
}