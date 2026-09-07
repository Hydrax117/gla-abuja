/**
 * GLA Abuja — Button primitive.
 *
 * Variants:
 *  primary   → gold fill, dark label       (main CTAs)
 *  secondary → outlined gold border         (secondary actions)
 *  ghost     → no border, gold text         (tertiary / inline)
 *
 * Sizes:
 *  sm | md (default) | lg
 *
 * Usage:
 *   <Button onPress={handleRegister}>Register Now</Button>
 *   <Button variant='secondary' onPress={handleShare}>Share</Button>
 *   <Button variant='ghost' size='sm' onPress={handleSkip}>Skip</Button>
 *   <Button loading>Submitting…</Button>
 *   <Button disabled>Unavailable</Button>
 */

import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native';

import { colors } from '@/constants/colors';
import { radius, spacing } from '@/constants/spacing';
import { typographyStyles } from '@/constants/typography';
import { Text } from './Text';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends Omit<TouchableOpacityProps, 'style'> {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Show a spinner and disable interaction. */
  loading?: boolean;
  /** Left icon — any React element (e.g. <Ionicons />). */
  leftIcon?: React.ReactNode;
  /** Right icon — any React element. */
  rightIcon?: React.ReactNode;
  /** Full-width block button. */
  fullWidth?: boolean;
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  disabled,
  ...rest
}: ButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      activeOpacity={0.75}
      disabled={isDisabled}
      style={[
        styles.base,
        styles[variant],
        styles[`size_${size}`],
        fullWidth && styles.fullWidth,
        isDisabled && styles.disabled,
      ]}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator
          size='small'
          color={variant === 'primary' ? colors.background : colors.gold}
        />
      ) : (
        <View style={styles.inner}>
          {leftIcon && <View style={styles.iconLeft}>{leftIcon}</View>}
          <Text
            variant='button'
            style={[
              variant === 'primary' ? styles.labelPrimary : styles.labelOutlined,
              isDisabled && styles.labelDisabled,
            ]}
          >
            {children}
          </Text>
          {rightIcon && <View style={styles.iconRight}>{rightIcon}</View>}
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: 'transparent',
  },

  // Variants
  primary: {
    backgroundColor: colors.gold,
    borderColor: colors.gold,
  },
  secondary: {
    backgroundColor: 'transparent',
    borderColor: colors.gold,
  },
  ghost: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
  },

  // Sizes
  size_sm: {
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
    minHeight: 32,
  },
  size_md: {
    paddingVertical: spacing.sm + 2, // 10
    paddingHorizontal: spacing.lg,
    minHeight: 44,
  },
  size_lg: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    minHeight: 52,
  },

  // Layout
  fullWidth: {
    width: '100%',
  },

  // Inner row
  inner: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconLeft: {
    marginRight: spacing.xs,
  },
  iconRight: {
    marginLeft: spacing.xs,
  },

  // Labels
  labelPrimary: {
    color: colors.background,
    ...typographyStyles.button,
  },
  labelOutlined: {
    color: colors.gold,
    ...typographyStyles.button,
  },

  // States
  disabled: {
    opacity: 0.4,
  },
  labelDisabled: {
    // opacity handled by container
  },
});

export default Button;
