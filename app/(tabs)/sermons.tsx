import { StyleSheet, Text, View } from 'react-native';

import { COLORS } from '@/constants/colors';
import { SPACING } from '@/constants/spacing';
import { TYPOGRAPHY } from '@/constants/typography';

export default function SermonsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.placeholder}>Sermons — coming soon</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.lg,
    backgroundColor: COLORS.background,
  },
  placeholder: {
    ...TYPOGRAPHY.body,
    color: COLORS.text.muted,
  },
});
