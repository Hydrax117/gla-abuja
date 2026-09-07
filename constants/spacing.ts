/**
 * GLA Abuja — spacing scale (4-point grid).
 *
 * Usage:
 *   padding: spacing.md          → 16
 *   gap: spacing.sm              →  8
 *   marginBottom: spacing.lg     → 24
 */
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

export type SpacingToken = keyof typeof spacing;

/**
 * Border radius scale — kept alongside spacing for layout convenience.
 */
export const radius = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
} as const;

export type RadiusToken = keyof typeof radius;
