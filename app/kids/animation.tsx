import { router } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';
import { Text } from '@/components/ui';

export default function KidsAnimationScreen() {
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <Pressable onPress={() => router.back()} style={styles.back} hitSlop={12}>
        <Ionicons name='chevron-back' size={24} color={colors.text} />
      </Pressable>
      <View style={styles.center}>
        <Text variant='title' color='gold'>Kids Animation</Text>
        <Text variant='body' color='muted' style={styles.sub}>Coming soon</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  back: { paddingHorizontal: spacing.md, paddingVertical: spacing.sm },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: spacing.sm },
  sub: { marginTop: spacing.xs },
});
