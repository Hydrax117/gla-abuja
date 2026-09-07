import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Image, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors } from '@/constants/colors';
import { radius, spacing } from '@/constants/spacing';
import { typography } from '@/constants/typography';
import { Text } from '@/components/ui';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface KidsSection {
  key: string;
  title: string;
  /** Pastel card background — local to this screen, not in global tokens */
  cardColor: string;
  imageUri: string | number;   // string = remote URI, number = local require()
  route: string;
}

// ---------------------------------------------------------------------------
// Data
// Illustrations: swap imageUri for local require() assets once provided.
// Placeholder images sized to roughly match a portrait 3D character.
// ---------------------------------------------------------------------------

const SECTIONS: KidsSection[] = [
  {
    key: 'devotional',
    title: 'Kids\nDevotional',
    cardColor: '#FFF3E4',           // warm cream
    imageUri: require('../../assets/images/girl praying.png'),
    route: '/kids/devotional',
  },
  {
    key: 'animation',
    title: 'Kids\nAnimation',
    cardColor: '#DFF3FF',           // sky blue
    imageUri: require('../../assets/images/kids with backpack.png'),
    route: '/kids/animation',
  },
  {
    key: 'games',
    title: 'Kids\nGames',
    cardColor: '#FFE4F0',           // soft pink
    imageUri: require('../../assets/images/abc.png'),
    route: '/kids/games',
  },
];

// ---------------------------------------------------------------------------
// Sub-component
// ---------------------------------------------------------------------------

function SectionCard({ section }: { section: KidsSection }) {
  return (
    <Pressable
      onPress={() => router.push(section.route as never)}
      style={({ pressed }) => [
        styles.card,
        { backgroundColor: section.cardColor },
        pressed && styles.cardPressed,
      ]}
      accessibilityRole='button'
      accessibilityLabel={section.title.replace('\n', ' ')}
    >
      {/* Left: title + arrow */}
      <View style={styles.cardLeft}>
        <Text variant='heading' style={styles.cardTitle}>
          {section.title}
        </Text>
        <View style={styles.arrowRow}>
          <Ionicons name='arrow-forward' size={20} color={colors.gold} />
        </View>
      </View>

      {/* Right: illustration bleeds out of card */}
      <View style={styles.cardIllustrationWrapper} pointerEvents='none'>
        <Image
          source={typeof section.imageUri === 'string'
            ? { uri: section.imageUri }
            : section.imageUri}
          style={styles.cardIllustration}
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
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      {/* ── Back button ─────────────────────────────── */}
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
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Page heading ──────────────────────────── */}
        <Text variant='heading' style={styles.pageTitle}>
          GLA Kids
        </Text>

        {/* ── Section cards ─────────────────────────── */}
        {SECTIONS.map((section) => (
          <SectionCard key={section.key} section={section} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------

const CARD_HEIGHT = 180;
const ILLUSTRATION_SIZE = 200; // oversized so it bleeds out of the card

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },

  // ── Back button ───────────────────────────────────
  backBtn: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
    paddingBottom: spacing.xs,
    alignSelf: 'flex-start',
  },

  // ── Scroll ────────────────────────────────────────
  scroll: {
    flex: 1,
  },
  content: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.xxl,
    gap: spacing.md,
  },

  // ── Page title ────────────────────────────────────
  pageTitle: {
    ...typography.heading,
    color: colors.gold,
    marginBottom: spacing.xs,
  },

  // ── Card ──────────────────────────────────────────
  card: {
    height: CARD_HEIGHT,
    borderRadius: radius.lg,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'visible',      // let illustration bleed upward
    paddingLeft: spacing.lg,
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
    ...typography.heading,
    fontSize: 26,
    fontWeight: '700',
    color: '#1A1A2E',          // near-black for legibility on pastels
    lineHeight: 32,
  },
  arrowRow: {
    marginTop: spacing.sm,
  },

  // Illustration container — overflow lets it bleed above card top
  cardIllustrationWrapper: {
    position: 'absolute',
    right: -spacing.sm,
    bottom: 0,
    top: -spacing.xl,         // bleeds upward
    width: ILLUSTRATION_SIZE,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  cardIllustration: {
    width: ILLUSTRATION_SIZE,
    height: ILLUSTRATION_SIZE + spacing.xl,
  },
});
