import { StyleSheet, TextStyle } from 'react-native';

/**
 * GLA Abuja — typography scale.
 *
 * Visual language:
 *  - Headings  → serif feel, generous size, lighter weight for elegance
 *  - Title     → prominent label / screen title
 *  - Body      → clean sans-serif for readability
 *  - Caption   → supporting / metadata text
 *  - Button    → uppercase-tracked label for actions
 *
 * No custom fonts are loaded yet. Tokens use the platform default
 * (San Francisco on iOS, Roboto on Android). Swap `fontFamily` here
 * once custom fonts are wired up via expo-font — nothing else needs
 * to change.
 *
 * Usage:
 *   <Text style={[typography.heading, { color: colors.text }]}>…</Text>
 */

// ---------------------------------------------------------------------------
// Raw style definitions (not wrapped in StyleSheet.create yet so they can
// be spread / extended freely, e.g. for Animated or inline overrides)
// ---------------------------------------------------------------------------

export const typographyStyles = {
  heading: {
    fontSize: 32,
    fontWeight: '300',   // thin-ish weight reads as elegant
    lineHeight: 40,
    letterSpacing: 0.5,
  } satisfies TextStyle,

  title: {
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 28,
    letterSpacing: 0.2,
  } satisfies TextStyle,

  body: {
    fontSize: 15,
    fontWeight: '400',
    lineHeight: 24,
    letterSpacing: 0,
  } satisfies TextStyle,

  caption: {
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 18,
    letterSpacing: 0.3,
  } satisfies TextStyle,

  button: {
    fontSize: 13,
    fontWeight: '600',
    lineHeight: 20,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  } satisfies TextStyle,
} as const;

/**
 * StyleSheet-compiled version — prefer this inside component StyleSheet.create
 * calls for the performance benefits of React Native's style registry.
 */
export const typography = StyleSheet.create(typographyStyles);
