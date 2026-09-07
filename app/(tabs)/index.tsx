import { StyleSheet, View } from 'react-native';

import { spacing } from '@/constants/spacing';
import { Badge, Button, Divider, Heading, Screen, Text, Title } from '@/components/ui';

export default function HomeScreen() {
  return (
    <Screen scroll>
      <View style={styles.hero}>
        <Badge variant='gold'>Live Every Sunday</Badge>
        <Heading style={styles.heroHeading}>Guiding Light{'\n'}Assembly</Heading>
        <Text variant='body' color='muted' style={styles.heroSub}>
          Abuja, Nigeria
        </Text>
      </View>

      <Divider spacing='lg' />

      <View style={styles.section}>
        <Title>Upcoming Events</Title>
        <Text variant='caption' color='muted' style={styles.sectionSub}>
          Events will appear here
        </Text>
      </View>

      <Divider spacing='lg' />

      <View style={styles.section}>
        <Title>Recent Sermons</Title>
        <Text variant='caption' color='muted' style={styles.sectionSub}>
          Sermons will appear here
        </Text>
      </View>

      <Divider spacing='lg' />

      <Button fullWidth>Watch Live</Button>
      <View style={styles.gap} />
      <Button variant='secondary' fullWidth>Browse Events</Button>
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: {
    paddingTop: spacing.xl,
    paddingBottom: spacing.lg,
    gap: spacing.sm,
  },
  heroHeading: {
    marginTop: spacing.xs,
  },
  heroSub: {
    marginTop: spacing.xs,
  },
  section: {
    gap: spacing.xs,
    marginBottom: spacing.md,
  },
  sectionSub: {
    marginTop: spacing.xs,
  },
  gap: {
    height: spacing.sm,
  },
});
