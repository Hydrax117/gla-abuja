/**
 * GLA Abuja — Divider.
 *
 * A thin horizontal (or vertical) rule using the border token.
 *
 * Usage:
 *   <Divider />
 *   <Divider spacing='lg' />
 *   <Divider label='or' />
 *   <Divider orientation='vertical' style={{ height: 20 }} />
 */

import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';

import { colors } from '@/constants/colors';
import { SpacingToken, spacing } from '@/constants/spacing';
import { Text } from './Text';

interface DividerProps {
  /** Vertical margin above and below. Defaults to 'md'. */
  spacing?: SpacingToken;
  /** Optional centred label. */
  label?: string;
  orientation?: 'horizontal' | 'vertical';
  style?: ViewStyle;
}

export function Divider({
  spacing: spacingKey = 'md',
  label,
  orientation = 'horizontal',
  style,
}: DividerProps) {
  const margin = spacing[spacingKey];

  if (orientation === 'vertical') {
    return (
      <View
        style={[
          styles.vertical,
          { marginHorizontal: margin },
          style,
        ]}
      />
    );
  }

  if (label) {
    return (
      <View style={[styles.labelRow, { marginVertical: margin }, style]}>
        <View style={styles.line} />
        <Text variant='caption' color='muted' style={styles.labelText}>
          {label}
        </Text>
        <View style={styles.line} />
      </View>
    );
  }

  return (
    <View style={[styles.horizontal, { marginVertical: margin }, style]} />
  );
}

const styles = StyleSheet.create({
  horizontal: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.border,
    width: '100%',
  },
  vertical: {
    width: StyleSheet.hairlineWidth,
    backgroundColor: colors.border,
    alignSelf: 'stretch',
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  line: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.border,
  },
  labelText: {
    marginHorizontal: spacing.sm,
  },
});

export default Divider;
