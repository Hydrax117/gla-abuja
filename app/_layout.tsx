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
      <StatusBar style='auto' />
      <Stack>
        <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
        <Stack.Screen name='event/[id]' options={{ title: 'Event Details' }} />
        <Stack.Screen name='sermon/[id]' options={{ title: 'Sermon' }} />
        <Stack.Screen name='register/[eventId]' options={{ title: 'Register for Event' }} />
        <Stack.Screen name='+not-found' />
      </Stack>
    </QueryClientProvider>
  );
}
