/**
 * Responsive layout utilities.
 *
 * All sizing that adapts to screen dimensions belongs here.
 * Components import what they need rather than calling Dimensions directly.
 *
 * Breakpoints (portrait width):
 *   xs  < 360  — small Android (Galaxy A series)
 *   sm  < 390  — standard phone (iPhone SE, Pixel 6a)
 *   md  < 430  — large phone  (iPhone 15 Pro Max, Pixel 8 Pro)
 *   lg  ≥ 430  — tablet / foldable
 */

import { Dimensions, PixelRatio } from 'react-native';
import { useWindowDimensions } from 'react-native';

// ---------------------------------------------------------------------------
// Static helpers (safe to call outside components, e.g. in StyleSheet.create)
// ---------------------------------------------------------------------------

const BASE_WIDTH = 390; // iPhone 15 design base

/** Scale a value proportionally to screen width. */
export function scale(size: number): number {
  const { width } = Dimensions.get('window');
  return Math.round(PixelRatio.roundToNearestPixel((size * width) / BASE_WIDTH));
}

/** Scale font size — gentler curve so text doesn't grow/shrink too aggressively. */
export function fontScale(size: number): number {
  const { width } = Dimensions.get('window');
  const ratio = width / BASE_WIDTH;
  // Clamp: never smaller than 85% or larger than 120% of the base size
  const clamped = Math.min(Math.max(ratio, 0.85), 1.2);
  return Math.round(PixelRatio.roundToNearestPixel(size * clamped));
}

// ---------------------------------------------------------------------------
// Hook — use inside components for reactive sizing on rotation / resize
// ---------------------------------------------------------------------------

export interface Layout {
  width: number;
  height: number;
  isSmall: boolean;     // width < 360
  isCompact: boolean;   // width < 390
  isLarge: boolean;     // width ≥ 430 (tablet / large phone)

  // Derived sizing
  heroAspectRatio: number;   // 16/9 on phones, 21/9 on tablets
  coverHeight: number;       // profile cover
  avatarSize: number;
  tileSize: number;          // quick-link tile
  tileColumns: number;       // how many tiles per row
  cardHeight: number;        // kids section card
  illustrationSize: number;  // kids card illustration
  tabBarHeight: number;
  horizontalPadding: number;
}

export function useLayout(): Layout {
  const { width, height } = useWindowDimensions();

  const isSmall    = width < 360;
  const isCompact  = width < 390;
  const isLarge    = width >= 430;

  // How many quick-link columns fit comfortably
  const tileColumns = isSmall ? 3 : isLarge ? 5 : 3;

  // Tile size: fill row with equal tiles + spacing gaps
  const hPad = isSmall ? 12 : 16;
  const tileGap = 8;
  const availableWidth = width - hPad * 2;
  const tileSize = Math.floor(
    (availableWidth - tileGap * (tileColumns - 1)) / tileColumns,
  );

  return {
    width,
    height,
    isSmall,
    isCompact,
    isLarge,

    heroAspectRatio: isLarge ? 21 / 9 : 16 / 9,
    coverHeight: Math.round(height * (isSmall ? 0.28 : isLarge ? 0.32 : 0.30)),
    avatarSize: isSmall ? 64 : isLarge ? 96 : 80,
    tileSize,
    tileColumns,
    cardHeight: isSmall ? 150 : isLarge ? 220 : 180,
    illustrationSize: isSmall ? 160 : isLarge ? 260 : 200,
    tabBarHeight: isSmall ? 54 : 60,
    horizontalPadding: hPad,
  };
}
