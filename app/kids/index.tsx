import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Image, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors } from '@/constants/colors';
import { radius, spacing } from '@/constants/spacing';
import { typography } from '@/constants/typography';
import { Text } from '@/components/ui';
import { useLayout } from '@/utils/responsive';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface KidsSection {
  key: string;
  title: string;
  cardColor: string;
  imageUri: string | number;
  route: string;
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const SECTIONS: KidsSection[] = [
  {
    key: 'devotional',
    title: 'Kids\nDevotional',
    cardColor: '#FFF3E4',
    imageUri: require('../../assets/images/girl praying.png'),
    route: '/kids/devotional',
  },
  {
    key: 'animation',
    title: 'Kids\nAnimation',
    cardColor: '#DFF3FF',
    imageUri: require('../../assets/images/kids with backpack.png'),
    route: '/kids/animation',
  },
  {
    key: 'games',
    title: 'Kids\nGames',
    cardColor: '#FFE4F0',
    imageUri: require('../../assets/images/abc.png'),
    route: '/kids/games',
  },
];

// ---------------------------------------------------------------------------
// Sub-component
// ---------------------------------------------------------------------------

function SectionCard({
  section,
  cardHeight,
  illustrationSize,
  hPad,
}: {
  section: KidsSection;
  cardHeight: number;
  illustrationSize: number;
  hPad: number;
}) {
  // Title font scales proportionally to card height
  const titleSize = Math.round(cardHeight * 0.155);
  const titleLineHeight = Math.round(titleSize * 1.25);

  return (
    <Pressable
      onPress={() => router.push(section.route as never)}
      style={({ pressed }) => [
        styles.card,
        {
          height: cardHeight,
          backgroundColor: section.cardColor,
          paddingLeft: hPad,
        },
        pressed && styles.cardPressed,
      ]}
      accessibilityRole='button'
      accessibilityLabel={section.title.replace('\n', ' ')}
    >
      {/* Left: title + arrow */}
      <View style={styles.cardLeft}>
        <Text
          variant='heading'
          style={[
            styles.cardTitle,
            { fontSize: titleSize, lineHeight: titleLineHeight },
          ]}
        >
          {section.title}
        </Text>
        <View style={styles.arrowRow}>
          <Ionicons name='arrow-forward' size={20} color={colors.gold} />
        </View>
      </View>

      {/* Right: illustration — bleeds upward out of card */}
      <View
        style={[
          styles.illustrationWrapper,
          {
            width: illustrationSize,
            top: -(cardHeight * 0.25),   // proportional bleed
          },
        ]}
        pointerEvents='none'
      >
        <Image
          source={
            typeof section.imageUri === 'string'
              ? { uri: section.imageUri }
              : section.imageUri
          }
          style={{
            width: illustrationSize,
            height: illustrationSize + Math.round(cardHeight * 0.25),
          }}
          resizeMode='contain'
        />
      </View>
    </Pressable>
  );
}

// ---------------------------------------------------------------------------
// Screen
// ---------------------------------------------------------------------------

export default function KidsScreen() {
  const { cardHeight, illustrationSize, horizontalPadding } = useLayout();

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      {/* Back button */}
      <Pressable
        onPress={() => router.back()}
        style={({ pressed }) => [styles.backBtn, pressed && { opacity: 0.6 }]}
        accessibilityRole='button'
        accessibilityLabel='Go back'
        hitSlop={12}
      >
        <Ionicons name='chevron-back' size={24} color={colors.text} />
      </Pressable>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[
          styles.content,
          { paddingHorizontal: horizontalPadding },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <Text variant='heading' style={styles.pageTitle}>
          GLA Kids
        </Text>

        {SECTIONS.map((section) => (
          <SectionCard
            key={section.key}
            section={section}
            cardHeight={cardHeight}
            illustrationSize={illustrationSize}
            hPad={horizontalPadding}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

// ---------------------------------------------------------------------------
// Styles — no layout-sensitive hardcoded values
// ---------------------------------------------------------------------------

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  backBtn: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
    paddingBottom: spacing.xs,
    alignSelf: 'flex-start',
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingBottom: spacing.xxl,
    gap: spacing.md,
  },
  pageTitle: {
    ...typography.heading,
    color: colors.gold,
    marginBottom: spacing.xs,
  },

  // ── Card ──────────────────────────────────────────
  card: {
    borderRadius: radius.lg,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'visible',
    paddingVertical: spacing.lg,
  },
  cardPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },
  cardLeft: {
    flex: 1,
    justifyContent: 'space-between',
    height: '100%',
    paddingBottom: spacing.xs,
  },
  cardTitle: {
    fontWeight: '700',
    color: '#1A1A2E',
  },
  arrowRow: {
    marginTop: spacing.sm,
  },

  // Illustration — positioned absolutely, bleeds above card
  illustrationWrapper: {
    position: 'absolute',
    right: -spacing.sm,
    bottom: 0,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
});
