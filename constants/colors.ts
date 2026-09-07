/**
 * GLA Abuja brand colors.
 * Adjust primary/secondary to match official brand guidelines.
 */
export const COLORS = {
  // Brand
  primary: '#1A5EAB',
  primaryLight: '#4A8FDB',
  primaryDark: '#0D3D7A',

  secondary: '#F5A623',
  secondaryLight: '#FFC85A',
  secondaryDark: '#C47D00',

  // Semantic
  success: '#27AE60',
  warning: '#F39C12',
  error: '#E74C3C',
  info: '#2980B9',

  // Neutral
  background: '#F7F9FC',
  surface: '#FFFFFF',
  border: '#E1E8F0',
  divider: '#EEF2F7',

  // Text
  text: {
    primary: '#1A2332',
    secondary: '#4A5568',
    muted: '#A0AEC0',
    inverse: '#FFFFFF',
  },

  // Transparent
  overlay: 'rgba(0, 0, 0, 0.5)',
} as const;

export type ColorKey = keyof typeof COLORS;
