import { Link, Stack } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';
import { typography } from '@/constants/typography';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Not Found' }} />
      <View style={styles.container}>
        <Text style={[typography.heading, styles.title]}>This screen does not exist.</Text>
        <Link href='/' style={styles.link}>
          <Text style={[typography.body, styles.linkText]}>Go to home screen</Text>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
    backgroundColor: colors.background,
  },
  title: {
    color: colors.text,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  link: {
    marginTop: spacing.sm,
  },
  linkText: {
    color: colors.gold,
  },
});
