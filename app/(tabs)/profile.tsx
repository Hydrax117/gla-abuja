import { Ionicons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { router } from 'expo-router';
import {
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  Share,
  StyleSheet,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors } from '@/constants/colors';
import { radius, spacing } from '@/constants/spacing';
import { typography } from '@/constants/typography';
import { Divider, Text } from '@/components/ui';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface MenuItem {
  key: string;
  label: string;
  icon: React.ComponentProps<typeof Ionicons>['name'];
  onPress: () => void;
  destructive?: boolean;
}

// ---------------------------------------------------------------------------
// Placeholder user — replace with useCurrentUser() hook once auth is wired
// ---------------------------------------------------------------------------

const MOCK_USER = {
  name: 'Guest User',
  church: 'GLA Abuja',
  avatarUri: null as string | null,
  // Replace with: avatarUri: user.avatarUrl
  coverUri: 'https://picsum.photos/seed/gla-profile/800/400',
};

const APP_VERSION = Constants.expoConfig?.version ?? '1.0.0';

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function ProfileHeader() {
  return (
    <View style={styles.headerContainer}>
      <ImageBackground
        source={{ uri: MOCK_USER.coverUri }}
        style={styles.cover}
        resizeMode='cover'
      >
        {/* Gradient-style overlay — two-stop illusion using opacity layers */}
        <View style={styles.coverOverlayTop} />
        <View style={styles.coverOverlayBottom} />

        {/* "Profile" title */}
        <Text variant='heading' style={styles.screenTitle}>
          Profile
        </Text>

        {/* Avatar + name block — sits over the lower overlay */}
        <View style={styles.headerContent}>
          <View style={styles.avatarRing}>
            {MOCK_USER.avatarUri ? (
              <Image source={{ uri: MOCK_USER.avatarUri }} style={styles.avatar} />
            ) : (
              <View style={styles.avatarFallback}>
                <Ionicons name='person' size={36} color={colors.muted} />
              </View>
            )}
          </View>

          <Text variant='title' style={styles.userName}>
            {MOCK_USER.name}
          </Text>
          <Text variant='caption' style={styles.userChurch}>
            Member: {MOCK_USER.church.toUpperCase()}
          </Text>
        </View>
      </ImageBackground>
    </View>
  );
}

function MenuRow({ item, isLast }: { item: MenuItem; isLast: boolean }) {
  return (
    <>
      <Pressable
        onPress={item.onPress}
        style={({ pressed }) => [styles.menuRow, pressed && styles.menuRowPressed]}
        accessibilityRole='button'
        accessibilityLabel={item.label}
      >
        <View style={styles.menuLeft}>
          <Ionicons
            name={item.icon}
            size={22}
            color={item.destructive ? colors.error : colors.gold}
            style={styles.menuIcon}
          />
          <Text
            variant='body'
            style={[
              styles.menuLabel,
              item.destructive && { color: colors.error },
            ]}
          >
            {item.label}
          </Text>
        </View>
        <Ionicons name='chevron-forward' size={18} color={colors.muted} />
      </Pressable>
      {!isLast && <Divider spacing='xs' />}
    </>
  );
}

// ---------------------------------------------------------------------------
// Screen
// ---------------------------------------------------------------------------

export default function ProfileScreen() {
  const menuItems: MenuItem[] = [
    {
      key: 'edit',
      label: 'Edit Profile Details',
      icon: 'person-outline',
      onPress: () => router.push('/profile/edit' as never),
    },
    {
      key: 'settings',
      label: 'Settings',
      icon: 'settings-outline',
      onPress: () => router.push('/profile/settings' as never),
    },
    {
      key: 'notifications',
      label: 'Notifications',
      icon: 'notifications-outline',
      onPress: () => router.push('/profile/notifications' as never),
    },
    {
      key: 'support',
      label: 'Contact Support',
      icon: 'headset-outline',
      onPress: () => router.push('/profile/support' as never),
    },
    {
      key: 'prayer',
      label: 'Prayer Request',
      icon: 'hand-left-outline',
      onPress: () => router.push('/profile/prayer' as never),
    },
    {
      key: 'share',
      label: 'Share App',
      icon: 'share-social-outline',
      onPress: () =>
        Share.share({
          message: 'Join GLA Abuja on our app! Download it here: https://glaabuja.org/app',
        }),
    },
    {
      key: 'logout',
      label: 'Sign Out',
      icon: 'log-out-outline',
      onPress: () => {
        // TODO: call useLogout mutation
      },
      destructive: true,
    },
  ];

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Hero header ───────────────────────────── */}
        <ProfileHeader />

        {/* ── Menu list ─────────────────────────────── */}
        <View style={styles.menuCard}>
          {menuItems.map((item, index) => (
            <MenuRow
              key={item.key}
              item={item}
              isLast={index === menuItems.length - 1}
            />
          ))}
        </View>

        {/* ── Version footer ────────────────────────── */}
        <Text variant='caption' color='muted' style={styles.version}>
          Version: {APP_VERSION}
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------

const AVATAR_SIZE = 80;
const COVER_HEIGHT = 280;

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingBottom: spacing.xxl,
    gap: spacing.lg,
  },

  // ── Header ────────────────────────────────────────
  headerContainer: {
    height: COVER_HEIGHT,
  },
  cover: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  coverOverlayTop: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0,0,0,0.25)',
    // Fades from transparent at top to darker at bottom — simulated with a
    // second layer below
  },
  coverOverlayBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '60%',
    backgroundColor: 'rgba(11,11,11,0.75)',
  },
  screenTitle: {
    position: 'absolute',
    top: spacing.md,
    left: spacing.md,
    color: colors.white,
    ...typography.heading,
  },
  headerContent: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.lg,
    gap: spacing.xs,
  },
  avatarRing: {
    width: AVATAR_SIZE + 6,
    height: AVATAR_SIZE + 6,
    borderRadius: (AVATAR_SIZE + 6) / 2,
    borderWidth: 3,
    borderColor: colors.white,
    overflow: 'hidden',
    marginBottom: spacing.sm,
  },
  avatar: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
  },
  avatarFallback: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
    backgroundColor: colors.surfaceElevated,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userName: {
    color: colors.white,
    ...typography.title,
    fontWeight: '700',
  },
  userChurch: {
    color: colors.text,
    letterSpacing: 0.5,
  },

  // ── Menu ──────────────────────────────────────────
  menuCard: {
    marginHorizontal: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.md,
  },
  menuRowPressed: {
    opacity: 0.6,
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuIcon: {
    marginRight: spacing.md,
    width: 24,
  },
  menuLabel: {
    color: colors.text,
    flex: 1,
  },

  // ── Footer ────────────────────────────────────────
  version: {
    textAlign: 'center',
    paddingBottom: spacing.md,
  },
});
