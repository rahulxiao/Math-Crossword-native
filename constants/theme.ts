/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from 'react-native';

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
};

export const GameColors = {
  primary: '#38B2AC', // Teal 400 - Vivid and readable against dark
  secondary: '#81E6D9', // Teal 200
  accent: '#F6AD55', // Orange 300 - Warm accent
  
  background: '#1A202C', // Gray 900 - Deep Slate
  surface: '#2D3748', // Gray 800 - Component background
  
  text: {
    primary: '#F7FAFC', // Gray 50
    secondary: '#A0AEC0', // Gray 400
    inverse: '#1A202C',
  },

  cell: {
    default: '#2D3748', // Gray 800
    locked: '#4A5568', // Gray 700 - Distinct for pre-filled
    selected: '#3182CE', // Blue 500 - Clear Highlight
    correct: '#48BB78', // Green 500
    error: '#F56565', // Red 500
    border: '#718096', // Gray 500
    text: '#FFFFFF',
    lockedText: '#CBD5E0', // Gray 300
  },
  
  button: {
    background: '#4A5568',
    text: '#F7FAFC',
    pressed: '#2D3748',
  }
};

export const Fonts = Platform.select({
  ios: {
    sans: 'System',
    serif: 'Georgia',
    mono: 'Courier New',
  },
  android: {
    sans: 'Roboto',
    serif: 'serif',
    mono: 'monospace',
  },
  default: {
    sans: 'sans-serif',
    serif: 'serif',
    mono: 'monospace',
  }
});
