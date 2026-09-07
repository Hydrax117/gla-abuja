/**
 * GLA Abuja — centralized color tokens.
 * All colors used in the app must reference this file.
 * Never hardcode hex values in components or styles.
 */
export const colors = {
  // Backgrounds
  background: '#0B0B0B',
  surface: '#121212',
  surfaceElevated: '#181818',

  // Brand
  gold: '#D4AF62',
  goldLight: '#E2C477',

  // Text
  white: '#FFFFFF',
  text: '#E8E8E8',
  muted: '#9A9A9A',

  // Structure
  border: '#292929',

  // Semantic
  success: '#4CAF50',
  error: '#E05252',
  warning: '#E0A84F',
} as const;

export type ColorToken = keyof typeof colors;
