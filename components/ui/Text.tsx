/**
 * GLA Abuja — Text primitive.
 *
 * Wraps React Native's Text with typed variant + color props so that
 * every text node in the app stays on-token automatically.
 *
 * Usage:
 *   <Text variant='heading' color='gold'>GLA Abuja</Text>
 *   <Text variant='body'>Welcome to the service.</Text>
 *   <Text variant='caption' color='muted'>Sunday 10:00 AM</Text>
 */

import React from 'react';
import { Text as RNText, StyleSheet, TextProps as RNTextProps } from 'react-native';

import { ColorToken, colors } from '@/constants/colors';
import { typographyStyles } from '@/constants/typography';

export type TextVariant = keyof typeof typographyStyles;

interface TextProps extends RNTextProps {
  /** Typography scale variant. Defaults to 'body'. */
  variant?: TextVariant;
  /** Color token key. Defaults to 'text'. */
  color?: ColorToken;
}

export function Text({ variant = 'body', color = 'text', style, ...rest }: TextProps) {
  return (
    <RNText
      style={[typographyStyles[variant], { color: colors[color] }, style]}
      {...rest}
    />
  );
}

// ---------------------------------------------------------------------------
// Convenience aliases — import individually for brevity
// ---------------------------------------------------------------------------

export function Heading(props: Omit<TextProps, 'variant'>) {
  return <Text variant='heading' color='text' {...props} />;
}

export function Title(props: Omit<TextProps, 'variant'>) {
  return <Text variant='title' color='text' {...props} />;
}

export function Caption(props: Omit<TextProps, 'variant'>) {
  return <Text variant='caption' color='muted' {...props} />;
}

// Keep a named default for the base component too
export default Text;
