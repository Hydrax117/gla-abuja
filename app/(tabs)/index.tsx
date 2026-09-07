import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { ImageBackground, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors } from '@/constants/colors';
import { radius, spacing } from '@/constants/spacing';
import { typography } from '@/constants/typography';
import { Text } from '@/components/ui';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface QuickLink {
  key: string;
  label: string;
  icon: React.ComponentProps<typeof Ionicons>['name'];
  route: string;
}

// ---------------------------------------------------------------------------
// Data — swap for API-driven data once endpoints are ready
// ---------------------------------------------------------------------------

const FEATURED_EVENT = {
  title: 'Special September Praise & Worship Night',
  date: 'Sun, Sep 7, 2026',
  // Replace with a real image URI or require() once assets are available
  imageUri: 'https://picsum.photos/seed/gla/800/450',
  eventId: 'featured-sep-2026',
};

const QUICK_LINKS: QuickLink[] = [
 
  { key: 'prayer',   label: 'Prayer',   icon: 'hand-left-outline', route: '/prayer'   },
  { key: 'gallery',  label: 'gallery',  icon: 'headset-outline',   route: '/sermons'  },
  { key: 'events',   label: 'Events',   icon: 'calendar-outline',  route: '/events'   },
  { key: 'kids',     label: 'Kids',     icon: 'happy-outline',     route: '/kids'     },
  { key: 'live',     label: 'Live',     icon: 'radio-outline',     route: '/live'     },
];

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function FeaturedEventCard() {
  return (
    <Pressable
      onPress={() => router.push(`/event/${FEATURED_EVENT.eventId}`)}
      style={({ pressed }) => [styles.heroCard, pressed && { opacity: 0.9 }]}
    >
      <ImageBackground
        source={{ uri: FEATURED_EVENT.imageUri }}
        style={styles.heroImage}
        imageStyle={styles.heroImageStyle}
        resizeMode='cover'
      >
        {/* Dark gradient overlay */}
        <View style={styles.heroOverlay} />

        {/* Play button */}
        <View style={styles.playButtonWrapper}>
          <View style={styles.playButton}>
            <Ionicons name='play' size={22} color={colors.white} />
          </View>
        </View>

        {/* Event info strip at the bottom */}
        <View style={styles.heroInfo}>
          <Text variant='title' color='white' style={styles.heroTitle} numberOfLines={1}>
            {FEATURED_EVENT.title}
          </Text>
          <View style={styles.heroMeta}>
            <Ionicons name='calendar-outline' size={12} color={colors.gold} />
            <Text variant='caption' style={styles.heroDate}>
              {FEATURED_EVENT.date}
            </Text>
          </View>
        </View>
      </ImageBackground>
    </Pressable>
  );
}

interface ActionButtonProps {
  label: string;
  icon: React.ComponentProps<typeof Ionicons>['name'];
  onPress: () => void;
  variant: 'gold' | 'surface';
}

function ActionButton({ label, icon, onPress, variant }: ActionButtonProps) {
  const bg = variant === 'gold' ? colors.gold : colors.surfaceElevated;
  const fg = variant === 'gold' ? colors.background : colors.text;

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.actionBtn,
        { backgroundColor: bg, opacity: pressed ? 0.8 : 1 },
      ]}
    >
      <Ionicons name={icon} size={20} color={fg} style={styles.actionBtnIcon} />
      <Text variant='button' style={[styles.actionBtnLabel, { color: fg }]}>
        {label}
      </Text>
    </Pressable>
  );
}

function QuickLinkTile({ item }: { item: QuickLink }) {
  return (
    <Pressable
      onPress={() => router.push(item.route as never)}
      style={({ pressed }) => [styles.tile, pressed && { opacity: 0.7 }]}
    >
      <View style={styles.tileIcon}>
        <Ionicons name={item.icon} size={26} color={colors.gold} />
      </View>
      <Text variant='caption' color='text' style={styles.tileLabel}>
        {item.label}
      </Text>
    </Pressable>
  );
}

// ---------------------------------------------------------------------------
// Screen
// ---------------------------------------------------------------------------

export default function HomeScreen() {
  // Split into rows: first 3, then remaining
  const row1 = QUICK_LINKS.slice(0, 3);
  const row2 = QUICK_LINKS.slice(3);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Featured event ─────────────────────────── */}
        <FeaturedEventCard />

        {/* ── Primary action buttons ─────────────────── */}
        <View style={styles.actionRow}>
          <ActionButton
            label='GLA Give'
            icon='heart-outline'
            variant='gold'
            onPress={() => router.push('/give' as never)}
          />
          <ActionButton
            label='About GLA'
            icon='information-circle-outline'
            variant='surface'
            onPress={() => router.push('/profile' as never)}
          />
        </View>

        {/* ── Quick-access grid ──────────────────────── */}
        <View style={styles.grid}>
          <View style={styles.gridRow}>
            {row1.map((item) => (
              <QuickLinkTile key={item.key} item={item} />
            ))}
          </View>
          <View style={[styles.gridRow, styles.gridRowCentered]}>
            {row2.map((item) => (
              <QuickLinkTile key={item.key} item={item} />
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------

const TILE_SIZE = 88;

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.xxl,
    gap: spacing.lg,
    paddingTop: spacing.md,
  },

  // ── Hero card ──────────────────────────────────────
  heroCard: {
    borderRadius: radius.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
  },
  heroImage: {
    width: '100%',
    aspectRatio: 16 / 9,
    justifyContent: 'flex-end',
  },
  heroImageStyle: {
    borderRadius: radius.lg,
  },
  heroOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0,0,0,0.45)',
    borderRadius: radius.lg,
  },
  playButtonWrapper: {
    position: 'absolute',
    top: spacing.md,
    right: spacing.md,
  },
  playButton: {
    width: 48,
    height: 48,
    borderRadius: radius.full,
    backgroundColor: colors.gold,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroInfo: {
    padding: spacing.md,
    gap: spacing.xs,
  },
  heroTitle: {
    ...typography.title,
    color: colors.white,
  },
  heroMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  heroDate: {
    color: colors.gold,
  },

  // ── Action buttons ─────────────────────────────────
  actionRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  actionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.md,
    borderRadius: radius.md,
    gap: spacing.xs,
  },
  actionBtnIcon: {
    marginRight: spacing.xs,
  },
  actionBtnLabel: {
    ...typography.button,
  },

  // ── Quick-access grid ──────────────────────────────
  grid: {
    gap: spacing.md,
  },
  gridRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  gridRowCentered: {
    justifyContent: 'center',
  },
  tile: {
    width: TILE_SIZE,
    alignItems: 'center',
    gap: spacing.sm,
  },
  tileIcon: {
    width: TILE_SIZE,
    height: TILE_SIZE,
    borderRadius: radius.lg,
    backgroundColor: colors.surfaceElevated,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tileLabel: {
    textAlign: 'center',
    color: colors.text,
  },
});
