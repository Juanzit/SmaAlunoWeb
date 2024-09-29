import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ title: 'router' }} />
      <Stack.Screen name="dashboard" options={{ title: 'dashboard' }} />
    </Stack>
  );
}
