import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
});

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar style='light' />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name='(tabs)' />
        <Stack.Screen name='event/[id]' options={{ headerShown: true, title: 'Event Details' }} />
        <Stack.Screen name='sermon/[id]' options={{ headerShown: true, title: 'Sermon' }} />
        <Stack.Screen
          name='register/[eventId]'
          options={{ headerShown: true, title: 'Register for Event' }}
        />
        {/* Kids section */}
        <Stack.Screen name='kids/index' />
        <Stack.Screen name='kids/devotional' />
        <Stack.Screen name='kids/animation' />
        <Stack.Screen name='kids/games' />
        <Stack.Screen name='+not-found' />
      </Stack>
    </QueryClientProvider>
  );
}
