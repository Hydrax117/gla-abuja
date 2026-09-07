/**
 * GLA Abuja — Badge.
 *
 * Small label for status indicators, categories, and counts.
 *
 * Variants:
 *  default  → surface background, muted text
 *  gold     → translucent gold tint
 *  success  → green semantic
 *  warning  → amber semantic
 *  error    → red semantic
 *
 * Usage:
 *   <Badge>Conference</Badge>
 *   <Badge variant='gold'>Featured</Badge>
 *   <Badge variant='success'>Confirmed</Badge>
 *   <Badge variant='error'>Cancelled</Badge>
 */

import React from 'react';
import { StyleSheet, View } from 'react-native';

import { colors } from '@/constants/colors';
import { radius, spacing } from '@/constants/spacing';
import { Text } from './Text';

export type BadgeVariant = 'default' | 'gold' | 'success' | 'warning' | 'error';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
}

const variantStyles: Record<
  BadgeVariant,
  { backgroundColor: string; textColor: string }
> = {
  default: {
    backgroundColor: colors.surfaceElevated,
    textColor: colors.muted,
  },
  gold: {
    backgroundColor: 'rgba(212, 175, 98, 0.15)',
    textColor: colors.gold,
  },
  success: {
    backgroundColor: 'rgba(76, 175, 80, 0.15)',
    textColor: colors.success,
  },
  warning: {
    backgroundColor: 'rgba(224, 168, 79, 0.15)',
    textColor: colors.warning,
  },
  error: {
    backgroundColor: 'rgba(224, 82, 82, 0.15)',
    textColor: colors.error,
  },
};

export function Badge({ children, variant = 'default' }: BadgeProps) {
  const { backgroundColor, textColor } = variantStyles[variant];

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Text variant='caption' style={{ color: textColor, ...styles.label }}>
        {children}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs - 1, // 3
    borderRadius: radius.full,
  },
  label: {
    fontWeight: '600',
    letterSpacing: 0.4,
  },
});

export default Badge;
