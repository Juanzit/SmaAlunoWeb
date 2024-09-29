import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ title: 'Login' }} />
      <Stack.Screen name="primeirologinscreen" options={{ title: 'Primeiro Login Screen' }} />
      <Stack.Screen name="cadastroscreen" options={{ title: 'Cadastro' }} />
      <Stack.Screen name="anamnese/index" options={{ title: 'Anamnese' }} />
      <Stack.Screen name="boasvindasscreen" options={{ title: 'Boas Vindas' }} />
      <Stack.Screen name="./recuperarsenha" options={{ title: 'Recuperar Senha' }} />
      <Stack.Screen name="recuperarsenha/recuperarsenhatela1" options={{ title: 'Recuperar Senha1' }}/>
      <Stack.Screen name="recuperarsenha/recuperarsenhatela2" options={{ title: 'Recuperar Senha2' }}/>
      <Stack.Screen name="recuperarsenha/recuperarsenhatela3" options={{ title: 'Recuperar Senha3' }}/>
      <Stack.Screen name="recuperarsenha/recuperarsenhatela4" options={{ title: 'Recuperar Senha4' }}/>
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}
