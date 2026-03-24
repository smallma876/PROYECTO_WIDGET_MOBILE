export const theme = {
  colors: {
    background: '#000000',
    surface: '#1A1A1A',
    surfaceLight: '#2A2A2A',
    primary: '#FF0050',
    secondary: '#00F2EA',
    text: '#FFFFFF',
    textSecondary: '#888888',
    error: '#FF4444',
    success: '#00CC66',
    transparencyGridLight: '#333333',
    transparencyGridDark: '#444444',
    drawingStroke: '#FF0050',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  borderRadius: {
    sm: 8,
    md: 12,
    lg: 16,
    full: 9999,
  },
  fontSize: {
    sm: 12,
    md: 14,
    lg: 16,
    xl: 20,
    xxl: 28,
  },
  drawing: {
    strokeWidth: 3,
    minPointDistance: 5,
  },
} as const;

export type Theme = typeof theme;
