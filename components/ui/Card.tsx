/**
 * GLA Abuja — Card primitive.
 *
 * A surface container used for events, sermons, and any other list items.
 * Handles background, border, radius, and optional press state.
 *
 * Usage:
 *   // Static card
 *   <Card><MyContent /></Card>
 *
 *   // Pressable card
 *   <Card onPress={() => router.push(`/event/${id}`)}>
 *     <MyContent />
 *   </Card>
 *
 *   // Elevated variant (one level brighter)
 *   <Card elevated><MyContent /></Card>
 */

import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewStyle,
} from 'react-native';

import { colors } from '@/constants/colors';
import { radius, spacing } from '@/constants/spacing';

interface CardProps {
  children: React.ReactNode;
  /** Use surfaceElevated background instead of surface. */
  elevated?: boolean;
  /** Makes the entire card pressable. */
  onPress?: TouchableOpacityProps['onPress'];
  style?: ViewStyle;
}

export function Card({ children, elevated = false, onPress, style }: CardProps) {
  const containerStyle = [
    styles.base,
    elevated ? styles.elevated : styles.normal,
    style,
  ];

  if (onPress) {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={onPress}
        style={containerStyle}
      >
        {children}
      </TouchableOpacity>
    );
  }

  return <View style={containerStyle}>{children}</View>;
}

const styles = StyleSheet.create({
  base: {
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    overflow: 'hidden',
  },
  normal: {
    backgroundColor: colors.surface,
  },
  elevated: {
    backgroundColor: colors.surfaceElevated,
  },
});

export default Card;
