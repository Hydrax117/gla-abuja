/**
 * GLA Abuja — Screen wrapper.
 *
 * Applies the dark background, handles safe-area insets, and optionally
 * wraps content in a ScrollView. Use this as the root of every screen
 * so the background colour never needs to be repeated.
 *
 * Usage:
 *   // Fixed layout (default)
 *   <Screen><MyContent /></Screen>
 *
 *   // Scrollable
 *   <Screen scroll><MyContent /></Screen>
 *
 *   // Extra horizontal padding removed (e.g. full-bleed images)
 *   <Screen padded={false}><MyContent /></Screen>
 */

import React from 'react';
import {
  ScrollView,
  ScrollViewProps,
  StyleSheet,
  View,
  ViewProps,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';

interface ScreenProps {
  children: React.ReactNode;
  /** Wrap content in a ScrollView. */
  scroll?: boolean;
  /** Apply horizontal padding. Defaults to true. */
  padded?: boolean;
  /** Extra props forwarded to the outer View (non-scroll) or ScrollView. */
  style?: ViewProps['style'] | ScrollViewProps['style'];
  /** contentContainerStyle — only relevant when scroll={true}. */
  contentContainerStyle?: ScrollViewProps['contentContainerStyle'];
}

export function Screen({
  children,
  scroll = false,
  padded = true,
  style,
  contentContainerStyle,
}: ScreenProps) {
  if (scroll) {
    return (
      <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
        <ScrollView
          style={[styles.scrollView, style]}
          contentContainerStyle={[
            padded && styles.paddedContent,
            contentContainerStyle,
          ]}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps='handled'
        >
          {children}
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <View style={[styles.container, padded && styles.paddedContent, style]}>
        {children}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    backgroundColor: colors.background,
  },
  paddedContent: {
    paddingHorizontal: spacing.md,
  },
});

export default Screen;
